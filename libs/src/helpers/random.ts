export const randomNumCode = (length: number) =>
  Math.floor(Math.random() * Math.pow(10, length)).toString();

export const randomCode = (length: number) =>
  Math.random()
    .toString(36)
    .slice(2, length + 2);
