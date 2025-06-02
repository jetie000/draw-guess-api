export const randomNumCode = (length: number) =>
  Math.floor(Math.random() * Math.pow(10, length)).toString();

export const randomCode = (length: number) =>
  Math.random()
    .toString(36)
    .slice(2, length + 2);

export const uniqueRandomFromArray = (arr: number[], n = 1) => {
  const resultSet = new Set<number>();
  while (resultSet.size < n) {
    resultSet.add(arr[Math.floor(Math.random() * arr.length)]);
  }
  return Array.from(resultSet);
};
