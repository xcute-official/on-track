export const getIso = ({
  year = new Date().getUTCFullYear(),
  month = new Date().getUTCMonth(),
  date = new Date().getUTCDate(),
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0
})=>{
  return new Date(Date.UTC(year, month, date, hour, minute, second, millisecond)).toISOString();
}
export const getUtcDate = ({
  year, month, date,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0
}: {
  year?: number;
  month?: number;
  date?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
})=>{
  const now = new Date();
  return new Date(Date.UTC(year ?? now.getUTCFullYear(), month ?? now.getMonth(), date ?? now.getUTCDate(), hour, minute, second, millisecond));
}
export const pickFields = <T extends object, K extends keyof T>(obj: T, keys: K[])=>{
  return keys.reduce((acc, key)=>{
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}
