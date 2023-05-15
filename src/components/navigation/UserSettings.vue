<template>
  <q-avatar color="secondary" class="text-white q-mr-sm"
    >{{ user.name[0].toUpperCase() }}
    <q-popup-proxy>
      <q-banner>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Configurações</div>
            <q-toggle v-model="darkMode" label="Modo noturno" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "src/stores/user";
import userService from "src/services/user";
import { clearStorage } from "src/utils/storage-helper";

const router = useRouter();
const uStore = userStore();
const { removeAuth } = userService();
const darkMode = ref(false);

const user = computed(() => uStore.currentUser);

const onLogout = () => {
  router.push({ name: "login" }).finally(() => {
    try {
      const authRemoved = removeAuth();
      if (authRemoved) {
        clearStorage();
        uStore.setCurrentUser(null);
        uStore.setToken(null);
      }
    } catch (ex) {
      console.log(ex.message);
    }
  });
};
</script>
