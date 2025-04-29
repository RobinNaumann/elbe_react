import { JSX } from "preact/jsx-runtime";
import { BitStates, ElbeChild, ElbeChildren, Maybe, PromiseOr } from "..";

export interface _BitData<D> {
  state: any;
}
export type _BitState<D> =
  | {
      type: "loading";
    }
  | {
      type: "error";
      value: any;
    }
  | {
      type: "data";
      value: D;
    };

export type BitTriMap<T, D> = {
  onLoading?: () => D;
  onError?: (e: any) => D;
  onData?: (value: T) => D;
};

export interface _BitGetInterface<D> {
  // bit state information
  state: BitStates;
  isData: boolean;
  isLoading: boolean;
  isError: boolean;

  // get values
  data: D | undefined;
  error: any | undefined;

  // map function
  map: <T>(
    onData: ((d: D) => T) | T,
    onError?: ((e: any) => T) | T,
    onLoading?: (() => T) | T
  ) => T | null;
  mapUI: (
    onData: (d: D) => ElbeChild,
    onError?: (e: any) => ElbeChild,
    onLoading?: () => ElbeChild
  ) => ElbeChild;

  back: () => boolean;
  canGoBack: boolean;
}

export type BitUseInterface<D, I> = _BitGetInterface<D> &
  I & {
    reload: () => void;
  };

export interface _BitCtrlInput<D, P> extends _BitGetInterface<D> {
  // emit functions
  setData: (d: D) => void;
  setLoading: () => void;
  setError: (e: any) => void;

  // quality of life functions
  act: (fn: (data: D) => PromiseOr<D>, silent?: boolean) => void;
  parameters: P;
}

export type _BitCtrlMaker<D, P, I> = (d: _BitCtrlInput<D, P>) => I;

export type _BitProvider<P> = (
  p: { children?: Maybe<ElbeChildren> } & P
) => JSX.Element;

export interface _BitInterface<D, P, I> {
  Provider: _BitProvider<P>;
  use: () => BitUseInterface<D, I>;
}

export function _isFn<T>(f: any): f is (d: T) => any {
  return typeof f === "function";
}
