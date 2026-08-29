import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destinationRoot = resolve(
  projectRoot,
  "store-assets",
  "v3",
  "source",
  "captures",
);
const chromeExecutable =
  process.env.CHROME_PATH
  ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const previewUrl =
  process.env.AGORA_STORE_PREVIEW_URL
  ?? "http://localhost:3003/?preview=chinese-mencius-compassion-sprout";

const locales = [
  { directory: "zh-CN", storageValue: "zh-hans", expectedLang: "zh-Hans" },
  { directory: "zh-TW", storageValue: "zh-hant", expectedLang: "zh-Hant" },
  { directory: "en", storageValue: "en", expectedLang: "en" },
];

// Seed the Thoughtbook with real entries from all five collections so its
// store screenshot is useful even when capture runs in a clean Chrome profile.
const savedThoughtIds = [
  "plato-cave-adjustment",
  "chinese-mencius-compassion-sprout",
  "mao-practice",
  "science-bacon-gradual-induction",
  "indian-upanishad-tat-tvam-asi",
];
const recentThoughtIds = [
  "indian-upanishad-tat-tvam-asi",
  "science-bacon-gradual-induction",
  "mao-practice",
  "plato-cave-adjustment",
  "chinese-mencius-compassion-sprout",
];

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function waitForDevTools(child) {
  return new Promise((resolveDevTools, rejectDevTools) => {
    let output = "";
    let settled = false;
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      callback(value);
    };
    const timeout = setTimeout(() => {
      finish(
        rejectDevTools,
        new Error(`Chrome did not expose DevTools. Output: ${output}`),
      );
    }, 15_000);

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      output += chunk;
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) finish(resolveDevTools, match[1]);
    });
    child.once("exit", (code) => {
      finish(
        rejectDevTools,
        new Error(`Chrome exited before capture with code ${code}. ${output}`),
      );
    });
  });
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.ready = new Promise((resolveReady, rejectReady) => {
      this.socket.addEventListener("open", resolveReady, { once: true });
      this.socket.addEventListener("error", rejectReady, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
    this.socket.addEventListener("close", () => {
      for (const pending of this.pending.values()) {
        pending.reject(new Error("Chrome DevTools connection closed"));
      }
      this.pending.clear();
    });
  }

  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolveMessage, rejectMessage) => {
      this.pending.set(id, { resolve: resolveMessage, reject: rejectMessage });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    const description = result.exceptionDetails.exception?.description;
    throw new Error(description ?? result.exceptionDetails.text ?? `Evaluation failed: ${expression}`);
  }
  return result.result.value;
}

async function waitUntil(client, expression, label, timeoutMs = 20_000) {
  const startedAt = Date.now();
  let lastError;
  while (Date.now() - startedAt < timeoutMs) {
    try {
      if (await evaluate(client, `Boolean(${expression})`)) return;
      lastError = undefined;
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      if (!/context|navigat|target closed|Cannot find/i.test(message)) throw error;
    }
    await delay(120);
  }
  const suffix = lastError instanceof Error ? ` Last error: ${lastError.message}` : "";
  throw new Error(`Timed out waiting for ${label}.${suffix}`);
}

async function clickSelector(client, selector, label, settleMs = 350) {
  const clicked = await evaluate(
    client,
    `(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!(element instanceof HTMLElement)) return false;
      element.click();
      return true;
    })()`,
  );
  if (!clicked) throw new Error(`Could not click ${label}: ${selector}`);
  await delay(settleMs);
}

function captureUrl(locale) {
  const url = new URL(previewUrl);
  if (!url.searchParams.has("preview")) {
    url.searchParams.set("preview", "chinese-mencius-compassion-sprout");
  }
  url.searchParams.set("__agoraCaptureLocale", locale.directory);
  return url.href;
}

