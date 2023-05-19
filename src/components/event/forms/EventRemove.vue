<template>
  <div class="row">
    <p>
      Você está prestes a remover o evento
      <strong> {{ event.title }} </strong> permanentemente. Tem certeza que
      deseja prosseguir com a operação?
    </p>
  </div>
  <div class="row">
    <div class="col-6">
      <q-btn
        flat
        color="primary"
        label="Cancelar"
        icon="close"
        class="full-width"
        @click="onAbort"
      />
    </div>
    <div class="col-6">
      <q-btn
        flat
        color="negative"
        label="Remover"
        icon="delete"
        class="full-width"
        @click="onRemove"
      />
    </div>
  </div>
</template>

<script setup>
import { calendarStore } from "src/stores/calendar";
import calendarService from "src/services/calendar";
import { Notify } from "quasar";

const props = defineProps({
  event: { type: Object, required: true },
});

const emit = defineEmits(["abort"]);
const cStore = calendarStore();

const onAbort = () => emit("abort");

const onRemove = async () => {
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
</script>
