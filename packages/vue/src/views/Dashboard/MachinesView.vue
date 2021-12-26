<template>
  <div class="flex flex-col">
    <machine-list />
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import MachineList from "../../components/MachineList.vue";
</script>

<style scoped lang="postcss"></style>
