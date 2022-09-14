<template>
  <div class="flex gap-3px max-w-64 flex-wrap">
    <network-interface
      v-for="iface of interfaces"
      :key="iface.n"
      :iface="iface"
    />
  </div>
</template>

<script setup lang="ts">
import type { INetwork } from "/@/types/api/machine";
import NetworkInterface from "./NetworkInterface.vue";
defineProps<{interfaces?: INetwork[]}>();
</script>
