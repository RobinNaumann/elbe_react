import { useSignal } from "@preact/signals";
import { icons } from "lucide-react";
import { route } from "preact-router";
import {
  ElbeDialog,
  ElbeError,
  Icon,
  Icons,
  L10nInlinePlain,
  toElbeError,
} from "../..";
import { _maybeL10n } from "../util/l10n/_l10n_util";

export function ErrorView({
  error,
  retry,
  debug,
}: {
  error: any;
  retry?: () => any;
  debug?: boolean;
}) {
  const apiError: ElbeError = toElbeError(error);
  return !debug ? (
    <PrettyErrorView error={apiError} retry={retry} />
  ) : (
    <div class="column padded card inverse cross-stretch">
      <h3 style="margin: 0">ERROR: {apiError.code}</h3>
      <p>{apiError.message}</p>
      <pre>{JSON.stringify(apiError, null, 2)}</pre>
    </div>
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
  const openSig = useSignal(false);

  return (
    <div class="column padded cross-center" style="margin: 1rem 0">
      <Icon icon={error.icon ?? icons.OctagonAlert} />
      <h4 style="margin: 0">{l10n?.inline(error.message) ?? "error"}</h4>
      <span class="pointer" onClick={() => (openSig.value = true)}>
        {l10n?.inline(error.description) ?? ""}
      </span>
      {retry && (
        <button class="action" onClick={() => retry()}>
          <Icons.RotateCcw /> {l10n?.inline(labels.retry) ?? "retry"}
        </button>
      )}
      {error.code === 404 && (
        <button class="action" onClick={() => route("/")}>
          <Icons.House />
          {l10n?.inline(labels.home) ?? "go home"}
        </button>
      )}
      <ElbeDialog
        title={l10n?.inline(labels.details) ?? "error details"}
        open={openSig.value}
        onClose={() => (openSig.value = false)}
      >
        <pre class="card inverse">
          {`code: ${error.code}\n\n` + JSON.stringify(error.details, null, 2)}
        </pre>
      </ElbeDialog>
    </div>
  );
}
