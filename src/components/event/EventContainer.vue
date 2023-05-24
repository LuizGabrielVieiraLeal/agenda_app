<template>
  <div
    v-if="mode === 'month'"
    @click="$emit('setDate', event.date)"
    class="calendar-month-event"
    :class="containerClasses()"
  >
    <div class="title q-calendar__ellipsis">
      <q-icon v-if="event.icon" :name="event.icon" class="q-mr-sm" />
      {{ event.title + (event.time ? " - " + event.time : "") }}
      <event-tooltip :event="event" />
    </div>
  </div>
  <div
    v-else
    @click="toogleCustomDialog"
    class="calendar-day-event text-white full-width"
    :class="`bg-${event.color}`"
    :style="badgeStyles(event, timeStartPos, timeDurationHeight)"
  >
    <div class="title q-calendar__ellipsis">
      <q-icon v-if="event.icon" :name="event.icon" class="q-mr-sm" />
      {{ event.title }}
      <event-tooltip :event="event" />
    </div>
    <custom-dialog
      ref="customDialog"
      prev-icon="edit"
      :header-text="event.title"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <template v-slot:body>
        <event-form :event="event" @remove="onRemove" />
      </template>
    </custom-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { calendarStore } from "src/stores/calendar";
import calendarService from "src/services/calendar";
import CustomDialog from "src/components/shared/CustomDialog.vue";
import EventForm from "src/components/event/forms/EventForm.vue";
import EventTooltip from "src/components/event/EventTooltip.vue";
import { Notify } from "quasar";

const props = defineProps({
  event: { type: Object, required: true },
  mode: { type: String, required: true },
  timeStartPos: { default: null },
  timeDurationHeight: { default: null },
});

const cStore = calendarStore();
const customDialog = ref(null);

const toogleCustomDialog = () => {
  customDialog.value?.toogleDialog();
};

const onRemove = async () => {
  toogleCustomDialog();

  try {
    const { destroy } = calendarService();
    const { event, message } = await destroy(props.event.id);
    cStore.removeEvent(event);
    Notify.create({
      message: message,
      color: "positive",
    });
  } catch (ex) {
    Notify.create({
      message: ex.message,
      color: "negative",
    });
  }
};

const containerClasses = () => {
  return {
    [`text-white bg-${props.event.color}`]: true,
    "rounded-border": true,
  };
};

const badgeStyles = (
  event,
  timeStartPos = undefined,
  timeDurationHeight = undefined
) => {
  const s = {};
  if (timeStartPos && timeDurationHeight) {
    s.top = timeStartPos(event.time) + "px";
    s.height = timeDurationHeight(event.duration || 30) + "px";
  }
  s["align-items"] = "flex-start";
  return s;
};
</script>
