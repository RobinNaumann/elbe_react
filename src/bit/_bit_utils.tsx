import { JSX } from "preact/jsx-runtime";
import {
  BitStates,
  BitUseInterface,
  ElbeChild,
  ElbeChildren,
  Maybe,
  PromiseOr,
} from "..";

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
  /**
   * the current state of the bit. Is one of the following:
   * - `data`: if valid data is present
   * - `error`: if an error occurred
   * - `loading`: if the bit is loading
   */
  state: BitStates;

  /**
   * QoL function to check if the current state is `data`
   */
  isData: boolean;

  /**
   * QoL function to check if the current state is `loading`
   */
  isLoading: boolean;

  /**
   * QoL function to check if the current state is `error`
   */
  isError: boolean;

  /**
   * the current data of the bit. If the state is not `data`, it will be `undefined`.
   */
  data: D | undefined;

  /**
   * the current error of the bit. If the state is not `error`, it will be `undefined`.
   */
  error: any | undefined;

  /**
   * return a value based on the current state.
   * You can pass a function or a value. If you don't pass a parameter, it will return `null`.
   * @param onData the value (or function) to return when the state is "data"
   * @param onError the value (or function) to return when the state is "error"
   * @param onLoading the value (or function) to return when the state is "loading"
   * @returns the (nullable) T based on the current state
   */
  map: <T>(
    onData: ((d: D) => T) | T,
    onError?: ((e: any) => T) | T,
    onLoading?: (() => T) | T
  ) => T | null;

  /**
   * a wrapper around `map` that returns a JSX element.
   * If you don't pass a parameter, a default UI element will be rendered
   * @param onData the value (or function) to return when the state is "data"
   * @param onError the value (or function) to return when the state is "error"
   * @param onLoading the value (or function) to return when the state is "loading"
   * @returns a JSX element
   */
  mapUI: (
    onData: (d: D) => ElbeChild,
    onError?: (e: any) => ElbeChild,
    onLoading?: () => ElbeChild
  ) => ElbeChild;

  /**
   * return to the previous `data` state. If there is no previous state, it will return `false`.
   * make sure you enable `useHistory` in the `createBit` function. You can check if a history exists with `canGoBack`.
   * @returns
   */
  back: () => boolean;

  /**
   * returns true if a previous `data` state exists.
   */
  canGoBack: boolean;

  /**
   * reload the data. It will call the worker function again.
   * If `silent` is true, it will not change the state to `loading`.
   */
  reload: (silent?: boolean) => void;
}

export interface _BitCtrlInput<D, P> extends _BitGetInterface<D> {
  // emit functions
  setData: (d: D) => void;
  setLoading: () => void;
  setError: (e: any) => void;

  /**
   * makes it easier to change the data state. It gets called when data is present.
   * It will publish the data that `fn` returns as a new state.
   * If an error occurs, it will set the state to `error` with the error.
   * @param fn the function to call. It will be called with the current data.
   * @param silent if true, it will not change the state to `loading` before calling `fn`.
   */
  act: (fn: (data: D) => PromiseOr<D>, silent?: boolean) => void;

  /**
   * the parameters passed to the provider.
   */
  parameters: P;
}

export type _BitCtrlMaker<D, P, I> = (d: _BitCtrlInput<D, P>) => I;

export type _BitProvider<P> = (
  p: { children?: Maybe<ElbeChildren> } & P
) => JSX.Element;

export interface _BitInterface<D, P, I> {
  Provider: _BitProvider<P>;
  use: () => BitUseInterface<D, P, I>;
}

export function _isFn<T>(f: any): f is (d: T) => any {
  return typeof f === "function";
}
