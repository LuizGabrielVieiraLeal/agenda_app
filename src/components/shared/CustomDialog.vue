<template>
  <q-dialog
    v-model="dialog"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :seamless="seamless"
    :position="position"
  >
    <q-card :class="`card-dialog-${size}`">
      <q-card-section v-if="headerText" class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon v-if="prevIcon" :name="prevIcon" class="q-mr-sm q-mb-xs" />{{
            headerText
          }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div
          v-if="position === 'bottom' && !headerText"
          class="row justify-center items-center"
        >
          <q-badge rounded color="grey" class="q-px-xl q-mb-md" v-close-popup />
        </div>
        <slot name="body"></slot>
      </q-card-section>

      <q-card-actions>
        <slot name="actions"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  transitionHide: { type: String, default: "fade" },
  transitionShow: { type: String, default: "fade" },
  seamless: { type: Boolean, default: false },
  position: { type: String, default: "standard" },
  size: { type: String, default: "medium" },
  prevIcon: { type: String, default: null },
  headerText: { type: String, default: null },
});

const dialog = ref(false);

const toogleDialog = (value = false) => (dialog.value = !dialog.value);

defineExpose({ toogleDialog });
</script>
