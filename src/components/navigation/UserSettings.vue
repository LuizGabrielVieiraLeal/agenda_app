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
import { userStore } from "../../stores/user";

const uStore = userStore();
const user = computed(() => uStore.getUser);

const router = useRouter();

const darkMode = ref(false);

const onLogout = () => {
  uStore.logout();
  router.push({ name: "login" });
};
</script>
