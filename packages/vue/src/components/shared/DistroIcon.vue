<template>
  <div class="distro-icon flex items-center">
    <i-distros-alpine v-if="name?.toLowerCase().includes('alpine')" />
    <i-distros-arch v-if="name?.toLowerCase().includes('arch')" />
    <i-distros-debian v-if="name?.toLowerCase().includes('debian')" />
    <i-distros-redhat v-if="name?.toLowerCase().includes('red hat')" />
    <i-distros-ubuntu v-if="name?.toLowerCase().includes('ubuntu')" />
    <i-distros-openwrt v-if="name?.toLowerCase().includes('openwrt')" />
    <i-distros-suse v-if="name?.toLowerCase().includes('suse')" />
    <i-distros-endeavour v-if="name?.toLowerCase().includes('endeavour')" />
    <i-distros-garuda v-if="name?.toLowerCase().includes('garuda')" />
    <i-distros-macos v-if="name?.toLowerCase().includes('macos')" />
    <i-distros-windows10 v-if="name?.toLowerCase().includes('windows')" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ name?: string }>();
</script>
