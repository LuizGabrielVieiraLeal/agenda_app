<template>
  <q-header>
    <q-toolbar class="bg-white text-black q-py-sm shadow-1">
      <q-toolbar-title>
        <q-icon name="bi-calendar-event" /> Agenda Simples
      </q-toolbar-title>
      <q-btn stretch flat @click="$emit('today')"> Hoje </q-btn>
      <q-btn round flat size="xs" @click="$emit('prev')">
        <q-icon name="chevron_left" size="sm" />
      </q-btn>
      <q-btn round flat size="xs" class="q-mr-md" @click="$emit('next')">
        <q-icon name="chevron_right" size="sm" />
      </q-btn>
      <slot></slot>
      <q-btn round flat size="xs" class="q-ml-sm">
        <q-icon name="expand_more" size="sm" />
        <q-menu>
          <q-date
            v-model="date"
            :events="eventsDate"
            event-color="positive"
            minimal
        /></q-menu>
      </q-btn>
      <template v-for="n in 5" :key="n">
        <q-space />
      </template>
      <q-icon name="bi-github" size="1.1em" />
      <a href="#" class="text-black text-bold github-link q-ml-sm">v1.0.0</a>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, computed } from "vue";
import { calendarStore } from "../stores/calendar";

export default defineComponent({
  props: {
    selectedDate: { type: String, required: true },
  },
  setup(props) {
    const store = calendarStore();
    const events = store.getEvents;
    const date = props.selectedDate.replaceAll("-", "/");
    const eventsDate = computed(() =>
      events.map((event) => event.date.replaceAll("-", "/"))
    );

    return {
      date,
      eventsDate,
    };
  },
});
</script>
