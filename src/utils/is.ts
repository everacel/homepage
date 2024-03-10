export function isInput(dom: HTMLElement): dom is HTMLInputElement {
  return dom.tagName === "INPUT";
}

export function isTextarea(dom: HTMLElement): dom is HTMLTextAreaElement {
  return dom.tagName === "TEXTAREA";
}
