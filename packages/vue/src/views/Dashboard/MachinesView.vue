<template>
  <div class="flex w-full flex-col">
    <machine-list />
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import MachineList from "../../components/MachineList.vue";
</script>

<style scoped lang="postcss"></style>
