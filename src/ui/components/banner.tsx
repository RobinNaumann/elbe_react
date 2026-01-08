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
  ColorSelection,
  Column,
  IconButton,
  IconChild,
  Row,
  Text,
} from "../..";

export function KindAlertIcon({
  kind,
  size = "body-m",
}: {
  kind: ColorSelection.KindsAlert;
  size?: "body-s" | "body-m" | "body-l";
}) {
  let Icon = CircleHelpIcon;
  if (kind === "info") Icon = InfoIcon;
  if (kind === "warning") Icon = AlertTriangleIcon;
  if (kind === "error") Icon = OctagonAlertIcon;
  if (kind === "success") Icon = CheckCircle2Icon;

  let scale = 1;
  if (size === "body-s") scale = 0.8;
  if (size === "body-l") scale = 1.2;

  return <Icon size={`${scale * 1.5}rem`} />;
}

/** A banner component to display important messages to the user.
 *
 * ### Properties:
 * - `kind` (ColorSelection.KindsAlert): The kind of banner, which determines the icon and color scheme.
 * - `manner` ("major" | "minor" | undefined): The manner of the banner, affecting its visual prominence. Default is "major".
 * - `title` (string | undefined): An optional title for the banner.
 * - `onDismiss` (function | undefined): An optional callback function that is called when the dismiss button is clicked.
 * - `dismissIcon` (IconChild | undefined): An optional icon to use for the dismiss button. Default is XIcon.
 * - `children` (React.ReactNode | undefined): The content of the banner.
 *
 * ### Usage:
 * ```tsx
 * <Banner kind="info" title="Information" onDismiss={() => {}}>
 *   This is an informational banner.
 * </Banner>
 * ```
 */
export function Banner({
  kind,
  manner = "major",
  title,
  onDismiss,
  dismissIcon = XIcon,
  children,
}: {
  kind: ColorSelection.KindsAlert;
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
          flex
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
