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
          style="width: 400px; max-height: 540px"
        >
          <q-card-section>
            <div class="row justify-center items-center q-pt-xl q-pb-lg">
              <app-icon />
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
import AppIcon from "../components/shared/AppIcon.vue";
import LoginForm from "../components/auth/LoginForm.vue";
</script>
