<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#31ccec, #1976d2)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="max-width: 400px">
          <q-card-section>
            <div class="row justify-center items-center q-pt-lg q-pb-sm">
              <app-icon />
              <span class="text-bold text-primary text-h5 q-mt-sm"
                >Agenda Simples</span
              >
            </div>
          </q-card-section>
          <q-card-section>
            <login-form v-if="signIn" />
            <sign-up-form v-if="signUp" />
            <p class="q-pt-md text-bold" @click="toggleForm">
              {{ signIn ? "Não possui uma conta?" : "Já possui uma conta?" }}
              <span class="text-primary">{{
                signIn ? "Cadastre-se" : "Entre"
              }}</span>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import AppIcon from "src/components/shared/AppIcon.vue";
import LoginForm from "src/components/auth/forms/LoginForm.vue";
import SignUpForm from "src/components/auth/forms/SignUpForm.vue";

const signIn = ref(true);
const signUp = ref(false);

const toggleForm = () => {
  signIn.value = !signIn.value;
  signUp.value = !signUp.value;
};
</script>
