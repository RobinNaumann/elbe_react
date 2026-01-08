import { useState } from "react";
import Markdown from "react-markdown";
import {
  Card,
  Column,
  Dialog,
  ElbeChild,
  ElbeChildren,
  IconButton,
  Icons,
  MarkdownString,
  Row,
  Text,
} from "../..";
import { useApp } from "../app/app_ctxt";

/** * A section box component that can display a title, hint, and collapsible content.
 *
 * **Properties:**
 * - `title` (string): The title of the section.
 * - `hint` (MarkdownString | ElbeChildren): The hint content, which can be a markdown string or React nodes.
 * - `children` (ElbeChildren | undefined): The content to be displayed within the section.
 * - `actions` (ElbeChild[] | undefined): An array of action elements to be displayed in the section header.
 * - `bordered` (boolean | undefined): If true, the section box will have a border.
 * - `collapsed` (boolean | undefined): If true, the section content will be initially collapsed. If undefined, the section will not be collapsible.
 *
 * **Usage:**
 * ```tsx
 * <SectionCard
 *   title="Section Title"
 *   hint="This is a hint about the section."
 *   actions={[<YourActionComponent />]}
 *   bordered
 *   collapsed={false}
 * >
 *   <YourContentComponent />
 * </SectionCard>
 * ```
 */
export function SectionCard(p: {
  title: string;
  hint: MarkdownString | ElbeChildren;
  children?: ElbeChildren;
  actions?: ElbeChild[];
  bordered?: boolean;
  collapsed?: boolean | undefined;
}) {
  const _app = useApp();
  const _appTheme = _app._appThemeContext.useTheme();
  const [collapsed, setCollapsed] = useState<boolean | undefined>(p.collapsed);
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <Card
      bordered={p.bordered}
      style={{
        padding: `  ${
          1 - (p.bordered ? _appTheme.theme.geometry.borderWidth : 0)
        }rem`,
      }}
    >
      <Dialog
        title={p.title + " - Info"}
        open={hintOpen}
        onClose={() => setHintOpen(false)}
      >
        {typeof p.hint === "string" ? (
          <div className="elbe-hint-markdown">
            <Markdown children={p.hint} allowElement={() => true} />
          </div>
        ) : (
          p.hint
        )}
      </Dialog>
      {
        <Column>
          <Card
            onTap={
              collapsed === undefined
                ? undefined
                : () => setCollapsed(!collapsed)
            }
            margin={-1}
            padding={1}
            className={collapsed === undefined ? undefined : "hoverable_card"}
            style={{
              border: "none",
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              userSelect: "none",
              cursor: collapsed === undefined ? undefined : "pointer",
            }}
          >
            <Text.h4 v={p.title} flex />
            <Row
              gap={0.5}
              style={{ margin: "-.5rem" }}
              native={{
                onClick: (e) => e.stopPropagation(),
              }}
            >
              {p.actions ?? []}
              <IconButton.plain
                icon={Icons.Info}
                ariaLabel="show information about this section"
                onTap={() => setHintOpen(true)}
              />
              {p.collapsed === undefined ? null : (
                <IconButton.plain
                  ariaLabel={
                    p.collapsed ? "expand section" : "collapse section"
                  }
                  onTap={() => setCollapsed(!collapsed)}
                  icon={collapsed ? Icons.ChevronDown : Icons.ChevronUp}
                />
              )}
            </Row>
          </Card>
          {collapsed ? null : p.children}
        </Column>
      }
    </Card>
  );
}
