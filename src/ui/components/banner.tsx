import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  CircleHelpIcon,
  InfoIcon,
  OctagonAlertIcon,
  XIcon,
} from "lucide-react";
import {
  Align,
  Card,
  Column,
  ElbeAlertKinds,
  IconButton,
  IconChild,
  Row,
  Text,
} from "../..";

export function KindAlertIcon({
  kind,
  size = "body-m",
}: {
  kind: ElbeAlertKinds;
  size?: "body-s" | "body-m" | "body-l";
}) {
  let icon = CircleHelpIcon;
  if (kind === "info") icon = InfoIcon;
  if (kind === "warning") icon = AlertTriangleIcon;
  if (kind === "error") icon = OctagonAlertIcon;
  if (kind === "success") icon = CheckCircle2Icon;

  let scale = 1;
  if (size === "body-s") scale = 0.8;
  if (size === "body-l") scale = 1.2;

  return icon({ size: `${scale * 1.5}rem` });
}

export function Banner({
  kind,
  manner = "major",
  title,
  onDismiss,
  dismissIcon = XIcon,
  children,
}: {
  kind: ElbeAlertKinds;
  manner?: "major" | "minor";
  title?: string;
  onDismiss?: () => void;
  dismissIcon?: IconChild;
  children?: React.ReactNode;
}) {
  return (
    <Card kind={kind} manner={manner} padding={0}>
      <Row cross="start" gap={0}>
        <Align size={3}>
          <KindAlertIcon kind={kind} />
        </Align>
        <Column
          gap={0.5}
          class="flex-1"
          style={{ padding: ".9rem 0", paddingRight: onDismiss ? "0" : "1rem" }}
        >
          {title && <Text bold v={title} />}
          {children}
        </Column>
        {onDismiss && (
          <IconButton
            manner={manner}
            kind={kind}
            transparent={manner === "minor"}
            ariaLabel="close"
            icon={dismissIcon}
            onTap={onDismiss}
          />
        )}
      </Row>
    </Card>
  );
}
