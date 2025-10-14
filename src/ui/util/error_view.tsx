import { Icons } from "../..";

export function _ElbeErr(msg: string) {
  return (
    <div
      className="row text-s gap-half"
      style={{
        background: "#ee0044",
        color: "white",
        borderRadius: "4px",
        textAlign: "left",
        padding: ".5rem",
      }}
    >
      <Icons.CircleX />
      <div className="column gap-none cross-stretch">
        <b className="text-s">elbe error</b>
        <span style={{ marginTop: "-.125rem" }}>{msg}</span>
      </div>
    </div>
  );
}
