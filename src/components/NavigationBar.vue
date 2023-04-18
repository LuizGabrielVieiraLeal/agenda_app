<template>
  <q-header>
    <q-toolbar class="bg-white text-black q-py-sm shadow-1">
      <q-toolbar-title class="text-bold">
        <q-icon name="bi-calendar-event" />
        Agenda
      </q-toolbar-title>
      <q-btn stretch flat @click="$emit('today')"> Hoje </q-btn>
      <q-btn round flat size="xs" @click="$emit('prev')">
        <q-icon name="chevron_left" size="sm" />
      </q-btn>
      <q-btn round flat size="xs" class="q-mr-md" @click="$emit('next')">
        <q-icon name="chevron_right" size="sm" />
      </q-btn>
      <span class="navigation-label">{{ setLabel() }}</span>
      <template v-for="n in 5" :key="n">
        <q-space />
      </template>
      <q-icon name="bi-github" size="1.1em" />
      <a href="#" class="text-black text-bold github-link q-ml-sm">v1.0.0</a>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationBar",
  props: {
    selectedDate: { type: String, required: true },
  },
  methods: {
    setLabel() {
      const formatter = new Intl.DateTimeFormat("pt-BR", { month: "long" });
      const [year, month, day] = this.selectedDate.split("-");
      const label = `${formatter.format(
        new Date(year, month - 1, day)
      )} de ${year}`;
      return label.charAt(0).toUpperCase() + label.slice(1);
    },
  },
});
</script>
