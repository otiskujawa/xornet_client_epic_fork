<template>
  <div class="distro-icon flex items-center">
    <i-distros-alpine v-if="name === 'alpine'" />
    <i-distros-arch v-if="name === 'Arch Linux'" />
    <i-distros-debian v-if="name === 'Debian GNU/Linux'" />
    <i-distros-endeavour v-if="name === 'EndeavourOS'" />
    <i-distros-garuda v-if="name === 'garuda'" />
    <i-distros-macos v-if="name === 'macos'" />
    <i-distros-windows10 v-if="name === 'Windows'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ name?: string }>();
</script>
