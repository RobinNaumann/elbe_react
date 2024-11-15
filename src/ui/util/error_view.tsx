import { Icons } from "../..";

export function _ElbeErr(msg: string) {
  return (
    <div
      class="row text-s gap-half"
      style="background: #ee0044; color: white; border-radius: 4px; text-align: left; padding: .5rem"
    >
      <Icons.CircleX />
      <div class="column gap-none cross-stretch">
        <b class="text-s">elbe error</b>
        <span style="margin-top: -.125rem">{msg}</span>
      </div>
    </div>
  );
}
