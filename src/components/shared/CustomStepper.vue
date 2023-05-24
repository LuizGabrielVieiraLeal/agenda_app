<template>
  <q-stepper
    v-model="currentStep"
    vertical
    color="primary"
    animated
    class="no-shadow"
  >
    <q-step
      v-for="step in steps"
      :key="stepPosition(step)"
      :name="stepPosition(step)"
      :title="step.title"
      :icon="step.icon"
      :active-icon="step.icon"
      :done="currentStep > stepPosition(step)"
      :caption="step.optional ? 'Opcional' : ''"
    >
      <slot :name="stepPosition(step)"></slot>

      <q-stepper-navigation>
        <q-btn
          v-if="stepPosition(step) < steps.length"
          @click="next"
          color="primary"
          label="Pŕoximo"
        />
        <q-btn
          v-if="stepPosition(step) > 1"
          flat
          @click="prev"
          color="primary"
          label="Voltar"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  steps: { type: Array, required: true },
});

const currentStep = ref(1);

const next = () => (currentStep.value = currentStep.value + 1);
const prev = () => (currentStep.value = currentStep.value - 1);
const reset = () => (currentStep.value = 1);

const stepPosition = (step) =>
  props.steps.findIndex((s) => s.title === step.title) + 1;

defineExpose({ reset });
</script>
