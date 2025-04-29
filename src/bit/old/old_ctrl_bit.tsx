import { useEffect } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import {
  makeOldBit,
  OldBitContext,
  OldBitUseInterface,
  OldTWParams,
  ProvideOldBit,
  useOldBit,
} from "./old_bit";

abstract class OldBitControl<I, DT> {
  p: I;
  bit: OldTWParams<DT>;

  constructor(p: I, bit: OldTWParams<DT>) {
    this.bit = bit;
    this.p = p;
  }

  act(fn: (b: DT) => Promise<void>) {
    this.bit.map({
      onData: async (d) => {
        try {
          await fn(d);
        } catch (e: any) {
          if (e && e.code && e.message)
            console.error(`[BitERROR] act: ${e.code} (${e.message})`);
          else console.error("[BitERROR] act: ", e);
        }
      },
    });
  }

  /**
   * Clean up resources. This is called once
   * the element is removed from the DOM.
   */
  dispose() {}
}

export abstract class WorkerControl<I, DT> extends OldBitControl<I, DT> {
  reload: (() => Promise<void>) | null = null;

  abstract worker(): Promise<DT>;
}

export abstract class StreamControl<I, DT, Stream> extends OldBitControl<
  I,
  DT
> {
  protected stream: Stream | null = null;
  abstract listen(): Stream;

  dispose(): void {
    if (this.stream) this.disposeStream(this.stream);
  }
  abstract disposeStream(stream: Stream): void;
}

function make<I, DT, C extends OldBitControl<I, DT>>(
  name: string
): OldBitContext<C, DT> {
  return makeOldBit<C, DT>(name);
}

function use<I, DT, C extends OldBitControl<I, DT>>(
  b: OldBitContext<C, DT>
): OldBitUseInterface<C, DT> {
  return useOldBit<C, DT>(b);
}

export function CtrlBit<I, DT, C extends OldBitControl<I, DT>>(
  ctrl: (p: I, d: OldTWParams<DT>) => C,
  name?: string
): {
  Provide: (props: I & { children: React.ReactNode }) => JSX.Element;
  use: () => OldBitUseInterface<C, DT>;
} {
  const context = make<I, DT, C>((name || "Unknown") + "Bit");

  function Provide({ children, ...p }: { children: React.ReactNode } & I) {
    return ProvideOldBit(
      context,
      p,
      async (p, b, c) => {
        b.emitLoading();

        try {
          if (c instanceof WorkerControl) {
            if (c.reload) await c.reload();
          }
          if (c instanceof StreamControl) {
            (c as any).stream = c.listen();
          }
        } catch (e) {
          b.emitError(e);
        }
      },

      (p, b) => {
        const c = ctrl(p as I, b);
        // clean up on unmount
        useEffect(() => () => c.dispose(), []);
        if (c instanceof WorkerControl) {
          c.reload = async () => {
            b.emitLoading();
            try {
              b.emit(await c.worker());
            } catch (e) {
              b.emitError(e);
            }
          };
        }
        return c;
      },
      children
    );
  }
  return { Provide: Provide, use: () => use<I, DT, C>(context) };
}
