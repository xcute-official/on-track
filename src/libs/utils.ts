import { MONTH_NAMES } from "@/constants";

type TUtcInput = {
  year?: number;
  month?: number;
  date?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}
export const getReadableByIso = (iso: string)=>{
  const dt = new Date(iso);
  return `${dt.getDate()} ${MONTH_NAMES[dt.getMonth()]}`;
}
export const getUtcDate = ({
  year, month, date,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0
}: TUtcInput)=>{
  const now = new Date();
  return new Date(Date.UTC(
    year ?? now.getUTCFullYear(),
    month ?? now.getUTCMonth(), 
    date ?? now.getUTCDate(), 
    hour, minute, second, millisecond));
}
export const getIso = (input: TUtcInput = {})=>{
  return getUtcDate(input).toISOString();
}
export const pickFields = <T extends object, K extends keyof T>(obj: T, keys: K[])=>{
  return keys.reduce((acc, key)=>{
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}
