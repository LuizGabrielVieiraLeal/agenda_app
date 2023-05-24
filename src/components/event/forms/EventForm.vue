<template>
  <div>
    <q-form ref="eventFormRef" @submit="onSubmit">
      <custom-stepper ref="customStepperRef" :steps="eventFormSteps">
        <template v-slot:1>
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
                required
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
                required
              />
            </div>
            <div class="col-xs-12 col-md-6 q-px-xs">
              <q-input
                v-model="data.time"
                filled
                type="time"
                label="Horário inicial*"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && timeIsValid(data.date, val)) || 'Hora inválida',
                ]"
                required
              />
            </div>
            <div class="col-xs-12 col-md-6 q-px-xs">
              <q-input
                v-model="finalTime"
                filled
                type="time"
                label="Horário final"
                lazy-rules
                :rules="[
                  (val) => finalTimeIsValid(data.time, val) || 'Hora inválida',
                ]"
              />
            </div>
          </div>
        </template>
        <template v-slot:2>
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
        </template>
        <template v-slot:3>
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
        </template>
      </custom-stepper>
      <div class="row">
        <div v-if="event" class="col-6">
          <q-btn
            flat
            class="full-width"
            color="negative"
            label="Excluir"
            icon="delete"
            @click="toogleCustomDialog(false)"
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
          />
        </div>
      </div>
    </q-form>
    <custom-dialog
      v-if="event"
      ref="customDialogRef"
      size="small"
      prev-icon="delete"
      :header-text="event.title"
      :persistent="true"
    >
      <template v-slot:body>
        <event-remove
          :event="event"
          @abort="toogleCustomDialog"
          @remove="toogleCustomDialog"
        />
      </template>
    </custom-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userStore } from "src/stores/user";
import { calendarStore } from "src/stores/calendar";
import calendarService from "src/services/calendar";
import CustomStepper from "src/components/shared/CustomStepper.vue";
import CustomDialog from "src/components/shared/CustomDialog.vue";
import EventRemove from "src/components/event/forms/EventRemove.vue";
import { Notify } from "quasar";
import {
  dateIsValid,
  timeIsValid,
  finalTimeIsValid,
} from "src/utils/event-validators";
import {
  setDuration,
  setTimeFromDuration,
  eventFormSteps,
} from "src/utils/event-helper";

const props = defineProps({
  event: { type: Object, default: null },
});

const emit = defineEmits(["remove"]);

const uStore = userStore();
const cStore = calendarStore();
const eventFormRef = ref(null);
const customDialogRef = ref(null);
const customStepperRef = ref(null);
const loading = ref(false);
const finalTime =
  props.event && props.event.duration
    ? ref(
        setTimeFromDuration(
          props.event.date,
          props.event.time,
          props.event.duration
        )
      )
    : ref(null);

const data = reactive({
  user_id: uStore.currentUser.id,
  title: props.event?.title || "",
  details: props.event?.details || null,
  date: props.event?.date || "",
  time: props.event?.time || "",
  duration: props.event?.duration || null,
  color: props.event?.color || "blue",
  icon: props.event?.icon || null,
});

const onReset = () => {
  data.title = data.details = data.date = "";
  data.time = data.duration = data.icon = finalTime.value = null;
  data.color = "blue";
  customStepperRef.value?.reset();
};

const onSubmit = async () => {
  if (data.title === "" || data.date === "" || data.time === "") {
    customStepperRef.value?.reset();
    setTimeout(() => eventFormRef.value.validate(), 1000);
  } else {
    loading.value = true;
    data.duration = setDuration(data.date, data.time, finalTime.value);

    if (!props.event) {
      try {
        const { create } = calendarService();
        const { event, message } = await create({ event: data });
        cStore.addEvent(event);
        onReset();
        Notify.create({
          message: message,
          color: "positive",
        });
      } catch (ex) {
        Notify.create({
          message: ex.message,
          color: "negative",
        });
      }
    } else {
      try {
        const { update } = calendarService();
        const { event, message } = await update(props.event.id, {
          event: data,
        });
        cStore.updateEvent(event);
        customStepperRef.value?.reset();
        Notify.create({
          message: message,
          color: "positive",
        });
      } catch (ex) {
        Notify.create({
          message: ex.message,
          color: "negative",
        });
      }
    }
    loading.value = false;
  }
};

const toogleCustomDialog = (remove) => {
  customDialogRef.value?.toogleDialog();
  if (remove) emit("remove");
};
</script>
