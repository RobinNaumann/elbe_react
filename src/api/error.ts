import { errors, Maybe } from "..";
import { IconChild } from "../ui/components/button/icon_button";
import { L10nInlinePlain } from "../ui/util/l10n/l10n";

/**
 * a generic error for providing reasonable error messages
 * to both the user and the developer
 */
export type ElbeError = {
  code: string | number;
  message: string | L10nInlinePlain;
  description?: Maybe<string | L10nInlinePlain>;
  icon?: Maybe<IconChild>;

  // cause chain and information
  details?: Maybe<any>;
  cause?: Maybe<ElbeError | any>;
};

export function isElbeError(e: any): e is ElbeError {
  return (
    e &&
    (typeof e.code === "string" || typeof e.code === "number") &&
    (typeof e.message === "string" || typeof e.message === "object")
  );
}

export function maybeElbeError(e: any): ElbeError | null {
  if (isElbeError(e)) return e;
  return null;
}

export function toElbeError(e: any): ElbeError {
  return (
    maybeElbeError(e) ?? {
      ...errors.unknown,
      details: e,
    }
  );
}

export function httpErrorFromCode(code: number, e?: any): ElbeError {
  const err =
    Object.values(errors.http).find(
      (e) => e.code.toString().split("_")[1] === code.toString()
    ) ?? errors.unknown;

  return {
    ...err,
    details: e,
  };
}

/**
 * takes an object and throws it as an ElbeError.
 * @param e the error to throw
 */
export function rethrow(e: any, base: ElbeError = errors.unknown): void {
  if (isElbeError(e)) throw e;

  throw {
    ...base,
    message: e instanceof Error ? e.message : base.message,
    details: e,
  };
}
