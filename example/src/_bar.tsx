import { Card, Column, FlexSpace, IconChild, Row } from "elbe-ui";
import { ExternalLinkIcon, HeartIcon } from "lucide-react";
import React from "preact/compat";

const _linkColor =
  "color-mix(in srgb, var(--c-context-front) 40%, transparent)";

export type FooterLink = {
  label: string;
  href: string;
  icon?: IconChild;
};

export function Footer({
  left,
  right,
  copyright,
  version,
  legal,
}: {
  left: (FooterLink | React.ReactNode)[];
  right?: (FooterLink | React.ReactNode)[];
  copyright?: string | React.ReactNode;
  version?: string;
  legal?: FooterLink;
}) {
  return (
    <Card
      scheme="secondary"
      sharp
      style={{
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        color: "color-mix(in srgb, var(--c-context-front) 60%, transparent)",
      }}
    >
      <Column gap={0.5}>
        <Row main="space-between" cross="start">
          <Column gap={0.5} flex={1} cross="start">
            {left.map((item: any) => (item.label ? <_Link {...item} /> : item))}
          </Column>
          {right && (
            <Column gap={0.5} flex={1} cross="end">
              {right.map((item: any) =>
                item.label ? <_Link {...item} /> : item
              )}
            </Column>
          )}
        </Row>
        {(copyright || version || legal) && <hr style={{ opacity: 0.7 }} />}
        {(copyright || version || legal) && (
          <Row>
            {copyright &&
              (typeof copyright === "string" ? <b>{copyright}</b> : copyright)}
            {version && <_Version version={version} />}
            <FlexSpace />
            {legal && <_Link {...legal} />}
          </Row>
        )}
      </Column>
    </Card>
  );
}

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

function _Version({ version }: { version: string }) {
  return (
    <pre
      style={{
        margin: "0",
        fontSize: ".75rem",
        fontFamily: "monospace",
      }}
    >
      {version}
    </pre>
  );
}

function _Link({ href, label }: FooterLink) {
  return (
    <Link color="inherit" plain noIcon href={href} label={label} external />
  );
}

export function _WrittenIn({
  city = "Hamburg",
  href,
}: {
  city?: string;
  href?: string;
}) {
  return (
    <a
      style={{
        padding: ".25rem .5rem",
        color: "white",
        fontWeight: "bold",
        background: "#818a99",
        borderRadius: "3rem",
        fontSize: ".7rem",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      written with
      <HeartIcon
        style={{ marginLeft: ".25rem", marginRight: ".25rem" }}
        size={10}
        strokeWidth={3}
      />
      in {city}
    </a>
  );
}
