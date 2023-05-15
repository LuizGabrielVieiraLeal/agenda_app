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

export { mapEvents, removeNullEntries };
