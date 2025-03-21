import { CheckIcon } from "lucide-react";
import { ActionElbeProps, applyProps } from "../../..";

export function Switch({
  value,
  label,
  onChange,
  ...elbe
}: {
  value: boolean;
  label?: string;
  onChange?: ((checked: boolean) => void) | null;
} & ActionElbeProps) {
  const cFront = value ? "var(--c-accent)" : "var(--c-context-front)";

  return (
    <button
      onClick={() => onChange?.(!value)}
      {...applyProps("switch", elbe, ["bordered card"], {
        border: "0.15rem solid",
        minHeight: 0,
        minWidth: 0,
        filter: onChange ? "" : "grayscale(1)",
        opacity: onChange ? "" : "0.5",
        borderColor: cFront,
        borderRadius: "5rem",
        height: "1.8rem",
        width: "2.7rem",
        position: "relative",
        padding: "0rem",
        borderWidth: value ? "0.20rem" : "0.15rem",
        display: "flex",
        alignItems: "center",
        transition: "border-color 0.25s, border-width 0.25s",
      })}
    >
      <div
        style={{
          position: "absolute",
          left: value ? "1.05rem" : "0.2rem",

          width: "1.2rem",
          height: "1.2rem",
          borderRadius: "1rem",
          backgroundColor: cFront,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.25s, left 0.25s",
          paddingRight: "0.00rem",
          paddingTop: "0.03rem",
        }}
      >
        {value && (
          <CheckIcon
            // @ts-ignore
            color="var(--c-context-back)"
            width=".75rem"
            height=".75rem"
            absoluteStrokeWidth={false}
            strokeWidth="0.3rem"
          />
        )}
      </div>
    </button>
  );
}
