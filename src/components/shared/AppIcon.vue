<template>
  <div>
    <q-icon size="md" color="primary" name="calendar_today" />
    <span class="icon-label text-bold text-primary">{{ day }}</span>
    <span class="text-bold text-label text-primary">Agenda Simples</span>
  </div>
</template>

<script setup>
import { today } from "@quasar/quasar-ui-qcalendar/src/index.js";

const day = today().split("-")[2];
</script>
