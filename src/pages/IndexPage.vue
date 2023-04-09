<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12">
        <CalendarMonth />
      </div>
    </div>
    <EventDialog />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CalendarMonth from "../components/CaledarMonth.vue";
import EventDialog from "../components/EventDialog.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CalendarMonth,
    EventDialog,
  },
});
</script>
