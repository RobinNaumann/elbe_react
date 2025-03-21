import { XIcon } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { applyProps, ElbeProps } from "../base/box";

const _toDoStyle = {
  padding: ".3rem .5rem",
  borderRadius: ".3rem",
  background: "#880070",
  color: "white",
  fontSize: ".8rem",
};

export namespace ToDo {
  export function Overlay({}) {
    const [todos, setTodos] = useState(0);

    useEffect(() => {
      const e = document.querySelectorAll(
        '[data-type="todo"], [data-type="placeholder"]'
      );
      setTodos(e.length);
    }, []);

    return todos == 0 ? null : (
      <div
        {...{ ["data-type"]: "todo-overlay" }}
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          padding: ".6rem",
          margin: ".5rem",
          marginRight: 0,
          background: _toDoStyle.background,
          color: _toDoStyle.color,
          boxShadow: "0 .125rem 1rem rgba(0,0,0,.6)",
          fontSize: ".8rem",
          borderRadius: ".5rem 0 0 .5rem",
          display: "flex",
          alignItems: "center",
          gap: ".4rem",
        }}
      >
        <XIcon height="1.2rem" onClick={() => setTodos(0)} />
        <span>
          <b>{todos} ToDos</b> on this page
        </span>
      </div>
    );
  }

  export function Inline({
    msg,
    ...elbe
  }: { msg: string; width?: number; height?: number } & ElbeProps) {
    return (
      <div
        {...applyProps("todo", elbe, [], {
          ..._toDoStyle,
          display: "inline",
        })}
      >
        <b>ToDo: </b>
        <span style={{ fontWeight: "normal" }}>{msg}</span>
      </div>
    );
  }

  export function Block({
    msg,
    width,
    height,
    ...elbe
  }: { msg: string; width?: number; height?: number } & ElbeProps) {
    return (
      <div
        {...applyProps("todo", elbe, [], {
          ..._toDoStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: width ? width + "rem" : "auto",
          height: height ? height + "rem" : "auto",
          overflow: "hidden",
        })}
      >
        <span>
          <b>ToDo: </b>
          <span style={{ fontWeight: "normal" }}>{msg}</span>
        </span>
      </div>
    );
  }

  export function Placeholder({
    width,
    height,
    ...elbe
  }: { width?: number; height?: number } & ElbeProps) {
    return (
      <div
        {...applyProps("placeholder", elbe, [], {
          padding: "0",
          width: width ? width + "rem" : "auto",
          height: height ? height + "rem" : "auto",
          overflow: "hidden",
        })}
      >
        <svg
          width={width ? width + "rem" : "100%"}
          height={height ? height + "rem" : "100%"}
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="transparent"
            stroke={_toDoStyle.background}
            strokeWidth={".25rem"}
          />
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke={_toDoStyle.background}
            strokeWidth=".125rem"
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke={_toDoStyle.background}
            strokeWidth=".125rem"
          />
        </svg>
      </div>
    );
  }
}
