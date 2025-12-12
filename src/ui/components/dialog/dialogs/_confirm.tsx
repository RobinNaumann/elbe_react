import { Button, Column, DialogsConfig, Row, Text } from "../../../..";

type _Params = {
  message: string;
  labelYes?: string;
  labelNo?: string;
  highlight?: "yes" | "no" | "none";
};

export const showConfirmDialog: DialogsConfig<_Params, boolean> = {
  onClose: (value) => value ?? false,
  children: ({ highlight = "no", ...p }, close) => (
    <Column gap={2}>
      <Text v={p.message} />
      <Row>
        <Button
          flex
          ariaLabel="select no"
          manner={highlight === "no" ? "major" : "minor"}
          label={p.labelNo ?? "No"}
          onTap={() => close(false)}
        />
        <Button
          flex
          ariaLabel="select yes"
          manner={highlight === "yes" ? "major" : "minor"}
          label={p.labelYes ?? "Yes"}
          onTap={() => close(true)}
        />
      </Row>
    </Column>
  ),
};
