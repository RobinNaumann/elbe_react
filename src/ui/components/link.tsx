import { ExternalLinkIcon } from "lucide-react";

export function Link(p: {
  label: string;
  href: string;
  external?: boolean;
  plain?: boolean;
  bold?: boolean;
  noIcon?: boolean;
  underline?: boolean;
  color?: string;
}) {
  return (
    <a
      class={p.plain ? "plain" : "accent action"}
      href={p.href}
      target={p.external ? "_blank" : undefined}
      rel={p.external ? "noopener noreferrer" : undefined}
      style={{
        color: p.color,
        display: "inline-flex",
        textDecoration: p.underline ? "underline" : "none",
        alignItems: "center",
        fontWeight: p.bold ? "bold" : "normal",
        padding: ".125rem .3rem",
        borderRadius: ".5rem",
        margin: "-.125rem -.3rem",
        transition: "background .2s",
      }}
    >
      {p.label}
      {p.external && !p.noIcon && (
        <ExternalLinkIcon
          size={15}
          style={{ marginLeft: ".25rem", marginBottom: ".25rem" }}
        />
      )}
    </a>
  );
}
