export const UseDataFetcher = () => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const dayName = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const monthName = monthsOfYear[date.getMonth()];
    const year = String(date.getFullYear());

    return `${dayName}, ${day} ${monthName} ${year} | ${hours}:${minutes}`;
  };

  return { formatTimestamp };
};
