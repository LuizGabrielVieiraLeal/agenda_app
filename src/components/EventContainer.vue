<template>
  <div :class="containerClasses(event, 'day')" class="my-event">
    <div class="title q-calendar__ellipsis">
      {{ event.title + (event.time ? " - " + event.time : "") }}
      <q-tooltip>{{ event.details }}</q-tooltip>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EventContainer",
  props: {
    event: { required: true },
  },
  setup() {
    function containerClasses(event, type) {
      return {
        [`text-white bg-${event.bgcolor}`]: true,
        "rounded-border": true,
      };
    }

    return { containerClasses };
  },
});
</script>
