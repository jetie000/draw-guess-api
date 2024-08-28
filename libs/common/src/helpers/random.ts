export const randomCode = (length: number) =>
  Math.floor(Math.random() * Math.pow(10, length)).toString();
