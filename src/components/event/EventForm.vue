<template>
  <div>
    <q-form ref="eventForm" @submit="onSubmit">
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        class="no-shadow"
      >
        <q-step
          :name="1"
          title="Informações do evento"
          icon="feed"
          active-icon="feed"
          :done="step > 1"
        >
          <div class="row">
            <div class="col-12 q-mb-xs q-px-xs">
              <q-input
                v-model="data.title"
                filled
                label="Título*"
                lazy-rules
                :rules="[
                  (val) => !!val || 'O preenchimento deste campo é necessário',
                ]"
              />
            </div>
            <div class="col-12 q-mb-lg q-px-xs">
              <q-input
                v-model="data.details"
                filled
                autogrow
                label="Detalhes"
              />
            </div>
            <div class="col-12 q-px-xs">
              <q-input
                v-model="data.date"
                filled
                type="date"
                label="Data*"
                lazy-rules
                :rules="[
                  (val) => !!val || 'O preenchimento deste campo é necessário',
                  (val) => dateIsValid(val) || 'Data inválida',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-4 q-px-xs">
              <q-input
                v-model="data.time"
                filled
                type="time"
                label="Horário inicial*"
                lazy-rules
                :rules="[(val) => (val && timeIsValid(val)) || 'Hora inválida']"
              />
            </div>
            <div class="col-xs-12 col-md-4 q-px-xs">
              <q-input
                v-model="finalTime"
                filled
                type="time"
                label="Horário final"
                lazy-rules
                :rules="[(val) => finalTimeIsValid(val) || 'Hora inválida']"
              />
            </div>
            <div class="col-xs-12 col-md-4 q-px-xs">
              <q-input
                v-model.number="data.days"
                filled
                type="number"
                min="0"
                label="Dias consecutivos"
              />
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn @click="validate" color="primary" label="Pŕoximo" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Cor"
          icon="style"
          active-icon="style"
          :done="step > 2"
        >
          <div class="row">
            <div
              v-for="color in this.$q.config.allowedEventColors"
              :key="color"
              class="column col-xs-6 col-md-3 content-center q-mb-xs q-px-xs"
            >
              <div class="row">
                <div class="col-6">
                  <q-radio v-model="data.color" :val="color" />
                </div>
                <div class="col-6 q-pt-xs">
                  <q-badge :color="color" class="q-pa-lg q-mt-sm" />
                </div>
              </div>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Próximo" />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Voltar"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Ícone"
          icon="emoji_emotions"
          active-icon="emoji_emotions"
          caption="Opcional"
        >
          <div class="row">
            <div
              v-for="icon in this.$q.config.allowedEventsIcons"
              :key="icon"
              class="column col-xs-4 col-md-2 content-center q-mb-xs q-px-xs"
            >
              <div class="row">
                <div class="col-6">
                  <q-radio v-model="data.icon" :val="icon" />
                </div>
                <div class="col-6">
                  <q-icon :name="icon" size="sm" class="q-mt-sm" />
                </div>
              </div>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Voltar"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
      <div class="row">
        <div v-if="event" class="col-6">
          <q-btn
            flat
            class="full-width"
            color="negative"
            label="Excluir"
            icon="delete"
            @click="toogleCustomDialog"
          />
        </div>
        <div v-else class="col-6">
          <q-btn
            flat
            color="primary"
            label="Limpar"
            icon="settings_backup_restore"
            class="full-width"
            @click="onReset"
          />
        </div>
        <div class="col-6">
          <q-btn
            flat
            :loading="loading"
            class="full-width"
            type="submit"
            color="positive"
            :label="event ? 'Atualizar' : 'Salvar'"
            icon="save"
            :disable="step < 2"
          />
        </div>
      </div>
    </q-form>
    <custom-dialog
      v-if="event"
      ref="customDialog"
      size="small"
      prev-icon="delete"
      :header-text="event.title"
      :persistent="true"
    >
      <template v-slot:body>
        <event-remove-content :event="event" @abort="toogleCustomDialog" />
      </template>
    </custom-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userStore } from "../../stores/user";
import { calendarStore } from "../../stores/calendar";
import { today } from "@quasar/quasar-ui-qcalendar/src";
import CustomDialog from "../shared/CustomDialog.vue";
import { Notify } from "quasar";
import EventRemoveContent from "./EventRemoveContent.vue";

const props = defineProps({
  event: { type: Object, default: null },
});

const customDialog = ref(null);

const uStore = userStore();
const cStore = calendarStore();

const eventForm = ref(null);
const finalTime = ref(null);
const step = ref(1);
const loading = ref(false);

const data = reactive({
  user_id: uStore.getUser.id,
  title: props.event?.title || "",
  details: props.event?.details || null,
  date: props.event?.date || "",
  time: props.event?.time || null,
  duration: props.event?.duration || null,
  color: props.event?.color || "blue",
  icon: props.event?.icon || null,
  days: props.event?.days || 0,
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

const finalTimeIsValid = (selectedFinalTime) => {
  if (data.time && selectedFinalTime) return data.time < selectedFinalTime;
  return true;
};

const validate = () => {
  eventForm.value.validate().then((success) => {
    if (success) step.value = 2;
  });
};

const onReset = () => {
  data.title = data.details = data.date = "";
  data.time = data.duration = data.icon = null;
  data.color = "blue";
  data.days = 0;
  step.value = 1;
};

const onSubmit = async () => {
  loading.value = true;
  if (data.days === 0) data.days = null;
  if (!data.details || data.details.length === 0) data.details = null;

  if (data.time && finalTime.value) {
    const startTime = new Date(`${data.date}T${data.time}:00`);
    const endTime = new Date(`${data.date}T${finalTime.value}:00`);
    const difMs = endTime.getTime() - startTime.getTime();
    data.duration = difMs / 60000;
  }

  if (!props.event) {
    await cStore
      .addEvent(Object.assign({}, data))
      .then((res) => {
        console.log(res);
        onReset();
        Notify.create({
          message: "Evento criado com sucesso!",
          color: "positive",
        });
      })
      .catch((ex) => {
        Notify.create({
          message:
            "Erro ao adicionar evento. Por favor tente novamente mais tarde.",
          color: "negative",
        });
      });
  } else {
    await cStore
      .updateEvent(props.event.id, Object.assign({}, data))
      .then(() => {
        step.value = 1;
        Notify.create({
          message: "Evento atualizado com sucesso!",
          color: "positive",
        });
      })
      .catch((ex) => {
        Notify.create({
          message:
            "Erro ao atualizar evento. Por favor tente novamente mais tarde.",
          color: "negative",
        });
      });
  }
  loading.value = false;
};

const toogleCustomDialog = () => {
  customDialog.value?.toogleDialog();
};
</script>
