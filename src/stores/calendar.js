import { defineStore } from "pinia";
import {
  addToDate,
  parseTimestamp,
} from "@quasar/quasar-ui-qcalendar/src/index.js";

export const calendarStore = defineStore("calendar", {
  state: () => ({
    _allowedColors: [
      "blue",
      "indigo",
      "green",
      "cyan",
      "red",
      "pink",
      "purple",
      "yellow",
      "orange",
      "brown",
      "grey",
      "dark",
    ],
    _allowedIcons: [
      "favorite",
      "auto_stories",
      "grade",
      "flight_takeoff",
      "fitness_center",
      "textsms",
      "work",
      "bookmark",
      "warning",
      "light_mode",
      "celebration",
      "cake",
      "pets",
      "style",
      "savings",
      "room",
      "pending",
      "record_voice_over",
      "sports_esports",
      "restaurant",
      "diversity_1",
      "fastfood",
      "airport_shuttle",
      "sports_bar",
    ],
    _events: [],
  }),
  getters: {
    getAllowedColors: (state) => state._allowedColors,
    getAllowedIcons: (state) => state._allowedIcons,
    getEvents: (state) => state._events,
    getMonthEvents: (state) => {
      const map = {};
      if (state._events.length > 0) {
        state._events.forEach((event) => {
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
    },
  },
  actions: {
    async addEvent(event) {
      // removendo chaves nulas do objeto por causa do bug do QCalendar
      for (const [key, value] of Object.entries(event))
        if (value === null) delete event[key];
      this._events.push(event);
    },
  },
});
