import { useSignal } from "@preact/signals";
import { route } from "preact-router";
import { Icons } from "../..";
import { ifApiError, type ApiError } from "../../service/s_api";
import { ElbeDialog } from "./dialog";

export function ErrorView({
  error,
  retry,
  debug,
}: {
  error: any;
  retry?: () => any;
  debug?: boolean;
}) {
  const apiError: ApiError = ifApiError(error) ?? {
    code: 0,
    message: "unknown error",
    data: error,
  };
  return !debug ? (
    <PrettyErrorView apiError={apiError} retry={retry} />
  ) : (
    <div class="column padded card inverse cross-stretch">
      <h3 style="margin: 0">ERROR: {apiError.code}</h3>
      <p>{apiError.message}</p>
      <pre>{JSON.stringify(apiError.data, null, 2)}</pre>
    </div>
  );
}

export function PrettyErrorView({
  apiError,
  retry,
  labels = {
    retry: "retry",
    home: "go home",
    details: "error details",
  },
}: {
  apiError: ApiError;
  retry?: () => any;
  labels?: { retry?: string; home?: string; details?: string };
}) {
  const openSig = useSignal(false);
  return (
    <div class="column padded cross-center" style="margin: 1rem 0">
      <Icons.OctagonAlert />
      <h3 style="margin: 0">{apiError.code}</h3>
      <span class="pointer" onClick={() => (openSig.value = true)}>
        {apiError.message}
      </span>
      {retry && (
        <button class="action" onClick={() => retry()}>
          <Icons.RotateCcw /> {labels.retry ?? "retry"}
        </button>
      )}
      {apiError.code === 404 && (
        <button class="action" onClick={() => route("/")}>
          <Icons.House />
          {labels.home ?? "go home"}
        </button>
      )}
      <ElbeDialog
        title={labels.details ?? "error details"}
        open={openSig.value}
        onClose={() => (openSig.value = false)}
      >
        <pre class="card inverse">{JSON.stringify(apiError.data, null, 2)}</pre>
      </ElbeDialog>
    </div>
  );
}
