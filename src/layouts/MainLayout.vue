<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { userStore } from "src/stores/user";
import userService from "src/services/user";

onBeforeMount(() => {
  const uStore = userStore();
  const { loadCurrentUser } = userService();
  const { currentUser, token } = loadCurrentUser();
  uStore.setCurrentUser(currentUser);
  uStore.setToken(token);
});
</script>
