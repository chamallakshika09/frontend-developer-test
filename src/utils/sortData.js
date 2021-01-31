import { ASCENDING } from './types';

export const sortData = (data, order) => {
  if (order === ASCENDING) {
    return [...data].sort((a, b) => a.timestamp - b.timestamp);
  }
  return [...data].sort((a, b) => b.timestamp - a.timestamp);
};
