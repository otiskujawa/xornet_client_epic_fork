<template>
  <label :for="name">Choose a car:</label>
  <select :name="name">
    <option v-for="option of options" :key="option.value" v-mode="option.value" value="volvo">
      Volvo
    </option>
    <option value="saab">
      Saab
    </option>
    <option value="fiat">
      Fiat
    </option>
    <option value="audi">
      Audi
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{ name: string; options: { value: any }[] }>();
</script>

<style scoped lang="postcss"></style>
