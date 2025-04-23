export interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

export interface getWeekDaysParams {
  short?: boolean
}
