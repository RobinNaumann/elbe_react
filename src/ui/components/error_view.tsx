import { icons } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Card,
  Column,
  Dialog,
  ElbeError,
  Icon,
  Icons,
  L10nInlinePlain,
  Text,
  toElbeError,
} from "../..";
import { _maybeL10n } from "../util/l10n/_l10n_util";

/** * A component to display error messages in a user-friendly manner.
 *
 * **Properties:**
 * - `error` (any): The error object to be displayed.
 * - `retry` (function | undefined): An optional callback function to retry the failed operation.
 * - `debug` (boolean | undefined): If true, displays detailed error information for debugging purposes.
 */
export function ErrorView({
  error,
  retry,
  debug,
}: {
  error: any;
  retry?: () => any;
  debug?: boolean;
}) {
  const l10n = _maybeL10n();
  const apiError: ElbeError = toElbeError(error);
  const fallback =
    typeof apiError.message === "string"
      ? apiError.message
      : "An error occurred";
  return !debug ? (
    <PrettyErrorView error={apiError} retry={retry} />
  ) : (
    <Card scheme="inverse">
      <Column>
        <h3 style={{ margin: 0 }}>ERROR: {apiError.code}</h3>
        <p>{l10n?.inline(apiError.message) ?? fallback}</p>
        <pre>{JSON.stringify(apiError, null, 2)}</pre>
      </Column>
    </Card>
  );
}

export function PrettyErrorView({
  error,
  retry,
  labels = {
    retry: {
      en: "retry",
      de: "erneut versuchen",
      es: "intentar de nuevo",
      fr: "réessayer",
      it: "riprovare",
      pt: "tentar novamente",
    },
    home: {
      en: "go home",
      de: "zur Startseite",
      es: "a la página de inicio",
      fr: "aller à l'accueil",
      it: "torna alla home",
      pt: "voltar para a página inicial",
    },
    details: {
      en: "error details",
      de: "Fehlerdetails",
      es: "detalles del error",
      fr: "détails de l'erreur",
      it: "dettagli dell'errore",
      pt: "detalhes do erro",
    },
  },
}: {
  error: ElbeError;
  retry?: () => any;
  labels?: {
    retry?: L10nInlinePlain;
    home?: L10nInlinePlain;
    details: L10nInlinePlain;
  };
}) {
  const l10n = _maybeL10n();
  const [open, setOpen] = useState(false);

  return (
    <Column cross="center" style={{ margin: "1rem 0", padding: "1rem" }}>
      <Icon icon={error.icon ?? icons.OctagonAlert} />
      <Text.h4 v={l10n?.inline(error.message) ?? "error"} />
      <Text
        align="center"
        v={l10n?.inline(error.description) ?? ""}
        style={{ cursor: "pointer" }}
        native={{ onClick: () => setOpen(true) }}
      />
      {retry && (
        <Button.flat
          ariaLabel={l10n?.inline(labels.retry) ?? "retry"}
          label={l10n?.inline(labels.retry) ?? "retry"}
          icon={Icons.RotateCcw}
          onTap={() => retry()}
        />
      )}
      {error.code === 404 && (
        <Button.flat
          ariaLabel={l10n?.inline(labels.home) ?? "go home"}
          label={l10n?.inline(labels.home) ?? "go home"}
          icon={Icons.House}
          onTap={() => (window.location.href = "/")}
        />
      )}
      <Dialog
        title={l10n?.inline(labels.details) ?? "error details"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <pre>
          {`code: ${error.code}\n\n` + JSON.stringify(error.details, null, 2)}
        </pre>
      </Dialog>
    </Column>
  );
}
