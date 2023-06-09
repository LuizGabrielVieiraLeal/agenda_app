<template>
  <q-page>
    <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
      :selected-date="selectedDate"
    />
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-lg-9 q-pa-sm">
        <q-calendar-month
          ref="calendarMonthRef"
          :locale="this.$q.lang.isoName"
          v-model="selectedDate"
          animated
          focusable
          hoverable
          use-navigation
          :min-weeks="6"
          class="full-height"
        >
          <template #day="{ scope: { timestamp } }">
            <template v-for="event in events[timestamp.date]" :key="event.id">
              <event-container
                :event="event"
                mode="month"
                @set-date="onSetDate"
              />
            </template>
          </template>
        </q-calendar-month>
      </div>
      <div class="col-xs-12 col-lg-3 q-pa-sm">
        <q-calendar-day
          :locale="this.$q.lang.isoName"
          v-model="selectedDate"
          view="day"
          animated
          hour24-format
          class="full-height"
        >
          <template #head-day-event="{ scope: { timestamp } }">
            <div class="calendar-badge-header-container">
              <template v-for="event in events[timestamp.date]" :key="event.id">
                <q-badge :class="`calendar-badge-header bg-${event.color}`">
                  <event-tooltip :event="event" />
                </q-badge>
              </template>
            </div>
          </template>

          <template
            #day-body="{
              scope: { timestamp, timeStartPos, timeDurationHeight },
            }"
          >
            <template v-for="event in events[timestamp.date]" :key="event.id">
              <event-container
                :event="event"
                mode="day"
                :time-start-pos="timeStartPos"
                :time-duration-height="timeDurationHeight"
              />
            </template>
          </template>
        </q-calendar-day>
      </div>
    </div>
    <custom-dialog
      ref="customDialog"
      prev-icon="add_circle_outline"
      header-text="Novo Evento"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <template v-slot:body>
        <event-form />
      </template>
    </custom-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        class="text-bold"
        @click="toogleDialog"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass";
import {
  QCalendarDay,
  QCalendarMonth,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import NavigationBar from "src/components/navigation/NavigationBar.vue";
import EventContainer from "src/components/event/EventContainer.vue";
import EventTooltip from "src/components/event/EventTooltip.vue";
import CustomDialog from "src/components/shared/CustomDialog.vue";
import EventForm from "src/components/event/forms/EventForm.vue";
import { userStore } from "src/stores/user";
import userService from "src/services/user";
import { calendarStore } from "src/stores/calendar";
import calendarService from "src/services/calendar";

const cStore = calendarStore();
const calendarMonthRef = ref(null);
const customDialog = ref(null);
const selectedDate = ref(today());
const events = computed(() => cStore.events);

onBeforeMount(async () => {
  try {
    const uStore = userStore();
    const { loadCurrentUser } = userService();
    const { currentUser, token } = loadCurrentUser();
    uStore.setCurrentUser(currentUser);
    uStore.setToken(token);

    const { list } = calendarService();
    const { events } = await list();
    cStore.setEvents(events);
  } catch (ex) {
    console.log(ex.message);
  }
});

const onToday = () => {
  calendarMonthRef.value.moveToToday();
};

const onPrev = () => {
  calendarMonthRef.value.prev();
};

const onNext = () => {
  calendarMonthRef.value.next();
};

const onSetDate = (date) => {
  selectedDate.value = date;
};

const toogleDialog = () => {
  customDialog.value?.toogleDialog();
};
</script>
