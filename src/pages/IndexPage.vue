<template>
  <q-page>
    <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
      :selected-date="selectedDate"
    />
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-lg-3">
        <q-calendar-day
          ref="calendarDay"
          :locale="this.$q.lang.isoName"
          v-model="selectedDate"
          view="day"
          :interval-height="33.75"
          bordered
          animated
          no-active-date
          hour24-format
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        >
          <template #day-container="{ scope: { days } }">
            <template v-if="hasDate(days)">
              <div class="day-view-current-time-indicator" :style="style" />
              <div class="day-view-current-time-line" :style="style" />
            </template>
          </template>
        </q-calendar-day>
      </div>
      <div class="col-xs-12 col-lg-9">
        <q-calendar-month
          ref="calendarMonth"
          :locale="this.$q.lang.isoName"
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
          @click-date="onClickDate"
          @click-day="onClickDay"
        >
          <template #day="{ scope: { timestamp } }">
            <template v-for="event in events[timestamp.date]" :key="event.id">
              <event-container :event="event" />
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
    <custom-dialog
      ref="addEventDialog"
      prev-icon="add_circle_outline"
      header-text="Novo Evento"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <template v-slot:body>
        <event-form onEventTriggered="eventTriggered" />
      </template>
    </custom-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="bi-plus-lg"
        color="white"
        class="text-black text-bold"
        @click="this.$refs.addEventDialog?.toogleDialog"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass";
import {
  QCalendarDay,
  QCalendarMonth,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import NavigationBar from "../components/navigation/NavigationBar.vue";
import EventContainer from "../components/event/EventContainer.vue";
import CustomDialog from "../components/shared/CustomDialog.vue";
import EventForm from "../components/event/EventForm.vue";
import { mapState } from "pinia";
import { calendarStore } from "../stores/calendar";

export default defineComponent({
  name: "IndexPage",
  components: {
    QCalendarDay,
    QCalendarMonth,
    NavigationBar,
    EventContainer,
    CustomDialog,
    EventForm,
  },
  data: () => ({
    selectedDate: today(),
    currentDate: null,
    currentTime: null,
  }),
  computed: {
    ...mapState(calendarStore, {
      events: (store) => store.getMonthEvents,
      locale: (store) => store.getLocale,
    }),
  },
  methods: {
    hasDate(days) {
      return this.currentDate
        ? days.find((day) => day.date === this.currentDate)
        : false;
    },
    onToday() {
      this.$refs.calendarMonth.moveToToday();
    },
    onPrev() {
      this.$refs.calendarMonth.prev();
    },
    onNext() {
      this.$refs.calendarMonth.next();
    },
    onClickDate(data) {
      console.log("onClickDate", data);
    },
    onClickDay(data) {
      console.log("onClickDay", data);
    },
  },
});
</script>
