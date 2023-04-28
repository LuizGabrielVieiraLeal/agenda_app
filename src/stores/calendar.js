import { defineStore } from "pinia";
import {
  addToDate,
  parseTimestamp,
} from "@quasar/quasar-ui-qcalendar/src/index.js";

function _removeNullEntries(obj) {
  // removendo chaves nulas do objeto por causa do bug do QCalendar
  for (const [key, value] of Object.entries(obj))
    if (value === null) delete obj[key];
  return obj;
}

export const calendarStore = defineStore("calendar", {
  state: () => ({
    _events: [],
  }),
  getters: {
    getEvents: (state) => {
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
    async addEvent(data) {
      // adicionando id para terminar o CRUD
      data["id"] = this._events.length + 1;
      this._events.push(_removeNullEntries(data));
    },
    async updateEvent(event, data) {
      this._events[this._events.findIndex((e) => e.id === event.id)] = {
        ..._removeNullEntries(data),
      };
    },
    async removeEvent(id) {
      this._events.splice(
        this._events.findIndex((e) => e.id === id),
        1
      );
    },
  },
});
