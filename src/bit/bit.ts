import { Context, createContext, useContext } from "react";
import { Maybe, PromiseOr } from "..";
import { _makeBitProvider } from "./_bit_provider";
import {
  _BitCtrlMaker,
  _BitData,
  _BitGetInterface,
  _BitInterface,
} from "./_bit_utils";

export type BitStates = "loading" | "error" | "data";
export type BitContext<D> = Context<_BitData<D> | null>;
export type BitTriMap<T, D> = {
  onLoading?: () => D;
  onError?: (e: any) => D;
  onData?: (value: T) => D;
};
export type BitUseInterface<D, P, I> = _BitGetInterface<D> &
  I & {
    parameters: P;
  };

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
  const context = createContext<BitUseInterface<D, P, I>>(null as any);
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
