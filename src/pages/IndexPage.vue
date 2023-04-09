<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12">
        <CalendarMonth />
      </div>
    </div>
    <EventButton />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CalendarMonth from "../components/CaledarMonth.vue";
import EventButton from "../components/EventButton.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CalendarMonth,
    EventButton,
  },
});
</script>
