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
  "v2",
  "source",
  "captures",
  "en",
);
const chromeExecutable =
  process.env.CHROME_PATH
  ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const previewUrl =
  process.env.AGORA_STORE_PREVIEW_URL
  ?? "http://localhost:3003/?preview=plato-cave-adjustment";

const recentThoughtIds = [
  "socrates",
  "plato",
  "aristotle",
  "epicurus",
  "epictetus",
  "augustine",
  "descartes",
  "spinoza",
  "locke",
  "hume",
  "rousseau",
  "kant",
  "hegel",
  "kierkegaard",
  "marx",
  "nietzsche",
  "husserl",
  "heidegger",
  "wittgenstein",
  "arendt",
  "sartre",
  "beauvoir",
  "camus",
];

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function waitForDevTools(child) {
  return new Promise((resolveDevTools, rejectDevTools) => {
    let output = "";
    const timeout = setTimeout(() => {
      rejectDevTools(new Error(`Chrome did not expose DevTools. Output: ${output}`));
    }, 15_000);

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      output += chunk;
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (!match) return;
      clearTimeout(timeout);
      resolveDevTools(match[1]);
    });
    child.once("exit", (code) => {
      clearTimeout(timeout);
      rejectDevTools(new Error(`Chrome exited before capture with code ${code}. ${output}`));
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

async function waitUntil(client, expression, label, timeoutMs = 15_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await client.send("Runtime.evaluate", {
      expression: `Boolean(${expression})`,
      returnByValue: true,
    });
    if (result.result.value) return;
    await delay(120);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? `Evaluation failed: ${expression}`);
  }
  return result.result.value;
}

async function navigate(client) {
  await client.send("Page.navigate", { url: previewUrl });
  await waitUntil(client, "document.readyState === 'complete'", "page load");
  await waitUntil(client, "document.querySelector('section.moment[lang=\"en\"]')", "English UI");
  await evaluate(client, `(() => {
    const style = document.createElement("style");
    style.dataset.captureMode = "true";
    style.textContent = "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}";
    document.head.appendChild(style);
    return document.fonts.ready.then(() => true);
  })()`);
  await delay(500);
}

async function clickAndWait(client, clickExpression, waitExpression, label, settleMs = 500) {
  const clicked = await evaluate(client, `(() => { ${clickExpression}; return true; })()`);
  if (!clicked) throw new Error(`Could not click ${label}`);
  await waitUntil(client, waitExpression, label);
  await delay(settleMs);
}

async function saveScreenshot(client, fileName) {
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(resolve(destinationRoot, fileName), screenshot.data, "base64");
  console.log(`Captured ${fileName}`);
}

await mkdir(destinationRoot, { recursive: true });
const profileDirectory = await mkdtemp(resolve(tmpdir(), "agora-store-capture-"));
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
  const targets = await fetch(`http://${devToolsOrigin.host}/json/list`).then((response) => response.json());
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget?.webSocketDebuggerUrl) throw new Error("Chrome page target was not available");

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
        localStorage.setItem("agora-language-mode", "en");
        localStorage.setItem("agora-include-english-quote", "false");
        localStorage.setItem("agora-content-library", "western");
        localStorage.setItem("agora-visual-style", "archive");
        localStorage.setItem("agora-share-format", "mobile");
        localStorage.setItem("agora-onboarding-complete", "2");
        localStorage.setItem("agora-recent", ${JSON.stringify(JSON.stringify(recentThoughtIds))});
      } catch {}
    })();`,
  });

  await navigate(client);
  await saveScreenshot(client, "01-home.png");

  await navigate(client);
  await clickAndWait(
    client,
    `document.querySelector(".quote-stage")?.click()`,
    `document.querySelector(".detail-sheet.open[aria-hidden='false']")`,
    "deep-reading dialog",
    1_800,
  );
  await saveScreenshot(client, "02-detail.png");

  await navigate(client);
  await clickAndWait(
    client,
    `document.querySelector(".corner-menu-button")?.click()`,
    `document.querySelector(".corner-menu.open")`,
    "collections menu",
  );
  await saveScreenshot(client, "03-collections.png");

  await navigate(client);
  await clickAndWait(
    client,
    `document.querySelector(".corner-menu-button")?.click()`,
    `document.querySelector(".corner-menu.open")`,
    "menu before thoughtbook",
    150,
  );
  await clickAndWait(
    client,
    `document.querySelector(".menu-saved-entry button")?.click()`,
    `document.querySelector(".thoughtbook-dialog.open[aria-hidden='false']")`,
    "thoughtbook dialog",
    250,
  );
  await clickAndWait(
    client,
    `document.querySelector("#thoughtbook-tab-recent")?.click()`,
    `document.querySelector("#thoughtbook-tab-recent[aria-selected='true']")`,
    "recent reading tab",
    500,
  );
  await saveScreenshot(client, "04-library.png");

  await navigate(client);
  await clickAndWait(
    client,
    `document.querySelector(".corner-menu-button")?.click()`,
    `document.querySelector(".corner-menu.open")`,
    "menu before sharing",
    150,
  );
  await clickAndWait(
    client,
    `[...document.querySelectorAll(".menu-actions button")].find((button) => button.textContent.includes("Share Thought"))?.click()`,
    `document.querySelector(".share-dialog.open[aria-hidden='false']")`,
    "share dialog",
    1_500,
  );
  await waitUntil(
    client,
    `(() => { const image = document.querySelector(".share-preview img"); return image && image.complete; })()`,
    "share preview",
  );
  await delay(300);
  await saveScreenshot(client, "05-share.png");
} finally {
  client?.close();
  chrome.kill("SIGTERM");
  if (chrome.exitCode === null && chrome.signalCode === null) {
    await Promise.race([once(chrome, "exit"), delay(5_000)]);
  }
  await delay(250);
  await rm(profileDirectory, { recursive: true, force: true });
}
