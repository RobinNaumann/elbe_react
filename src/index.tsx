import * as Lucide from "lucide-react";
import "./elbe.css";

export * as wouter from "wouter";

// exports
export * from "./api/api_worker";
export * from "./api/error";
export * from "./api/errors";
export * from "./bit/bit";
export * from "./ui/util/confirm_dialog";
export * from "./ui/util/ctx_toolbar";
export * from "./ui/util/l10n/l10n";
export * from "./ui/util/toast";
export * from "./ui/util/types";
export * from "./ui/util/util";

export * from "./ui/components/base/box";
export * from "./ui/components/base/card";
export * from "./ui/components/base/padded";

export * from "./ui/components/routing/route";

export * from "./ui/components/button/button";
export * from "./ui/components/button/choose_button";
export * from "./ui/components/button/icon_button";
export * from "./ui/components/button/toggle_button";

export * from "./ui/components/layout/alignment";
export * from "./ui/components/layout/app_base";
export * from "./ui/components/layout/ctx_app_base";
export * from "./ui/components/layout/flex";
export * from "./ui/components/layout/header";
export * from "./ui/components/layout/page";
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
