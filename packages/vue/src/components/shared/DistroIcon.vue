<template>
  <div class="distro-icon flex items-center">
    <i-distros-alpine v-if="name?.toLowerCase().includes('alpine')" />
    <i-distros-arch v-else-if="name?.toLowerCase().includes('arch')" />
    <i-distros-debian v-else-if="name?.toLowerCase().includes('debian')" />
    <i-distros-redhat v-else-if="name?.toLowerCase().includes('red hat')" />
    <i-distros-ubuntu v-else-if="name?.toLowerCase().includes('ubuntu')" />
    <i-distros-openwrt v-else-if="name?.toLowerCase().includes('openwrt')" />
    <i-distros-suse v-else-if="name?.toLowerCase().includes('suse')" />
    <i-distros-endeavour v-else-if="name?.toLowerCase().includes('endeavour')" />
    <i-distros-garuda v-else-if="name?.toLowerCase().includes('garuda')" />
    <i-distros-raspbian v-else-if="name?.toLowerCase().includes('raspbian')" />
    <i-distros-macos v-else-if="name?.toLowerCase().includes('macos')" />
    <i-distros-windows10 v-else-if="name?.toLowerCase().includes('windows')" />
    <h1 v-else>
      {{ name?.toLowerCase() }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name?: string }>();
</script>
