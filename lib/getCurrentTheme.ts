export const colorScheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
