<template>
  <div
    :class="containerClasses()"
    class="my-event"
    :id="`event-${event.title}`"
  >
    <div class="title q-calendar__ellipsis">
      <q-icon v-if="event.icon" :name="event.icon" class="q-mr-sm" />
      {{ event.title + (event.time ? " - " + event.time : "") }}
      <q-tooltip>
        <p class="text-bold">Evento: {{ event.title }}</p>
        <p v-if="event.time" class="q-pa-none q-ma-none text-bold">
          Início: {{ event.time }}
        </p>
        <p v-if="event.duration" class="text-bold">
          Duração estimada: {{ formattedDuration() }}
        </p>
        <p class="q-pb-none q-mb-none text-bold">Detalhes:</p>
        <p>{{ event.details }}</p>
      </q-tooltip>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: { type: Object, required: true },
});

const containerClasses = () => {
  return {
    [`text-white bg-${props.event.bgcolor}`]: true,
    "rounded-border": true,
  };
};

const formattedDuration = () => {
  let text = "";
  const hours = Math.trunc(props.event.duration / 60);
  const minutes = Math.trunc(props.event.duration % 60);

  if (hours > 0) text = text + `${hours} hora(s)`;
  if (hours > 0 && minutes > 0) text = text + " e ";
  if (minutes > 0) text = text + `${minutes} minuto(s)`;

  return text;
};
</script>
