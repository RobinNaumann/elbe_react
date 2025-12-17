import { MoreVertical } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Card,
  ElbeChild,
  IconButton,
  ToolbarContext,
  useLayoutMode,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { elevatedShadow } from "../../util/_util";

export function _Toolbar(p: { actions: ElbeChild[] }) {
  const [sections, setSections] = useState<[ElbeChild[], ElbeChild[]]>([
    [],
    [],
  ]);
  const layoutMode = useLayoutMode();

  useMemo(() => {
    const cutoff = layoutMode.isWide ? 5 : layoutMode.screenWidth < 400 ? 1 : 2;

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
  const { _appThemeContext } = useApp();
  const { theme } = _appThemeContext.useTheme();
  const [open, setOpen] = useState(false);

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
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            boxShadow: elevatedShadow(theme.color.isDark),
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
          transition: theme.motion.reduced
            ? undefined
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
