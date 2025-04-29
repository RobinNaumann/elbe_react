import { HeartIcon } from "lucide-react";
import React from "preact/compat";
import {
  Card,
  Column,
  FlexSpace,
  IconChild,
  Link,
  Row,
  useLayoutMode,
} from "../..";

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
  marginTop,
}: {
  left?: (FooterLink | React.ReactNode)[];
  right?: (FooterLink | React.ReactNode)[];
  copyright?: string | React.ReactNode;
  version?: string;
  legal?: FooterLink;
  marginTop?: number;
}) {
  const layoutMode = useLayoutMode();

  return (
    <Card
      scheme="secondary"
      sharp
      role="contentinfo"
      ariaLabel="footer"
      style={{
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderTopLeftRadius: layoutMode === "wide" ? "var(--g-radius)" : null,
        color: "color-mix(in srgb, var(--c-context-front) 60%, transparent)",
        marginTop: `${marginTop ?? 0}rem`,
      }}
    >
      <Column gap={0.5}>
        <Row main="space-between" cross="start">
          {left && (
            <Column gap={0.5} flex={1} cross="start">
              {left.map((item: any) =>
                item.label ? <_Link {...item} /> : item
              )}
            </Column>
          )}
          {right && (
            <Column gap={0.5} flex={1} cross="end">
              {right.map((item: any) =>
                item.label ? <_Link {...item} /> : item
              )}
            </Column>
          )}
        </Row>
        {(left || right) && (copyright || version || legal) && (
          <hr style={{ opacity: 0.7 }} />
        )}
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
      href={href}
      style={{
        padding: ".25rem .5rem",
        color: "white",
        fontWeight: "bold",
        background: "#818a99",
        borderRadius: "3rem",
        fontSize: ".7rem",
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
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
