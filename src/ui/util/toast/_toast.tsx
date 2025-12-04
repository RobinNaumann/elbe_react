import { Icons, Row, Text } from "../../..";
import { Card } from "../../components/base/card";
import { IconButton } from "../../components/button/icon_button";
import { ToastModel } from "./toast_ctx";

export function _Toast(p: { model: ToastModel; onClose: () => void }) {
  return (
    <Card
      elevated
      padding={0}
      scheme={p.model.kind ? "primary" : "inverse"}
      manner="major"
      kind={p.model.kind}
      className="toast-animated"
      style={{ pointerEvents: "auto" }}
      onTap={() => p.onClose()}
    >
      <Row>
        <Text
          flex
          bold
          v={p.model.message}
          style={{
            padding: ".5rem",
            paddingRight: 0,
          }}
        />
        <IconButton.plain
          transparent
          ariaLabel="dismiss the toast"
          icon={Icons.X}
          onTap={() => p.onClose()}
        />
      </Row>
    </Card>
  );
}
