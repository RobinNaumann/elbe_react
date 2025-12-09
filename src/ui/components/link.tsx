import { ExternalLinkIcon } from "lucide-react";
import { useApp } from "../app/app_ctxt";
import { ColorSelection } from "../theme/subthemes/color/colors/colors";

export function Link(p: {
  label: string;
  href: string;
  external?: boolean;
  manner?: ColorSelection.Manners;
  bold?: boolean;
  noIcon?: boolean;
  underline?: boolean;
  color?: string;
}) {
  const { appConfig } = useApp();
  const theme = appConfig.themeContext.useTheme().with(
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
    <appConfig.themeContext.WithTheme theme={theme}>
      <a
        href={p.href}
        target={p.external ? "_blank" : undefined}
        rel={p.external ? "noopener noreferrer" : undefined}
        className="elbe_colored-action"
        style={{
          display: "inline-flex",
          textDecoration: p.underline ? "underline" : "none",
          alignItems: "center",
          fontWeight: p.bold ? "bold" : "normal",
          padding: ".125rem .3rem",
          borderRadius: ".5rem",
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
    </appConfig.themeContext.WithTheme>
  );
}
