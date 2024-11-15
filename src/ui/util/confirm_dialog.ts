/**
 * show a simple confirm dialog
 * @param param0 the title and message of the dialog
 * @returns a promise that resolves to true if the user clicks "yes" or "okay" and false if the user clicks "no"
 */
export function showConfirmDialog({
  title,
  message,
  okay = false,
}: {
  message: string;
  title: string;
  okay?: boolean;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    dialog.innerHTML = `<dialog open>
        <div
          class="elbe card primary"
          style="max-width: 30rem; min-width: 10rem"
        >
          <div class="row cross-center">
            <div class="flex-1 body-l b">
            ${title}
            </div>
            <button class="plain round" style="width: 3rem" onclick="conf_resolve(false)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x "><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
         <div style="margin-top: 1rem; margin-bottom: 1rem">
          ${message}
          </div>
          <div class="row main-end gap">
  
        ${
          okay
            ? '<button class="accent" style="padding-left:1rem; padding-right:1rem" onclick="conf_resolve(true)">okay</button>'
            : '<button class="minor" style="padding-left:1rem; padding-right:1rem" onclick="conf_resolve(false)">no</button>' +
              '<button class="accent" style="padding-left:1rem; padding-right:1rem" onclick="conf_resolve(true)">yes</button>'
        }
      </div>
  
        </div>
      </dialog>
    `;
    document.body.appendChild(dialog);
    (window as any)["conf_resolve"] = (v: any) => {
      document.body.removeChild(dialog);
      resolve(v);
    };
  });
}
