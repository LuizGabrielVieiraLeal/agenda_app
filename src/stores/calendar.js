import { defineStore } from "pinia";
import { mapEvents, removeNullEntries } from "../utils/calendar-helper";

export const calendarStore = defineStore("calendar", {
  state: () => ({
    _events: [],
  }),
  getters: {
    events: (state) => {
      return mapEvents(state._events);
    },
  },
  actions: {
    setEvents(events) {
      this._events = events;
    },
    addEvent(event) {
      this._events.push(removeNullEntries(event));
    },
    updateEvent(event) {
      this._events[this._events.findIndex((e) => e.id === event.id)] = {
        ...removeNullEntries(event),
      };
    },
    removeEvent(event) {
      this._events.splice(
        this._events.findIndex((e) => e.id === event.id),
        1
      );
    },
  },
});
