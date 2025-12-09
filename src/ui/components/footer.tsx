import { HeartIcon } from "lucide-react";
import React from "react";
import {
  Card,
  Column,
  FlexSpace,
  IconChild,
  Link,
  Row,
  Text,
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
        borderLeftStyle: "none",
        borderRightStyle: "none",
        borderBottomStyle: "none",
        borderTopLeftRadius: layoutMode.isWide ? "var(--g-radius)" : undefined,
        color: "color-mix(in srgb, var(--c-context-front) 60%, transparent)",
        marginTop: `${marginTop ?? 0}rem`,
      }}
    >
      <Column gap={1}>
        {(left || right) && (
          <Row main="space-between" cross="start">
            {left && (
              <Column gap={0.5} flex={1} cross="start">
                {left.map((item: any, i) =>
                  item.label ? <_Link key={i} {...item} /> : item
                )}
              </Column>
            )}
            {right && (
              <Column gap={0.5} flex={1} cross="end">
                {right.map((item: any, i) =>
                  item.label ? <_Link key={i} {...item} /> : item
                )}
              </Column>
            )}
          </Row>
        )}
        {(left || right) && (copyright || version || legal) && <hr />}
        {(copyright || version || legal) && (
          <Row>
            {copyright &&
              (typeof copyright === "string" ? (
                <Text bold v={copyright} />
              ) : (
                copyright
              ))}
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
    <Link
      color="inherit"
      manner="plain"
      noIcon
      href={href}
      label={label}
      external
    />
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
