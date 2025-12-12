// ToastContext.js
import { createContext, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {
  ColorSelection,
  Dialog,
  dictMap,
  ElbeChildren,
  getRootElement,
} from "../../..";
import { showAlertDialog } from "./dialogs/_alert";
import { showConfirmDialog } from "./dialogs/_confirm";

const _dialogs = {
  showConfirmDialog,
  showAlertDialog,
};

type AllDialogParams = {
  title: string;
  dismissible?: "none" | "button" | "barrier";
  maxWidth?: number;
  kind?: ColorSelection.KindsAlert;
};

export type DialogsConfig<I extends Dict<any>, O> = {
  onClose: (value: O | null) => O;
  children: (
    p: AllDialogParams & I,
    close: (t: O | null) => void
  ) => ElbeChildren;
};

type _DialogModel<I extends AllDialogParams & Dict<any>, O> = {
  id: string;
  params: AllDialogParams;
  config: DialogsConfig<I, O>;
  onClose: (value: O | null) => void;
};

type _DialogsType<T extends DialogsConfig<any, any>> = (
  p: AllDialogParams & (T extends DialogsConfig<infer I, any> ? I : never)
) => Promise<ReturnType<T["onClose"]>>;

export type DialogsCtrl = {
  [K in keyof typeof _dialogs]: _DialogsType<(typeof _dialogs)[K]>;
} & {
  showDialog: <I extends AllDialogParams & Dict<any>, O>(
    config: DialogsConfig<I, O>,
    params: I
  ) => Promise<O>;
};

const _DialogsContext = createContext<DialogsCtrl>(null as any);

export function useDialogs() {
  return useContext(_DialogsContext);
}

export function DialogsProvider(p: { children: ElbeChildren }) {
  const rootDOM = useMemo(() => getRootElement("elbe_dialog"), []);
  const [dialogs, setDialogs] = useState<_DialogModel<any, any>[]>([]);

  function showDialog<I extends AllDialogParams & Dict<any>, O>(
    dialog: DialogsConfig<I, O>,
    params: I
  ): Promise<O> {
    return new Promise<O>((resolve) => {
      const id = Date.now() + "";
      setDialogs([
        ...dialogs,
        {
          id,
          params,
          config: dialog,
          onClose: (p) => resolve(dialog.onClose(p)),
        },
      ]);
    });
  }

  function _closeDialog(id: string, value: any | null) {
    const dialog = dialogs.find((d) => d.id === id);
    setDialogs((d) => d.filter((dialog) => dialog.id !== id));
    if (dialog) dialog.onClose(value);
  }

  const provVal = useMemo(
    () =>
      dictMap(
        _dialogs,
        (config) => (p: any) => showDialog(config as any, p)
      ) as any,
    [dialogs]
  );

  return (
    <_DialogsContext.Provider value={{ ...provVal, showDialog }}>
      {p.children}
      {ReactDOM.createPortal(
        <div>
          {dialogs.map((dialog) => (
            <Dialog
              key={dialog.id}
              title={dialog.params.title}
              open={true}
              dismissible={dialog.params.dismissible ?? "button"}
              maxWidth={dialog.params.maxWidth ?? undefined}
              onClose={() => _closeDialog(dialog.id, null)}
              kind={dialog.params.kind}
            >
              {dialog.config.children(dialog.params, (value) =>
                _closeDialog(dialog.id, value)
              )}
            </Dialog>
          ))}
        </div>,
        rootDOM
      )}
    </_DialogsContext.Provider>
  );
}
