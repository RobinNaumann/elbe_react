/**
 * @deprecated use the new `const {showToast} = useToast()` hook based model instead
 * @param message the message you want to display
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
