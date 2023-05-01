<template>
  <q-tooltip>
    <p class="text-bold q-pa-none q-ma-none">Evento: {{ event.title }}</p>
    <p class="text-bold q-pa-none q-ma-none">Início: {{ event.time }}</p>
    <p v-if="event.duration" class="text-bold q-pa-none q-ma-none">
      Duração estimada: {{ formattedDuration() }}
    </p>
    <p v-if="event.details" class="q-pb-none q-mb-none text-bold">Detalhes:</p>
    <p v-if="event.details" class="q-pa-none q-ma-none">{{ event.details }}</p>
  </q-tooltip>
</template>

<script setup>
const props = defineProps({
  event: { type: Object, required: true },
});

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
