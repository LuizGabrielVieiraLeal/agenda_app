<template>
  <q-form ref="loginFormRef" @submit="onSubmit">
    <div class="row">
      <div class="col-12 q-mb-sm">
        <q-input
          v-model="data.email"
          type="email"
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
        :loading="loading"
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
import { userStore } from "src/stores/user";
import userService from "src/services/user";
import { Notify } from "quasar";

const router = useRouter();
const uStore = userStore();
const { login } = userService();
const loginFormRef = ref(null);
const keepConnected = ref(false);
const loading = ref(false);

const data = reactive({
  email: "user@email.com",
  password: "123456",
});

const onSubmit = async () => {
  loading.value = true;

  loginFormRef.value.validate().then(async (success) => {
    if (success)
      try {
        const { user, token } = await login(
          { user: data },
          keepConnected.value
        );
        uStore.setCurrentUser(user);
        uStore.setToken(token);
        router.push({ name: "home" });
      } catch (ex) {
        Notify.create({
          message: ex.message,
          color: "negative",
        });
      }
  });

  loading.value = false;
};
</script>
