<!-- prettier-ignore -->
<template>
  <div class="flex items-center">
  <i-distros-alpine    v-if="name === 'alpine'"    />
  <i-distros-arch      v-if="name === 'arch'"      />
  <i-distros-debian    v-if="name === 'debian'"    />
  <i-distros-endeavour v-if="name === 'endeavour'" />
  <i-distros-garuda    v-if="name === 'garuda'"    />
  <i-distros-macos     v-if="name === 'macos'"     />
  <i-distros-windows10 v-if="name === 'windows10'" />
  <i-distros-windows11 v-if="name === 'windows11'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
