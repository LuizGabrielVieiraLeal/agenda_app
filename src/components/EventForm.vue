<template>
  <q-form ref="eventForm" @submit="onSubmit">
    <div class="row">
      <div class="col-12 q-mb-xs q-px-xs">
        <q-input
          v-model="data.title"
          filled
          label="Título*"
          :rules="[
            (val) => !!val || 'O preenchimento deste campo é necessário',
          ]"
        />
      </div>
      <div class="col-12 q-mb-xs q-px-xs">
        <q-input
          v-model="data.details"
          filled
          autogrow
          label="Detalhes*"
          :rules="[
            (val) => !!val || 'O preenchimento deste campo é necessário',
          ]"
        />
      </div>
      <div class="col-xs-12 col-md-6 q-mb-xs q-px-xs">
        <q-input
          v-model="data.date"
          filled
          type="date"
          label="Data*"
          :rules="[
            (val) => !!val || 'O preenchimento deste campo é necessário',
          ]"
        />
      </div>
      <div class="col-xs-6 col-md-3 q-mb-xs q-px-xs">
        <q-input v-model="data.time" filled type="time" label="Hora inicial" />
      </div>
      <div class="col-xs-6 col-md-3 q-mb-xs q-px-xs">
        <q-input v-model="finalTime" filled type="time" label="Hora final" />
      </div>
      <div class="col-xs-12 q-mb-xs q-px-xs">
        <p>Selecione uma cor para seu evento*</p>
      </div>
      <div
        v-for="color in allowedColors"
        :key="color"
        class="column col-xs-4 col-md-3 content-center q-mb-xs q-px-xs"
      >
        <div class="row">
          <div class="col-6">
            <q-radio v-model="data.bgcolor" :val="color.value" />
          </div>
          <div class="col-6 q-pt-xs">
            <q-badge :color="color.value" class="q-mt-sm">
              {{ color.label }}
            </q-badge>
          </div>
        </div>
      </div>
      <div class="col-xs-12 q-mb-xs q-mt-md q-px-xs">
        <p>Que tal adicionar um ícone ao seu evento? &#128521;</p>
      </div>
      <div
        v-for="icon in allowedIcons"
        :key="icon"
        class="column col-xs-3 col-md-2 content-center q-mb-xs q-px-xs"
      >
        <div class="row">
          <div class="col-6"><q-radio v-model="data.icon" :val="icon" /></div>
          <div class="col-6">
            <q-icon :name="icon" size="sm" class="q-mt-sm" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-end q-mt-md">
      <q-btn flat label="Fechar" icon="close" v-close-popup />
      <q-btn flat label="Salvar" icon="save" color="primary" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { calendarStore } from "../stores/calendar";

export default defineComponent({
  emits: ["onAddedEvent"],
  setup(_, { emit }) {
    const store = calendarStore();

    const eventForm = ref(null),
      finalTime = ref(null);

    const data = reactive({
      title: "",
      details: "",
      date: "",
      time: null,
      duration: null,
      bgcolor: "blue",
      icon: null,
      days: null,
    });

    const allowedColors = [
      { label: "Azul", value: "blue" },
      { label: "Indigo", value: "indigo" },
      { label: "Verde", value: "green" },
      { label: "Ciano", value: "cyan" },
      { label: "Vermelho", value: "red" },
      { label: "Rosa", value: "pink" },
      { label: "Roxo", value: "purple" },
      { label: "Amarelo", value: "yellow" },
      { label: "Laranja", value: "orange" },
      { label: "Marrom", value: "brown" },
      { label: "Cinza", value: "grey" },
      { label: "Preto", value: "dark" },
    ];

    const allowedIcons = [
      "favorite",
      "auto_stories",
      "grade",
      "flight_takeoff",
      "fitness_center",
      "textsms",
      "work",
      "bookmark",
      "warning",
      "light_mode",
      "celebration",
      "cake",
    ];

    const onSubmit = () => {
      eventForm.value.validate().then(async (success) => {
        if (success)
          await store.addEvent(data).then(() => emit("onAddedEvent"));
      });
    };

    return {
      eventForm,
      finalTime,
      data,
      allowedColors,
      allowedIcons,
      onSubmit,
    };
  },
});
</script>
