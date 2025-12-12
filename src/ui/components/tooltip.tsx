import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "../app/app_ctxt";
import { getRootElement } from "../util/root";
import { ElbeChildren } from "../util/types";

export function WithTooltip(p: { tooltip?: string; children?: ElbeChildren }) {
  const rootDOM = useMemo(() => getRootElement("elbe_tooltip"), []);
  const timeoutRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, top: false, left: false });
  const { appConfig } = useApp();
  const { theme } = appConfig.themeContext.useTheme().useWith(
    (c) => ({
      color: {
        ...c.color,
        selection: {
          ...c.color.selection,
          scheme: "inverse",
          kind: "accent",
          manner: "plain",
          state: "neutral",
        },
      },
    }),
    []
  );

  if (!p.tooltip) return <>{p.children}</>;
  return (
    <span
      onMouseEnter={() => {
        timeoutRef.current = window.setTimeout(() => setVisible(true), 1000);
      }}
      onMouseLeave={() => {
        console.log("leave");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setVisible(false);
      }}
      onMouseMove={(e) => {
        setCoords({
          x: e.clientX,
          y: e.clientY,
          top: e.clientY > window.innerHeight / 2,
          left: e.clientX > window.innerWidth / 2,
        });
      }}
      style={{ display: "contents" }}
    >
      {p.children}
      {visible &&
        createPortal(
          <div
            role="tooltip"
            className="elbe_tooltip"
            style={{
              position: "fixed",
              pointerEvents: "none",
              top: coords.y + (coords.top ? -12 : 12), // offset below cursor
              left: coords.x + (coords.left ? -12 : 12), // offset right of cursor
              background: theme.color.currentColor.back
                .inter(theme.color.currentColor.front, 0.2)
                .asCss(),
              color: theme.color.currentColor.front.asCss(),
              padding: ".125rem .3rem",
              borderRadius: ".25rem",
              transform: `translate(${coords.left ? "-100%" : "0"}, ${
                coords.top ? "-100%" : "0"
              })`,
            }}
          >
            {p.tooltip}
          </div>,
          rootDOM
        )}
    </span>
  );
}
