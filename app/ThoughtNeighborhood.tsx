"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { ConnectionKind, ThoughtConnectionBasis } from "../content/philosophy";
import type {
  ResolvedThoughtConnection,
  ResolvedThoughtLineage,
  ThoughtLineageView,
} from "../lib/thoughtLineage";
import {
  buildThoughtNeighborhood,
  findThoughtNeighborhoodPage,
  thoughtNeighborhoodLimit,
} from "../lib/thoughtNeighborhood";

type ThoughtNeighborhoodLabels = {
  ariaLabel: string;
  current: string;
  selectHint: string;
  count: (visible: number, total: number) => string;
};

const graphCenter = { x: 50, y: 50 };
const graphCenterClearance = 15;

function crossesGraphCenter(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return false;

  const projection = Math.max(
    0,
    Math.min(
      1,
      ((graphCenter.x - start.x) * dx + (graphCenter.y - start.y) * dy)
        / lengthSquared,
    ),
  );
  const nearestX = start.x + projection * dx;
  const nearestY = start.y + projection * dy;

  return Math.hypot(nearestX - graphCenter.x, nearestY - graphCenter.y)
    < graphCenterClearance;
}

export function ThoughtNeighborhood({
  currentName,
  currentWork,
  lineage,
  selectedKey,
  labels,
  viewLabel,
  relationLabel,
  basisLabel,
  relatedLabel,
  onSelect,
}: {
  currentName: string;
  currentWork: string;
  lineage: ResolvedThoughtLineage;
  selectedKey: string | null;
  labels: ThoughtNeighborhoodLabels;
  viewLabel: (view: ThoughtLineageView) => string;
  relationLabel: (kind: ConnectionKind) => string;
  basisLabel: (basis: ThoughtConnectionBasis) => string;
  relatedLabel: (entry: ResolvedThoughtConnection) => string;
  onSelect: (entry: ResolvedThoughtConnection) => void;
}) {
  const [page, setPage] = useState(0);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstPage = buildThoughtNeighborhood(lineage);
  const pageCount = Math.max(1, Math.ceil(firstPage.total / thoughtNeighborhoodLimit));
  const selectedPage = findThoughtNeighborhoodPage(lineage, selectedKey);
  const requestedPage = ((page % pageCount) + pageCount) % pageCount;
  const normalizedPage = selectedPage >= 0 ? selectedPage : requestedPage;
  const neighborhood = normalizedPage === 0
    ? firstPage
    : buildThoughtNeighborhood(lineage, thoughtNeighborhoodLimit, normalizedPage);
  const hasSelection = neighborhood.nodes.some((node) => node.entry.key === selectedKey);
  const meshNodes = [...neighborhood.nodes].sort((left, right) => left.slot - right.slot);

  const selectWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + meshNodes.length) % meshNodes.length;
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % meshNodes.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = meshNodes.length - 1;
    }

    if (nextIndex === null || !meshNodes[nextIndex]) return;
    event.preventDefault();
    onSelect(meshNodes[nextIndex].entry);
    nodeRefs.current[nextIndex]?.focus();
  };

  const showNextGroup = () => {
    const nextPage = (normalizedPage + 1) % pageCount;
    const nextNeighborhood = buildThoughtNeighborhood(
      lineage,
      thoughtNeighborhoodLimit,
      nextPage,
    );
    setPage(nextPage);
    if (nextNeighborhood.nodes[0]) onSelect(nextNeighborhood.nodes[0].entry);
  };

  return (
    <div className="thought-neighborhood" role="group" aria-label={labels.ariaLabel}>
      <div className="thought-neighborhood-map">
        <svg
          className="thought-neighborhood-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {meshNodes.map((node, index) => {
            if (meshNodes.length < 2 || (meshNodes.length === 2 && index === 1)) return null;
            const nextNode = meshNodes[(index + 1) % meshNodes.length];
            if (crossesGraphCenter(node, nextNode)) return null;

            return (
              <line
                key={`mesh-${node.entry.key}-${nextNode.entry.key}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                vectorEffect="non-scaling-stroke"
                className="thought-neighborhood-mesh-edge"
              />
            );
          })}
          {neighborhood.nodes.map(({ entry, x, y }) => (
            <line
              key={entry.key}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              vectorEffect="non-scaling-stroke"
              className={`thought-neighborhood-edge view-${entry.view} basis-${entry.connection.basis ?? "editorial"}${selectedKey === entry.key ? " selected" : ""}`}
              data-muted={hasSelection && selectedKey !== entry.key ? "true" : undefined}
            />
          ))}
        </svg>

        <div className="thought-neighborhood-node thought-neighborhood-current" aria-label={`${labels.current}：${currentName}`}>
          <span className="thought-neighborhood-current-dot" aria-hidden="true" />
          <span className="thought-neighborhood-current-body">
            <span>{labels.current}</span>
            <strong>{currentName}</strong>
            <small>{currentWork}</small>
          </span>
        </div>

        {meshNodes.map(({ entry, slot, x, y }, index) => {
          const selected = selectedKey === entry.key;
          const style = {
            "--node-x": `${x}%`,
            "--node-y": `${y}%`,
          } as CSSProperties;
          const related = relatedLabel(entry);
          const basis = basisLabel(entry.connection.basis ?? "editorial");

          return (
            <button
              key={entry.key}
              type="button"
              className={`thought-neighborhood-node thought-neighborhood-related view-${entry.view}${selected ? " selected" : ""}`}
              style={style}
              aria-pressed={selected}
              aria-controls="comparison-panel"
              aria-label={`${viewLabel(entry.view)}，${related}，${relationLabel(entry.connection.kind)}，${basis}`}
              data-slot={slot}
              data-muted={hasSelection && !selected ? "true" : undefined}
              tabIndex={selected || (!hasSelection && index === 0) ? 0 : -1}
              ref={(node) => {
                nodeRefs.current[index] = node;
              }}
              onClick={() => onSelect(entry)}
              onKeyDown={(event) => selectWithKeyboard(event, index)}
            >
              <span className="thought-neighborhood-related-dot" aria-hidden="true" />
              <span className="thought-neighborhood-node-body">
                <span>{viewLabel(entry.view)}</span>
                <strong>{related}</strong>
                <small>{relationLabel(entry.connection.kind)}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="thought-neighborhood-caption">
        <span>{labels.selectHint}</span>
        {neighborhood.total > neighborhood.nodes.length ? (
          <button
            type="button"
            className="thought-neighborhood-cycle"
            aria-label={`${labels.selectHint}；${labels.count(neighborhood.nodes.length, neighborhood.total)}`}
            title={labels.count(neighborhood.nodes.length, neighborhood.total)}
            onClick={showNextGroup}
          >
            <span aria-hidden="true">↻ +{neighborhood.total - neighborhood.nodes.length}</span>
            <span className="sr-only">{labels.count(neighborhood.nodes.length, neighborhood.total)}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
