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
import { useApp } from "../app/app_ctxt";

export type FooterLink = {
  label: string;
  href: string;
  icon?: IconChild;
};

/**
 * Footer component. Can contain links, copyright info, version and legal link.
 *
 * **Properties:**
 * - `left` (FooterLink | React.ReactNode)[]: An array of links or React nodes to display on the left side of the footer.
 * - `right` (FooterLink | React.ReactNode)[]: An array of links or React nodes to display on the right side of the footer.
 * - `copyright` (string | React.ReactNode): Copyright information to display in the footer.
 * - `version` (string): Version information to display in the footer.
 * - `legal` (FooterLink): A link to legal information to display in the footer.
 * - `marginTop` (number): Margin top in rem units to add space above the footer.
 */
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
  const app = useApp({ useFallback: true });
  const { theme } = app._appThemeContext.useTheme();
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
        borderTopLeftRadius: layoutMode.isWide
          ? `${theme.geometry.radius}rem`
          : undefined,
        /*color: theme.color.currentColor.front
          .inter(theme.color.currentColor.back, 0.6)
          .asCss(),*/
        marginTop: `${marginTop ?? 0}rem`,
        marginLeft: layoutMode.isWide && !!app.menu ? "1rem" : undefined,
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