async function settleDocument(client) {
  await evaluate(client, `(() => {
    let style = document.querySelector("style[data-agora-capture-mode]");
    if (!style) {
      style = document.createElement("style");
      style.dataset.agoraCaptureMode = "true";
      style.textContent = [
        "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}",
        "html{caret-color:transparent!important}",
      ].join("");
      document.head.appendChild(style);
    }
    window.scrollTo(0, 0);
    const assetsReady = Promise.all([
      document.fonts.ready,
      ...[...document.images].map((image) => image.complete
        ? Promise.resolve()
        : new Promise((resolveImage) => {
            image.addEventListener("load", resolveImage, { once: true });
            image.addEventListener("error", resolveImage, { once: true });
          })),
    ]);
    return Promise.race([
      assetsReady,
      new Promise((resolveAssets) => window.setTimeout(resolveAssets, 5_000)),
    ]).then(() => true);
  })()`);
  await delay(350);
}

async function navigate(client, locale) {
  await client.send("Page.navigate", { url: captureUrl(locale) });
  await waitUntil(client, "document.readyState === 'complete'", `${locale.directory} page load`);
  await waitUntil(
    client,
    `document.querySelector('section.moment[lang=${JSON.stringify(locale.expectedLang)}]')`,
    `${locale.directory} interface`,
    30_000,
  );
  await waitUntil(client, "document.querySelector('.quote-stage')", "home thought");
  await settleDocument(client);
}

async function saveScreenshot(client, locale, fileName) {
  const destinationDirectory = resolve(destinationRoot, locale.directory);
  await mkdir(destinationDirectory, { recursive: true });
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const destination = resolve(destinationDirectory, fileName);
  await writeFile(destination, screenshot.data, "base64");
  console.log(`Captured ${locale.directory}/${fileName}`);
}

async function captureLocale(client, locale) {
  await navigate(client, locale);
  await saveScreenshot(client, locale, "01-home.png");

  await navigate(client, locale);
  await clickSelector(client, ".corner-menu-button", "collections menu button");
  await waitUntil(client, "document.querySelector('.corner-menu.open')", "collections menu");
  await evaluate(client, `(() => {
    const menu = document.querySelector(".corner-menu");
    if (menu) menu.scrollTop = 0;
    return true;
  })()`);
  await settleDocument(client);
  await saveScreenshot(client, locale, "02-collections.png");

  await navigate(client, locale);
  await clickSelector(client, ".quote-stage", "deep-reading dialog", 150);
  await waitUntil(
    client,
    "document.querySelector(\".detail-sheet.open[aria-hidden='false']\")",
    "deep-reading dialog",
  );
  await waitUntil(
    client,
    `(() => {
      const interpretation = document.querySelector(".interpretation-panel");
      const source = document.querySelector(".detail-source-verification");
      const node = document.querySelector(".lineage-section .thought-neighborhood-related");
      return interpretation?.getAttribute("aria-busy") === "false"
        && source?.getAttribute("aria-busy") === "false"
        && node;
    })()`,
    "interpretation and thought network",
    30_000,
  );
  await clickSelector(
    client,
    ".lineage-section .thought-neighborhood-related",
    "thought-network comparison",
    250,
  );
  await waitUntil(
    client,
    "document.querySelector('.comparison-panel')",
    "thought-network comparison panel",
  );
  await evaluate(client, `(() => {
    const primary = document.querySelector(".detail-primary");
    const comparison = document.querySelector(".lineage-comparison-scroll");
    if (primary) primary.scrollTop = 0;
    if (comparison) comparison.scrollTop = 0;
    return true;
  })()`);
  await settleDocument(client);
  await saveScreenshot(client, locale, "03-detail-network.png");

  await navigate(client, locale);
  await clickSelector(client, ".corner-menu-button", "menu before Thoughtbook", 120);
  await waitUntil(client, "document.querySelector('.corner-menu.open')", "menu before Thoughtbook");
  await clickSelector(client, ".menu-saved-entry button", "Thoughtbook dialog", 150);
  await waitUntil(
    client,
    "document.querySelector(\".thoughtbook-dialog.open[aria-hidden='false']\")",
    "Thoughtbook dialog",
  );
  await clickSelector(client, "#thoughtbook-tab-saved", "saved thoughts tab", 150);
  await waitUntil(
    client,
    "document.querySelector(\"#thoughtbook-tab-saved[aria-selected='true']\")",
    "saved thoughts tab",
  );
  await waitUntil(
    client,
    "document.querySelector('.thoughtbook-dialog .saved-card')",
    "seeded Thoughtbook entries",
  );
  await evaluate(client, `(() => {
    const body = document.querySelector(".thoughtbook-body");
    if (body) body.scrollTop = 0;
    return true;
  })()`);
  await settleDocument(client);
  await saveScreenshot(client, locale, "04-thoughtbook.png");

  await navigate(client, locale);
  await clickSelector(client, ".corner-menu-button", "menu before sharing", 120);
  await waitUntil(client, "document.querySelector('.corner-menu.open')", "menu before sharing");
  await clickSelector(
    client,
    '.menu-actions button[aria-keyshortcuts="S"]',
    "share dialog",
    150,
  );
  await waitUntil(
    client,
    "document.querySelector(\".share-dialog.open[aria-hidden='false']\")",
    "share dialog",
  );
  await waitUntil(
    client,
    `(() => {
      const image = document.querySelector(".share-preview img");
      return image && image.complete && image.naturalWidth > 0;
    })()`,
    "rendered share preview",
    30_000,
  );
  await evaluate(client, `(() => {
    const dialog = document.querySelector(".share-dialog");
    if (dialog) dialog.scrollTop = 0;
    return true;
  })()`);
  await settleDocument(client);
  await saveScreenshot(client, locale, "05-share.png");
}

