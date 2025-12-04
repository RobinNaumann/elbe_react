import { Column, Icons, Row } from "../..";

export function _ElbeErr(msg: string) {
  return (
    <Row
      style={{
        background: "#ee0044",
        color: "white",
        borderRadius: "4px",
        textAlign: "left",
        padding: ".5rem",
      }}
    >
      <Icons.CircleX />
      <Column gap={0}>
        <b className="text-s">elbe error</b>
        <span style={{ marginTop: "-.125rem" }}>{msg}</span>
      </Column>
    </Row>
  );
}
