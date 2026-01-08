import { useEffect, useState } from "react";
import { ElbeChildren } from "../util/types";

export type Pos = { x: number; y: number };

function _safePos(p: Pos): Pos {
  if (!p) return { x: 0, y: 0 };
  return {
    x: isNaN(p.x) ? 0 : p.x,
    y: isNaN(p.y) ? 0 : p.y,
  };
}

function _clampPos(
  p: Pos,
  bounds: { x: [number, number]; y: [number, number] } | undefined
): Pos {
  if (!bounds) return p;
  return {
    x: Math.min(Math.max(p.x, bounds.x[0]), bounds.x[1]),
    y: Math.min(Math.max(p.y, bounds.y[0]), bounds.y[1]),
  };
}

/** * A draggable component that can be moved around within its parent container.
 *
 * **Properties:**
 * - `children` (ElbeChildren): The content to be made draggable.
 * - `position` (Pos): The initial position of the draggable component.
 * - `onMoveDone` (function | undefined): Callback function that receives the final position when dragging ends.
 * - `onMove` (function | undefined): Callback function that receives the current position while dragging.
 * - `gridSize` (number | undefined): If provided, the component snaps to a grid of this size (in rem units) while dragging.
 *
 * **Usage:**
 * ```tsx
 * <Draggable
 *   position={{ x: 5, y: 5 }}
 *   onMoveDone={(pos) => console.log("Moved to:", pos)}
 *   gridSize={1}
 * >
 *   <YourComponent />
 * </Draggable>
 * ```
 */
export function Draggable(p: {
  children: ElbeChildren;
  position: Pos;
  onMoveDone?: (position: Pos) => void;
  onMove?: (position: Pos) => void;
  gridSize?: number;
  bounds?: { x: [number, number]; y: [number, number] };
  disabled?: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Pos>({ x: 0, y: 0 });
  const [pos, setPos] = useState<Pos>(_safePos(p.position));

  const remSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  useEffect(() => {
    setPos(p.position);
  }, [p.position]);

  function snapToGrid(position: Pos): Pos {
    if (!p.gridSize) return position;

    return {
      x: Math.round(position.x / p.gridSize) * p.gridSize,
      y: Math.round(position.y / p.gridSize) * p.gridSize,
    };
  }

  function onMouseDown(e: any) {
    if (p.disabled) return;
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x * remSize,
      y: e.clientY - pos.y * remSize,
    });
    e.preventDefault();
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging) return;
    const rawPos = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    const remPos = { x: rawPos.x / remSize, y: rawPos.y / remSize };
    const newPos = snapToGrid(remPos);
    const clampedPos = _clampPos(newPos, p.bounds);
    setPos(clampedPos);
    p.onMove?.(clampedPos);
  }

  function onMouseUp() {
    if (dragging) {
      setDragging(false);
      p.onMoveDone?.(pos);
    }
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [dragging, offset, pos, p.gridSize]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos.x}rem`,
        top: `${pos.y}rem`,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
    >
      {p.children}
    </div>
  );
}
