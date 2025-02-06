export const toNumber = (initValue: string | number) => {
  const typeMap = {
    string: (value: any) => {
      return Number(value);
    },
    number: (value: any) => {
      return value;
    },
  };
  const type = typeof initValue as 'string' | 'number';
  if (initValue && typeMap?.[type]) {
    return typeMap?.[type](initValue);
  }
  return 0;
}
