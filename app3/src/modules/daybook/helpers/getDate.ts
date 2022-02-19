import { days, months } from "../utils/datesArray";

interface GetDate {
  day: number;
  month: string;
  yearDay: string;
}

export function getDate(dateString: string): GetDate {
  const date = new Date(dateString);

  return {
    day: date.getDay(),
    month: months[date.getMonth()],
    yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`,
  };
}
