<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#31ccec, #1976d2)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card
          square
          class="shadow-24"
          style="max-width: 350px; max-height: 540px"
        >
          <q-card-section>
            <div class="row justify-center items-center q-pt-lg q-pb-sm">
              <app-icon />
              <span class="text-bold text-primary text-h5 q-mt-sm"
                >Agenda Simples</span
              >
            </div>
          </q-card-section>
          <q-card-section>
            <login-form />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import AppIcon from "src/components/shared/AppIcon.vue";
import LoginForm from "src/components/auth/LoginForm.vue";
</script>
