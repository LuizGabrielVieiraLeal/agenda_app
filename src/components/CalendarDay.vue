<template>
  <QCalendarDay
    ref="calendar"
    v-model="selectedDate"
    :locale="locale"
    bordered
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import { QCalendarDay } from "@quasar/quasar-ui-qcalendar/dist/QCalendarDay.esm.js";

export default defineComponent({
  name: "CalendarDay",
  props: {
    store: { type: Object, required: true },
  },
  components: {
    QCalendarDay,
  },
  setup(props) {
    const locale = ref(props.store.getLocale);
    let selectedDate = ref(props.store.getSelectedDate);

    return { locale, selectedDate };
  },
  watch: {
    store: {
      handler() {
        this.selectedDate = this.$props.store.getSelectedDate;
      },
      deep: true,
    },
  },
});
</script>
