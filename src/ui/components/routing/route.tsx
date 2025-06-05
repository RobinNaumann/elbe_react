import { VNode } from "preact";
import { ElbeChildren, IconChild, wouter } from "../../..";

export type MenuItem = {
  path: string;
  label: string;
  icon: IconChild;
  bottom?: boolean;
  disabled?: boolean;
};

type _MenuRouteProps = MenuItem & {
  children?: ElbeChildren;
};

// either a normal, or a menu route
export type ElbeRoute = VNode<{ path: string }> | VNode<_MenuRouteProps>;

/**
 * a route that also renders a menu item in the <AppBase> component.
 * place it as a child of <AppBase> to have it rendered in the menu.
 *
 * it automatically creates a nestable route
 *
 * ⚠️ a route with path "/" can't be used for nesting
 */
export function MenuRoute(p: _MenuRouteProps) {
  return (
    <Route nest path={p.path}>
      {p.children}
    </Route>
  );
}

/**
 * a helper function to create a <wouter.Route> with a path.
 */
export const Route = wouter.Route;

export function isMenuRoute(r: ElbeRoute): r is VNode<_MenuRouteProps> {
  return "path" in r.props && "label" in r.props && "icon" in r.props;
}
