import { defineStore } from "pinia";
import axios from "axios";
import {
  addToDate,
  parseTimestamp,
} from "@quasar/quasar-ui-qcalendar/src/index.js";

function _removeNullEntries(obj) {
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
          event = _removeNullEntries(event);
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
    async loadEvents() {
      await axios
        .get(`${process.env.baseURL}/events`)
        .then((res) => (this._events = res.data.events))
        .catch((ex) => {
          throw ex;
        });
    },
    async addEvent(data) {
      await axios
        .post(`${process.env.baseURL}/events`, { event: data })
        .then((res) => this._events.push(_removeNullEntries(res.data.event)))
        .catch((ex) => {
          throw ex;
        });
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
