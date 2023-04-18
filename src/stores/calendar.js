import { defineStore } from "pinia";

export const calendarStore = defineStore("calendar", {
  state: () => ({
    _locale: "pt-BR",
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
    getLocale: (state) => state._locale,
    getAllowedColors: (state) => state._allowedColors,
    getAllowedIcons: (state) => state._allowedIcons,
    getEvents: (state) => state._events,
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
