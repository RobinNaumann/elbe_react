import { Context, useEffect, useMemo, useState } from "react";
import {
  BitParams,
  BitUseInterface,
  Column,
  ElbeChild,
  ElbeChildren,
  ErrorView,
  Maybe,
  PromiseOr,
  Spinner,
} from "..";
import { _BitCtrlMaker, _BitProvider, _BitState, _isFn } from "./_bit_utils";

function _LoadView({}) {
  return (
    <Column cross="center">
      <Spinner />
    </Column>
  );
}

export function _makeBitProvider<D, P, I>(
  context: Context<BitUseInterface<D, P, I>>,
  bitP: BitParams<D, P, I> & {
    control: _BitCtrlMaker<D, P, I>;
  }
): _BitProvider<P> {
  function _BitProvider(p: { children?: Maybe<ElbeChildren> } & P) {
    const [state, setState] = useState<{
      v: _BitState<D>;
      history: D[];
    }>({
      v: { type: "loading" },
      history: [],
    });

    // ========== DEFINE BASIC CTRLS ==========

    function _make() {
      const _partCtrl = {
        setData: (d: D) => {
          // if it's the same data, don't update
          if (state.v.type === "data" && state.v.value === d) return;

          setState({
            history: bitP.useHistory ? [...state.history, d] : [],
            v: { type: "data", value: d },
          });
        },
        setLoading: () => setState({ ...state, v: { type: "loading" } }),
        setError: (e: any) =>
          setState({ ...state, v: { type: "error", value: e } }),

        canGoBack: !!(bitP.useHistory && state.history.length > 1),
        back: () => {
          if (!bitP.useHistory) return false;
          if (state.history.length < 2) return false;

          const newHistory = state.history.slice(0, -1);
          const newData = newHistory[newHistory.length - 1];
          setState({
            history: newHistory,
            v: { type: "data", value: newData },
          });

          return true;
        },

        state: state.v.type,
        isData: state.v.type === "data",
        isLoading: state.v.type === "loading",
        isError: state.v.type === "error",

        data: state.v.type === "data" ? state.v.value : undefined,
        error: state.v.type === "error" ? state.v.value : undefined,
      };

      // ========== DEFINE QoL FUNCTIONS ==========

      async function _worker(
        fn: () => PromiseOr<D>,
        silent?: boolean,
        reset?: boolean
      ) {
        if (!silent) _partCtrl.setLoading();
        try {
          const newData: D = await fn();
          if (!reset) return _partCtrl.setData(newData);

          setState({
            history: bitP.useHistory ? [newData] : [],
            v: { type: "data", value: newData },
          });
        } catch (e) {
          _partCtrl.setError(e);
        }
      }

      const _reload = (silent?: boolean) =>
        _worker(() => bitP.worker(p), silent);

      async function act(fn: (data: D) => PromiseOr<D>, silent?: boolean) {
        const data = _partCtrl.data;
        if (data === undefined) return;
        _worker(() => fn(data), silent);
      }

      function map<T>(
        onData: ((d: D) => T) | T,
        onError?: ((e: any) => T) | Maybe<T>,
        onLoading?: (() => T) | Maybe<T>
      ): T | null {
        if (state.v.type === "data") {
          return _isFn(onData)
            ? onData(state.v.value)
            : (onData as any) ?? null;
        }
        if (state.v.type === "error") {
          return _isFn(onError)
            ? onError(state.v.value)
            : (onError as any) ?? null;
        }
        return _isFn(onLoading) ? onLoading() : (onLoading as any) ?? null;
      }

      function mapUI(
        onData: (d: D) => ElbeChildren,
        onError?: Maybe<(e: any) => ElbeChildren>,
        onLoading?: Maybe<() => ElbeChildren>
      ): ElbeChildren {
        return map(
          (d) => onData(d),
          (e) =>
            (
              onError ??
              ((e) => <ErrorView error={e} retry={() => _reload(false)} />)
            )(e),
          () => (onLoading ?? (() => <_LoadView />))()
        );
      }

      const baseCtrl = {
        ..._partCtrl,
        act,
        map,
        mapUI,
      };

      function consider(children: () => ElbeChild): ElbeChild {
        return children();
      }

      const userCtrl = bitP.control({
        ...baseCtrl,
        parameters: p,
        reload: _reload,
        consider: consider,
      });

      return {
        ...baseCtrl,
        ...userCtrl,
        reload: _reload,
        parameters: p,
        consider: consider,
      };
    }

    const ctrl: BitUseInterface<D, P, I> = useMemo(() => _make(), [state]);
    useEffect(() => {
      ctrl.reload(true);
    }, []);

    // ========== DEFINE THE JSX ELEMENT ==========
    return <context.Provider value={ctrl}>{p.children}</context.Provider>;
  }

  return _BitProvider;
}
