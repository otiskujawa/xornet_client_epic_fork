<template>
  <i-distros-alpine v-if="name?.toLowerCase().includes('alpine')" />
  <i-distros-arch v-else-if="name?.toLowerCase().includes('arch')" />
  <i-distros-debian v-else-if="name?.toLowerCase().includes('debian')" />
  <i-distros-fedora v-else-if="name?.toLowerCase().includes('fedora')" />
  <i-distros-popos v-else-if="name?.toLowerCase().includes('pop!_os')" />
  <i-distros-redhat v-else-if="name?.toLowerCase().includes('red hat')" />
  <i-distros-ubuntu v-else-if="name?.toLowerCase().includes('ubuntu')" />
  <i-distros-openwrt v-else-if="name?.toLowerCase().includes('openwrt')" />
  <i-distros-suse v-else-if="name?.toLowerCase().includes('suse')" />
  <i-distros-endeavour v-else-if="name?.toLowerCase().includes('endeavour')" />
  <i-distros-garuda v-else-if="name?.toLowerCase().includes('garuda')" />
  <i-distros-raspbian v-else-if="name?.toLowerCase().includes('raspbian')" />
  <i-distros-macos v-else-if="name?.toLowerCase().includes('macos')" />
  <i-distros-windows10 v-else-if="name?.toLowerCase().includes('windows')" />
  <i-distros-kubuntu v-else-if="name?.toLowerCase().includes('kubuntu')" />
  <i-distros-nixos v-else-if="name?.toLowerCase().includes('nixos')" />
  <i-fluency-computer v-else />
</template>

<script setup lang="ts">
defineProps<{ name?: string }>();
</script>
