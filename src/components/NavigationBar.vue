<template>
  <q-header>
    <q-toolbar class="bg-white text-black q-py-sm shadow-1">
      <q-toolbar-title>
        <q-icon name="bi-calendar" /> Agenda Simples
      </q-toolbar-title>
      <q-btn stretch flat @click="$emit('today')"> Hoje </q-btn>
      <q-btn round flat size="xs" @click="$emit('prev')">
        <q-icon name="bi-chevron-left" />
      </q-btn>
      <q-btn round flat size="xs" class="q-mr-md" @click="$emit('next')">
        <q-icon name="bi-chevron-right" />
      </q-btn>
      <slot></slot>
      <template v-for="n in 5" :key="n">
        <q-space />
      </template>
      <q-icon name="bi-github" size="1.1em" />
      <a href="#" class="text-black text-bold github-link q-ml-sm">v1.0.0</a>
    </q-toolbar>
  </q-header>
</template>
