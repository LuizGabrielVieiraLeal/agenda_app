<template>
  <q-img
    src="../../assets/calendar.png"
    :ratio="1"
    no-spinner
    style="height: 40px; max-width: 40px"
  />
  <span class="icon-label text-bold text-primary">{{ day }}</span>
</template>

<script setup>
import { today } from "@quasar/quasar-ui-qcalendar/src/index.js";

const day = today().split("-")[2];
</script>