await mkdir(destinationRoot, { recursive: true });
const profileDirectory = await mkdtemp(resolve(tmpdir(), "agora-store-v3-capture-"));
const chrome = spawn(
  chromeExecutable,
  [
    "--headless=new",
    "--disable-gpu",
    "--disable-background-networking",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-sync",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDirectory}`,
    "--window-size=1280,800",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

let client;
try {
  const browserWebSocketUrl = await waitForDevTools(chrome);
  const devToolsOrigin = new URL(browserWebSocketUrl);
  const targets = await fetch(`http://${devToolsOrigin.host}/json/list`).then((response) => {
    if (!response.ok) throw new Error(`Could not list Chrome targets: ${response.status}`);
    return response.json();
  });
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("Chrome page target was not available");
  }

  client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: 1280,
    screenHeight: 800,
  });
  await client.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await client.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `(() => {
      try {
        const captureLocale = new URL(window.location.href).searchParams.get("__agoraCaptureLocale");
        const languageMode = ${JSON.stringify(
          Object.fromEntries(locales.map((locale) => [locale.directory, locale.storageValue])),
        )}[captureLocale];
        if (!languageMode) return;
        localStorage.setItem("agora-language-mode", languageMode);
        localStorage.setItem("agora-include-english-quote", languageMode === "en" ? "false" : "true");
        localStorage.setItem("agora-content-library", "chinese");
        localStorage.setItem("agora-visual-style", "archive");
        localStorage.setItem("agora-share-format", "mobile");
        localStorage.setItem("agora-onboarding-complete", "2");
        localStorage.setItem("agora-saved", ${JSON.stringify(JSON.stringify(savedThoughtIds))});
        localStorage.setItem("agora-recent", ${JSON.stringify(JSON.stringify(recentThoughtIds))});
        localStorage.setItem("agora-blocked", "[]");
      } catch {}
    })();`,
  });

  for (const locale of locales) {
    console.log(`Capturing ${locale.directory}…`);
    await captureLocale(client, locale);
  }
} finally {
  client?.close();
  chrome.kill("SIGTERM");
  if (chrome.exitCode === null && chrome.signalCode === null) {
    await Promise.race([once(chrome, "exit"), delay(5_000)]);
  }
  await delay(250);
  await rm(profileDirectory, { recursive: true, force: true });
}
