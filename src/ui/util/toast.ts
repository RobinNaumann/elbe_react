/**
 * show a toast message at the bottom of the screen
 * @param message the message to show
 */

export function showToast(message: string) {
  // find the 'elbe' element
  const elbe = document.querySelector(".elbe");

  if (!elbe) {
    console.warn("could not show toast, no base element with '.elbe' found");
    return;
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add("inverse");
  toast.innerText = message;
  elbe.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
