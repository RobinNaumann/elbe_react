import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import {
  Card,
  ElbeChild,
  elevatedShadow,
  IconButton,
  ToolbarContext,
  useLayoutMode,
  useThemeConfig,
} from "../../..";
import { maybeAppBase } from "./ctx_app_base";

export function _Toolbar(p: { actions: ElbeChild[] }) {
  const [sections, setSections] = useState<[ElbeChild[], ElbeChild[]]>([
    [],
    [],
  ]);
  const appBase = maybeAppBase();
  const layoutMode = useLayoutMode();

  useEffect(() => {
    const cutoff = layoutMode === "wide" ? 5 : 2;

    const bar: ElbeChild[] = [];
    const overflow: ElbeChild[] = [];
    for (let i = 0; i < p.actions.length; i++) {
      const e = p.actions[i];
      if (i < cutoff) bar.push(e);
      else overflow.push(e);
    }
    setSections([bar, overflow]);
  }, [p.actions, layoutMode]);

  return (
    <ToolbarContext.Provider value="toolbar">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: ".5rem",
          alignItems: "center",
        }}
      >
        {sections[0]}
        <OverflowMenu items={sections[1]} />
      </div>
    </ToolbarContext.Provider>
  );
}

export function OverflowMenu(p: { items: ElbeChild[] }) {
  const [open, setOpen] = useState(false);
  const tConfig = useThemeConfig();

  return !p.items?.length ? null : (
    <div
      style={{
        position: "relative",
        zIndex: 21,
      }}
    >
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "transparent",
            boxShadow: elevatedShadow,
            zIndex: 20,
          }}
        />
      )}
      <IconButton.plain
        ariaLabel="open/close menu"
        icon={MoreVertical}
        onTap={() => setOpen(!open)}
      />
      <div
        style={{
          zIndex: 21,
          position: "absolute",
          top: 0,
          right: 0,
          transform: open ? "scale(1)" : "scale(.6)",
          opacity: open ? 1 : 0,
          transition: tConfig.reducedMotion
            ? null
            : "transform 200ms ease-in-out, opacity 200ms ease-in-out",
        }}
      >
        {open && (
          <ToolbarContext.Provider value="overflow">
            <Card
              onTap={() => setOpen(false)}
              scheme="primary"
              elevated
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                alignItems: "stretch",
                position: "absolute",
                top: "3rem",
                right: 0,
                padding: ".5rem",
                width: "fit-content",
                zIndex: 21,
              }}
            >
              {p.items}
            </Card>
          </ToolbarContext.Provider>
        )}
      </div>
    </div>
  );
}
