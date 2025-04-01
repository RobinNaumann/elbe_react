import * as Lucide from "lucide-react";
import "./elbe.css";

// exports
export * from "./bit/bit";
export * from "./bit/ctrl_bit";
export * from "./service/s_api";
export * from "./ui/util/confirm_dialog";
export * from "./ui/util/toast";
export * from "./ui/util/util";

export * from "./ui/components/base/box";
export * from "./ui/components/base/card";
export * from "./ui/components/base/padded";

export * from "./ui/components/button/button";
export * from "./ui/components/button/choose_button";
export * from "./ui/components/button/icon_button";
export * from "./ui/components/button/toggle_button";

export * from "./ui/components/layout/alignment";
export * from "./ui/components/layout/flex";
export * from "./ui/components/layout/header";
export * from "./ui/components/layout/scaffold";
export * from "./ui/components/layout/scroll";
export * from "./ui/components/layout/spaced";

export * from "./ui/components/input/checkbox";
export * from "./ui/components/input/range";
export * from "./ui/components/input/select";
export * from "./ui/components/input/switch";
export * from "./ui/components/input/text/input_field";

export * from "./ui/components/badge";
export * from "./ui/components/banner";
export * from "./ui/components/dialog";
export * from "./ui/components/error_view";
export * from "./ui/components/footer";
export * from "./ui/components/link";
export * from "./ui/components/progress_bar";
export * from "./ui/components/spinner";
export * from "./ui/components/text";

export * from "./ui/components/dev/todo";

export * from "./ui/theme/seed";
export * from "./ui/theme/theme";
export * from "./ui/theme/theme_context";

function None({}) {
  return <div style={{ width: "1.5rem", height: "1.5rem" }} />;
}

export const Icons = { ...Lucide.icons, None };
