import { Icons, Row, Text } from "../../..";
import { Card } from "../../components/base/card";
import { Icon, IconButton } from "../../components/button/icon_button";
import { ToastModel } from "./toast_ctx";

export function _Toast(p: { model: ToastModel; onClose?: () => void }) {
  return (
    <Card
      elevated
      padding={0}
      scheme={"inverse"}
      manner={p.model.kind ? "minor" : "plain"}
      kind={p.model.kind}
      className="toast-animated"
      style={{ pointerEvents: "auto" }}
      //onTap={() => p.onClose && p.onClose()}
    >
      <Row
        cross="center"
        gap={0.5}
        style={{ minHeight: "3.5rem", paddingLeft: "1rem" }}
      >
        {p.model.icon && <Icon icon={p.model.icon} />}
        <Text flex bold v={p.model.message} style={{ padding: ".5rem 0" }} />
        {p.onClose && (
          <IconButton
            manner={p.model.kind ? "minor" : "plain"}
            transparent
            ariaLabel="dismiss the toast"
            icon={Icons.X}
            onTap={() => p.onClose && p.onClose()}
          />
        )}
      </Row>
    </Card>
  );
}
