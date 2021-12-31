<template>
  <div class="flex w-full flex-col">
    <top-bar />
    <machine-list />
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import MachineList from "../../components/MachineList.vue";
import TopBar from "/@/components/TopBar.vue";
</script>

<style scoped lang="postcss"></style>
