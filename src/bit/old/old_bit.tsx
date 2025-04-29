import { Signal, useSignal } from "@preact/signals";
import { type PreactContext, createContext } from "preact";
import { useContext } from "preact/hooks";
import { ErrorView } from "../../ui/components/error_view";
import { Column } from "../../ui/components/layout/flex";
import { Spinner } from "../../ui/components/spinner";

export interface OldBitUseInterface<C, T> {
  signal: Signal<OldBitState<T>>;
  ctrl: C;
  map: <D>(m: OldTriMap<T, D>) => D | preact.JSX.Element;
  onData: <D>(
    f: (d: T) => any,
    {
      onLoading,
      onError,
    }?: { onLoading?: () => any; onError?: (e: string) => any }
  ) => any;
}

interface OldBitData<C, T> {
  ctrl: C;
  state: Signal<OldBitState<T>>;
}

export interface OldBitState<T> {
  loading?: boolean;
  error?: any;
  data?: T;
}

export type OldBitContext<T, C> = PreactContext<OldBitData<T, C> | null>;

export interface OldTriMap<T, D> {
  onLoading?: () => D;
  onError?: (e: string) => D;
  onData?: (value: T) => D;
}

export interface OldTWParams<T> {
  emit: (t: T) => void;
  emitLoading: () => void;
  emitError: (e: any) => void;
  map: <D>(m: OldTriMap<T, D>) => D;
  signal: Signal<OldBitState<T>>;
}

export function makeOldBit<C, T>(name: string): OldBitContext<C, T> {
  const c = createContext<OldBitData<C, T> | null>(null);
  c.displayName = name;
  return c;
}

export function ProvideOldBit<I, C, T>(
  context: OldBitContext<C, T>,
  parameters: I,
  worker: (p: I, d: OldTWParams<T>, ctrl: C) => void,
  ctrl: (p: I, d: OldTWParams<T>) => C,
  children: any
) {
  const s = useSignal<OldBitState<T>>({ loading: true });

  const _set = (n: OldBitState<T>) => {
    try {
      if (JSON.stringify(n) === JSON.stringify(s.peek())) return;
    } catch (e) {}
    s.value = n;
  };

  const emit = (data: T) => _set({ data });
  const emitLoading = () => _set({ loading: true });
  const emitError = (error: any) => {
    console.warn(`BIT: ${context.displayName} emitted ERROR`, error);
    return _set({ error });
  };

  function map<D>(m: OldTriMap<T, D>) {
    const st = s.value;
    if (st.loading) return m.onLoading!();
    if (st.error) return m.onError!(st.error);
    return m.onData!(st.data ?? (null as any));
  }

  const c = ctrl(parameters, { emit, emitLoading, emitError, map, signal: s });
  worker(parameters, { emit, emitLoading, emitError, map, signal: s }, c);

  return (
    <context.Provider value={{ ctrl: c, state: s }}>
      {children}
    </context.Provider>
  );
}

export function useOldBit<C, T>(
  context: OldBitContext<C, T>
): OldBitUseInterface<C, T> {
  try {
    const { ctrl, state } = useContext(context)!;
    const v = state.value;

    function map<D>(m: OldTriMap<T, D>) {
      if (v.loading)
        return (
          m.onLoading ||
          (() => (
            <Column cross="center">
              <Spinner />
            </Column>
          ))
        )();
      if (v.error)
        return (
          m.onError ||
          ((e) => <ErrorView error={e} retry={(ctrl as any).reload ?? null} />)
        )(v.error);
      return m.onData!(v.data ?? (null as any));
    }

    return {
      signal: state,
      ctrl,
      map,
      /**
       * this is a quality of life function that allows
       * you to chain the map function with the onData function
       * @param f the builder function
       * @returns the built component
       */
      onData: (
        f: (d: T) => any,
        {
          onLoading,
          onError,
        }: { onLoading?: () => any; onError?: (e: string) => any } = {}
      ) => map({ onData: f, onLoading: onLoading, onError: onError }),
    };
  } catch (e) {
    const err = `BIT ERROR: NO ${context.displayName} PROVIDED`;
    console.error(err, e);
    return {
      map: (_: any) => <div>{err}</div>,
      ctrl: null as any,
      signal: null as any,
      onData: () => <div>{err}</div>,
    };
  }
}
