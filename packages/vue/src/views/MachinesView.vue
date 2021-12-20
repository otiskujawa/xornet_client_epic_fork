<template>
  <div>
    <h1>isElectron: {{ isElectron() ? "true" : " false" }}</h1>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
</script>

<style scoped lang="postcss"></style>
