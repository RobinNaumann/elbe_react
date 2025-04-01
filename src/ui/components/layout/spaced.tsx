export function Spaced({
  width,
  height,
  amount = 1,
}: {
  amount?: number;
  width?: number;
  height?: number;
}) {
  const fromWH: boolean = !!(width || height);
  return (
    <div
      style={{
        width: (fromWH ? width ?? 0 : amount) + "rem",
        height: (fromWH ? height ?? 0 : amount) + "rem",
      }}
    ></div>
  );
}
