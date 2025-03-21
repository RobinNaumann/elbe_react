import {
  Align,
  Card,
  Column,
  ElbeAlertKinds,
  IconButton,
  IconChild,
  Row,
  Text,
} from "elbe-ui";
import {
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  InfoIcon,
  OctagonAlert,
  XIcon,
} from "lucide-react";

export function KindAlertIcon({ kind }: { kind: ElbeAlertKinds }) {
  if (kind === "info") return <InfoIcon />;
  if (kind === "warning") return <AlertTriangle />;
  if (kind === "error") return <OctagonAlert />;
  if (kind === "success") return <CheckCircle2 />;
  return <CircleHelp />;
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
