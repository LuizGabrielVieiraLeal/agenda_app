const mapEvents = (events) => {
  const map = {};
  if (events.length > 0) {
    events.forEach((event) => {
      event = removeNullEntries(event);
      (map[event.date] = map[event.date] || []).push(event);
      if (event.days !== undefined) {
        let timestamp = parseTimestamp(event.date);
        let days = event.days;
        do {
          timestamp = addToDate(timestamp, { day: 1 });
          if (!map[timestamp.date]) {
            map[timestamp.date] = [];
          }
          map[timestamp.date].push(event);
        } while (--days > 1);
      }
    });
  }
  return map;
};

const removeNullEntries = (obj) => {
  for (const [key, value] of Object.entries(obj))
    if (value === null) delete obj[key];
  return obj;
};

const setDuration = (date, startTime, endTime) => {
  if (startTime && endTime) {
    const sDate = new Date(`${date}T${startTime}:00`);
    const eDate = new Date(`${date}T${endTime}:00`);
    const difMs = eDate.getTime() - sDate.getTime();
    return difMs / 60000;
  } else return null;
};

const setTimeFromDuration = (date, time, duration) => {
  let d = new Date(`${date}T${time}:00`);
  d = new Date(d.setMinutes(d.getMinutes() + duration));
  const t = `${d.getHours()}:${d.getMinutes()}`;
  return t;
};

export { mapEvents, removeNullEntries, setDuration, setTimeFromDuration };
