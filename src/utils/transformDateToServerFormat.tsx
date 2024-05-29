import moment from "moment";

export const transformDateToServerFormat = (value: Date) => {
  // example value Wed May 01 2024 00:00:00 GMT+0300 (Москва, стандартное время)
  return moment(value).format("YYYY-MM-DD[T]HH:mm:ssZ").replace("+", "%2b");
};
