import { ExternalLinkIcon } from "lucide-react";
import { useApp } from "../app/app_ctxt";
import { ColorSelection } from "../theme/subthemes/color/colors/colors";
import { WithStateTheme } from "./base/state_builder";
import { WithTooltip } from "./tooltip";

export function Link(p: {
  label: string;
  href?: string;
  external?: boolean;
  manner?: ColorSelection.Manners;
  bold?: boolean;
  noIcon?: boolean;
  underline?: boolean;
  color?: string;
  tooltip?: string;
}) {
  const { _appThemeContext } = useApp();
  const baseTheme = _appThemeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          manner: p.manner ?? "flat",
        },
      },
    }),
    [p.manner]
  );

  return (
    <WithStateTheme theme={baseTheme} disabled={p.href === undefined}>
      <WithTooltip tooltip={p.tooltip}>
        <a
          href={p.href}
          target={p.external ? "_blank" : undefined}
          rel={p.external ? "noopener noreferrer" : undefined}
          className="elbe_colored"
          style={{
            display: "inline-flex",
            textDecoration: p.underline ? "underline" : "none",
            alignItems: "center",
            fontWeight: p.bold ? "bold" : "normal",
            padding: ".125rem .3rem",
            borderRadius: ".5rem",
            cursor: "inherit",
            margin: ["major", "minor"].includes(p.manner ?? "flat")
              ? "-.125rem 0rem"
              : "-.125rem -.3rem",
            transition: "background .2s",
          }}
        >
          {p.label}
          {p.external && !p.noIcon && (
            <ExternalLinkIcon
              size={15}
              style={{ marginLeft: ".25rem", marginBottom: ".05rem" }}
            />
          )}
        </a>
      </WithTooltip>
    </WithStateTheme>
  );
}
