/**
 * show a toast message at the bottom of the screen
 * @param message the message to show
 */

export function showToast(message: string) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add("inverse");
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
