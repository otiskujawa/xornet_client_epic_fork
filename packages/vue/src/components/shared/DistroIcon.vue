<template>
  <i-distros-alpine v-if="icon === 'alpine'" />
  <i-distros-arch v-else-if="icon === 'arch'" />
  <i-distros-debian v-else-if="icon === 'debian'" />
  <i-distros-fedora v-else-if="icon === 'fedora'" />
  <i-distros-popos v-else-if="icon === 'popos'" />
  <i-distros-redhat v-else-if="icon === 'redhat'" />
  <i-distros-ubuntu v-else-if="icon === 'ubuntu'" />
  <i-distros-openwrt v-else-if="icon === 'openwrt'" />
  <i-distros-suse v-else-if="icon === 'suse'" />
  <i-distros-freebsd v-else-if="icon === 'freebsd'" />
  <i-distros-endeavour v-else-if="icon === 'endeavour'" />
  <i-distros-garuda v-else-if="icon === 'garuda'" />
  <i-distros-raspbian v-else-if="icon === 'raspbian'" />
  <i-distros-macos v-else-if="icon === 'darwin'" />
  <i-distros-windows10 v-else-if="icon === 'windows10'" />
  <i-distros-kubuntu v-else-if="icon === 'kubuntu'" />
  <i-distros-nixos v-else-if="icon === 'nixos'" />
  <i-distros-parrot v-else-if="icon === 'parrot'" />
  <i-fluency-computer v-else />
</template>
<script setup lang="ts">
import { getMachineOsImageKey } from "/@/services/logic";
const props = defineProps<{ name?: string }>();
const icon = getMachineOsImageKey(props.name!);
</script>
