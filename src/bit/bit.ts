import { createContext, PreactContext } from "preact";
import { useContext } from "preact/hooks";
import { Maybe, PromiseOr } from "..";
import { _makeBitProvider } from "./_bit_provider";
import {
  _BitCtrlMaker,
  _BitData,
  _BitGetInterface,
  _BitInterface,
} from "./_bit_utils";

export type BitStates = "loading" | "error" | "data";
export type BitContext<D> = PreactContext<_BitData<D> | null>;
export type BitTriMap<T, D> = {
  onLoading?: () => D;
  onError?: (e: any) => D;
  onData?: (value: T) => D;
};
export type BitUseInterface<D, I> = _BitGetInterface<D> & I;

export type BitParams<D, P, I> = {
  control?: _BitCtrlMaker<D, P, I>;
  debugLabel?: Maybe<string>;
  worker: (params: P) => PromiseOr<D>;
  useHistory?: boolean;
};

export function createBit<D, P extends Object, I>({
  control = () => ({} as I),
  ...p
}: BitParams<D, P, I>): _BitInterface<D, P, I> {
  const context = createContext<BitUseInterface<D, I>>(null as any);
  {
    return {
      Provider: _makeBitProvider<D, P, I>(context, { ...p, control }),
      use: () => {
        const ctx = useContext(context);
        if (!ctx) {
          throw new Error(`BIT ERROR: NO ${p.debugLabel} PROVIDED`);
        }

        return ctx;
      },
    };
  }
}
