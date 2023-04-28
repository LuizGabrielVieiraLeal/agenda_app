<template>
  <q-header>
    <q-toolbar class="bg-white text-black shadow-1">
      <q-toolbar-title class="text-bold">
        <q-icon name="bi-calendar-event" />
      </q-toolbar-title>
      <q-btn stretch flat @click="$emit('today')"> Hoje </q-btn>
      <q-btn round flat size="xs" @click="$emit('prev')">
        <q-icon name="chevron_left" size="sm" />
      </q-btn>
      <q-btn round flat size="xs" class="q-mr-md" @click="$emit('next')">
        <q-icon name="chevron_right" size="sm" />
      </q-btn>
      <span class="navigation-label">{{ setLabel() }}</span>
    </q-toolbar>
  </q-header>
</template>

<script setup>
const props = defineProps({
  selectedDate: { type: String, required: true },
});

const setLabel = () => {
  const formatter = new Intl.DateTimeFormat("pt-BR", { month: "long" });
  const [year, month, day] = props.selectedDate.split("-");
  const label = `${formatter.format(
    new Date(year, month - 1, day)
  )} de ${year}`;
  return label.charAt(0).toUpperCase() + label.slice(1);
};
</script>
