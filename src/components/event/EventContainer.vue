<template>
  <div
    v-if="mode === 'month'"
    :class="containerClasses()"
    class="calendar-month-event"
    :id="`event-${event.title}`"
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
    class="calendar-day-event"
    :class="`text-white bg-${event.bgcolor} full-width`"
    :style="badgeStyles(event, timeStartPos, timeDurationHeight)"
  >
    <div class="title q-calendar__ellipsis">
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
        <event-form :event="event" />
      </template>
    </custom-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomDialog from "../shared/CustomDialog.vue";
import EventForm from "./EventForm.vue";
import EventTooltip from "./EventTooltip.vue";

const props = defineProps({
  event: { type: Object, required: true },
  mode: { type: String, required: true },
  timeStartPos: { default: null },
  timeDurationHeight: { default: null },
});

const customDialog = ref(null);

const toogleCustomDialog = () => {
  customDialog.value?.toogleDialog();
};

const containerClasses = () => {
  return {
    [`text-white bg-${props.event.bgcolor}`]: true,
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
    s.height = timeDurationHeight(event.duration) + "px";
  }
  s["align-items"] = "flex-start";
  return s;
};
</script>
