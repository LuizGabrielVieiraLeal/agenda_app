<template>
  <q-avatar color="secondary" class="text-white q-mr-sm"
    >{{ user.name[0].toUpperCase() }}
    <q-popup-proxy>
      <q-banner>
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <q-avatar size="72px" color="secondary" class="text-white">
              {{ user.name[0].toUpperCase() }}
            </q-avatar>

            <div class="text-subtitle1 q-mt-md">{{ user.name }}</div>
            <div class="text-subtitle2 q-mb-md">{{ user.email }}</div>

            <q-btn color="primary" label="Sair" size="sm" @click="onLogout" />
          </div>
        </div>
      </q-banner>
    </q-popup-proxy>
  </q-avatar>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "src/stores/user";
import userService from "src/services/user";

const router = useRouter();
const uStore = userStore();
const { logout } = userService();

const user = computed(() => uStore.currentUser);

const onLogout = () => {
  router.push({ name: "login" }).finally(() => {
    try {
      logout();
      uStore.setCurrentUser(null);
      uStore.setToken(null);
    } catch (ex) {
      console.log(ex.message);
    }
  });
};
</script>
