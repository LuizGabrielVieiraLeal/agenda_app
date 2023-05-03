<template>
  <q-dialog
    v-model="dialog"
    :transition-show="transitionShow ? transitionShow : 'scale'"
    :transition-hide="transitionHide ? transitionHide : 'scale'"
    :seamless="seamless"
    :persistent="persistent"
    :position="position"
  >
    <q-card :class="`card-${size}`">
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
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  transitionHide: { type: String, default: null },
  transitionShow: { type: String, default: null },
  seamless: { type: Boolean, default: false },
  persistent: { type: Boolean, default: false },
  position: { type: String, default: "standard" },
  size: { type: String, default: "medium" },
  prevIcon: { type: String, default: null },
  headerText: { type: String, default: null },
});

const dialog = ref(false);

const toogleDialog = () => (dialog.value = !dialog.value);

defineExpose({ toogleDialog });
</script>
