<template>
  <q-form ref="loginForm" @submit="onSubmit">
    <div class="row">
      <div class="col-12 q-mb-sm">
        <q-input
          v-model="data.email"
          filled
          label="E-mail*"
          lazy-rules
          :rules="[
            (val) => !!val || 'O preenchimento deste campo é necessário',
          ]"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="data.password"
          type="password"
          filled
          label="Senha*"
          lazy-rules
          :rules="[
            (val) => !!val || 'O preenchimento deste campo é necessário',
          ]"
        />
      </div>
      <div class="col-12 q-mb-md">
        <q-checkbox v-model="keepConnected" label="Mantenha-me conectado" />
      </div>
    </div>
    <div class="row">
      <q-btn
        size="lg"
        type="submit"
        color="secondary"
        class="full-width"
        label="Entrar"
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const loginForm = ref(null);

const data = reactive({
  email: "user@email.com",
  password: "123456",
});

const keepConnected = ref(false);

const onSubmit = () => {
  router.push("agenda");
};
</script>
