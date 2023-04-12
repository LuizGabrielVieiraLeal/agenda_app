<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="bi-plus-lg"
        color="white"
        class="text-black"
        @click="dialog = true"
      />
    </q-page-sticky>
    <q-dialog
      v-model="dialog"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card class="card-dialog-medium">
        <q-card-section>
          <div class="text-h6">
            <q-icon name="add_circle_outline" class="q-mr-sm q-mb-xs" />Novo
            evento
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <EventForm @onEventTriggered="eventTriggered" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";
import EventForm from "./EventForm.vue";

export default defineComponent({
  components: {
    EventForm,
  },
  setup() {
    const $q = useQuasar();
    const dialog = ref(false);

    const eventTriggered = (response) => {
      dialog.value = false;
      $q.notify({
        message: response.message,
        color: response.color,
      });
    };

    return {
      dialog,
      eventTriggered,
    };
  },
});
</script>
