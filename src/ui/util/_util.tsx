import React from "react";

export function elevatedShadow(dark: boolean) {
  return `0px 0px .625rem -.125rem ${dark ? "#ffffff60" : "#00000060"}`;
}

export namespace css {
  export function borderRadius(
    v: React.CSSProperties["borderTopLeftRadius"] | undefined
  ): React.CSSProperties {
    return {
      borderTopLeftRadius: v,
      borderTopRightRadius: v,
      borderBottomLeftRadius: v,
      borderBottomRightRadius: v,
    };
  }

  export function borderStyle(
    v: React.CSSProperties["borderLeftStyle"] | undefined
  ): React.CSSProperties {
    return {
      borderLeftStyle: v,
      borderRightStyle: v,
      borderTopStyle: v,
      borderBottomStyle: v,
    };
  }

  export function borderWidth(
    v: React.CSSProperties["borderLeftWidth"] | undefined
  ): React.CSSProperties {
    return {
      borderLeftWidth: v,
      borderRightWidth: v,
      borderTopWidth: v,
      borderBottomWidth: v,
    };
  }

  export function borderColor(
    v: React.CSSProperties["borderLeftColor"] | undefined
  ): React.CSSProperties {
    return {
      borderLeftColor: v,
      borderRightColor: v,
      borderTopColor: v,
      borderBottomColor: v,
    };
  }
}
