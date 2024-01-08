export function secondsToText(seconds) {
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  let highestUnit = '';
  for (const [unit, unitSeconds] of units) {
    if (seconds >= unitSeconds) {
      const number = Math.floor(seconds / unitSeconds);
      highestUnit = `${number} ${number === 1 ? unit : unit + 's'}`;
      break;
    }
  }

  return highestUnit;
}