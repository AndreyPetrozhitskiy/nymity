export function formatDateToRussianMonthYear(isoDateString: string): string {
  const date: Date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  let formattedDate: string = date.toLocaleDateString("ru-RU", options);

  // Преобразование первой буквы в верхний регистр и объединение с остальной частью строки
  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return formattedDate;
}
export function isEmptyObject(obj: object): boolean {
  return !(Object.keys(obj).length === 0 && obj.constructor === Object);
}