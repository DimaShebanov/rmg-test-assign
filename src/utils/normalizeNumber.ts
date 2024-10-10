export const normalizeNumber = (value: number) =>
  !isNaN(value) ? Number(value.toFixed(2)) : value;
