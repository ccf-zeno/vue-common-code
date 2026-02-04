import dayjs from 'dayjs';

export type formatDateType = 'dateTime' | 'date' | string;

export function formatDate(
  _date: string | number,
  _format: 'dateTime' | 'date' | string = 'dateTime',
) {
  let format: string;

  if (_format === 'dateTime') {
    format = 'YYYY-MM-DD HH:mm:ss';
  } else if (_format === 'date') {
    format = 'YYYY-MM-DD';
  } else {
    format = _format;
  }

  let date = _date;

  if (typeof date === 'number' && String(date).length == 10) {
    date = date * 1000;
  }

  return dayjs(date).format(format);
}
