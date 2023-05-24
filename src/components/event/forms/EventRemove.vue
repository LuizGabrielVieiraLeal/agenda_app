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
        @click="$emit('abort', false)"
      />
    </div>
    <div class="col-6">
      <q-btn
        flat
        color="negative"
        label="Remover"
        icon="delete"
        class="full-width"
        @click="$emit('remove', true)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: { type: Object, required: true },
});

const emit = defineEmits(["abort", "remove"]);
</script>
