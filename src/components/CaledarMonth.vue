<template>
  <div>
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext">
      <span class="navigation-label">{{ navigationLabel }}</span>
    </navigation-bar>
    <div class="row q-pa-sm">
      <div class="col-xs-12">
        <q-calendar-month
          ref="calendar"
          :locale="locale"
          v-model="selectedDate"
          bordered
          animated
          focusable
          hoverable
          no-active-date
          use-navigation
          :day-min-height="140"
          :day-height="0"
          :min-weeks="6"
          @change="onChange"
          @click-date="onClickDate"
          @click-day="onClickDay"
        >
          <template #day="{ scope: { timestamp } }">
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <event-container :event="event" />
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
    <q-dialog
      v-model="dialog"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card class="card-dialog-medium">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            <q-icon name="add_circle_outline" class="q-mr-sm q-mb-xs" />Novo
            evento
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <EventForm @onEventTriggered="eventTriggered" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="bi-plus-lg"
        color="white"
        class="text-black"
        @click="dialog = true"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import {
  QCalendarMonth,
  today,
  addToDate,
  parseTimestamp,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import NavigationBar from "./NavigationBar.vue";
import EventContainer from "./EventContainer.vue";
import EventForm from "./EventForm.vue";
import { mapState } from "pinia";
import { calendarStore } from "../stores/calendar";
import { Notify } from "quasar";

export default defineComponent({
  name: "CalendarMonth",
  components: {
    QCalendarMonth,
    NavigationBar,
    EventContainer,
    EventForm,
  },
  data: () => ({
    selectedDate: today(),
    navigationLabel: "",
    dialog: false,
  }),
  computed: {
    ...mapState(calendarStore, {
      events: (store) => store.getEvents,
      locale: (store) => store.getLocale,
    }),

    eventsMap() {
      const map = {};
      if (this.events.length > 0) {
        this.events.forEach((event) => {
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
  methods: {
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    onChange() {
      const formatter = new Intl.DateTimeFormat("pt-BR", { month: "long" });
      const [year, month, day] = this.selectedDate.split("-");
      const label = `${formatter.format(
        new Date(year, month - 1, day)
      )} de ${year}`;
      this.navigationLabel = label.charAt(0).toUpperCase() + label.slice(1);
    },
    onClickDate(data) {
      console.log("onClickDate", data);
    },
    onClickDay(data) {
      console.log("onClickDay", data);
    },
    eventTriggered(response) {
      this.dialog = false;
      Notify.create({
        message: response.message,
        color: response.color,
      });
    },
  },
});
</script>
