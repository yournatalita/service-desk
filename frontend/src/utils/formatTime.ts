import { DateTime } from 'luxon';

const YESTERDAY = 'yesterday';

export const formatRelativeDate = (date: string): string => {
  DateTime.local();
  const m = DateTime.fromISO(date);
  const dt = DateTime.local();
  const diff = dt.diff(m, ['years', 'months', 'days', 'hours', 'minutes']).toObject();

  if (diff.years) {
    return m.toFormat(`DD.MM.YYYY, HH:mm:ss`);
  }

  if (
    !diff.years &&
    !diff.months &&
    !diff.days &&
    (dt.day === m.day || (diff.hours && diff.hours < 12))
  ) {
    return diff.hours ? `${diff.hours} hours ago` : `${diff.minutes} minutes ago`;
  }

  if (
    !diff.years &&
    !diff.months &&
    ((diff.days === 1 && !diff.hours && !diff.minutes) || !diff.days)
  ) {
    return `${YESTERDAY}`;
  }

  if (!diff.years && !diff.months && diff.days && diff.days <= 6) {
    if (diff.hours) {
      return `${diff.days + 1} days ago`;
    }
    return `${diff.days} days ago`;
  }

  return m.toFormat(`dd MMMM`);
};
