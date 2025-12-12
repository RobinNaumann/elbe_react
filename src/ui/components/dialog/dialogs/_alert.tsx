import { Button, Column, DialogsConfig, Row, Text } from "../../../..";

type _Params = {
  message: string;
  labelOkay?: string;
};

export const showAlertDialog: DialogsConfig<_Params, null> = {
  onClose: () => null,
  children: (p, close) => (
    <Column gap={2}>
      <Text v={p.message} />
      <Row>
        <Button.major
          flex
          ariaLabel="close dialog"
          label={p.labelOkay ?? "Yes"}
          onTap={() => close(null)}
        />
      </Row>
    </Column>
  ),
};
