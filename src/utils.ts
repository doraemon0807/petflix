export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}

export function countPage(
  curr: number,
  total: number,
  idx: number,
  pageOffset: number
) {
  return curr < 4 || total <= 5
    ? idx + 1
    : curr > total - 2
    ? total - pageOffset + idx + 1
    : idx + curr - 2;
}
