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
            (val) => dateIsValid(val) || 'Data inválida',
          ]"
        />
      </div>
      <div class="col-xs-6 col-md-3 q-mb-xs q-px-xs">
        <q-input
          v-model="data.time"
          filled
          type="time"
          label="Hora inicial"
          :rules="[(val) => timeIsValid(val) || 'Hora inválida']"
        />
      </div>
      <div class="col-xs-6 col-md-3 q-mb-xs q-px-xs">
        <q-input
          v-model="finalTime"
          filled
          type="time"
          label="Hora final"
          :rules="[(val) => finalTimeIsValid(val) || 'Hora inválida']"
        />
      </div>
      <div class="col-xs-12 q-mb-xs q-px-xs">
        <p>Selecione uma cor para seu evento*</p>
      </div>
      <div
        v-for="color in colors"
        :key="color"
        class="column col-xs-6 col-md-3 content-center q-mb-xs q-px-xs"
      >
        <div class="row">
          <div class="col-6">
            <q-radio v-model="data.bgcolor" :val="color" />
          </div>
          <div class="col-6 q-pt-xs">
            <q-badge :color="color" class="q-pa-lg q-mt-sm" />
          </div>
        </div>
      </div>
      <div class="col-xs-12 q-mb-xs q-mt-md q-px-xs">
        <p>Que tal adicionar um ícone ao seu evento? &#128521;</p>
      </div>
      <div
        v-for="icon in icons"
        :key="icon"
        class="column col-xs-4 col-md-2 content-center q-mb-xs q-px-xs"
      >
        <div class="row">
          <div class="col-6"><q-radio v-model="data.icon" :val="icon" /></div>
          <div class="col-6">
            <q-icon :name="icon" size="sm" class="q-mt-sm" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-end q-mt-lg">
      <q-btn outline label="Fechar" icon="close" v-close-popup />
      <q-btn
        outline
        label="Salvar"
        icon="save"
        color="primary"
        type="submit"
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { calendarStore } from "../stores/calendar";
import { today } from "@quasar/quasar-ui-qcalendar/src";

export default defineComponent({
  emits: ["onEventTriggered"],
  setup(_, { emit }) {
    const store = calendarStore();
    const colors = store.getAllowedColors;
    const icons = store.getAllowedIcons;

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

    const dateIsValid = (selectedDate) => {
      const currentDate = today();
      return selectedDate >= currentDate;
    };

    const timeIsValid = (selectedTime) => {
      if (data.date === today())
        return `${selectedTime}:00` >= new Date().toLocaleTimeString();
      return true;
    };

    const finalTimeIsValid = (selectedTime) => {
      return `${data.time}:00` <= `${selectedTime}:00`;
    };

    const onSubmit = () => {
      eventForm.value.validate().then(async (success) => {
        if (success)
          await store.addEvent(data).then(() =>
            emit("onEventTriggered", {
              message: "Evento adicionado com sucesso!",
              color: "positive",
            })
          );
      });
    };

    return {
      eventForm,
      finalTime,
      data,
      colors,
      icons,
      dateIsValid,
      timeIsValid,
      finalTimeIsValid,
      onSubmit,
    };
  },
});
</script>
