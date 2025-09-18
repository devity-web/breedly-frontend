import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export const getAge = (bornAt: Date) => {
  const today = new Date();
  const diffInYears = differenceInYears(today, bornAt);
  const diffInMonths = differenceInMonths(today, bornAt);

  if (diffInYears < 1 && diffInMonths < 1) {
    return `${differenceInDays(today, bornAt)} days`;
  }

  if (diffInYears < 1) {
    return `${diffInMonths} months`;
  }

  return `${diffInYears} years`;
};
