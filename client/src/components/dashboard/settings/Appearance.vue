<template>
  <SettingsButton icon="palette" name="Appearance" description="Change your theme & colors">
    <button @click="isStroked()">Filled</button>
    <Switch />
  </SettingsButton>
</template>

<script lang="ts" setup>
import Switch from '@/components/library/Switch.vue';
import SettingsButton from '@/components/dashboard/SettingsButton.vue';



</script>

  // methods: {
  //   isStroked() {
  //     const isStroked = localStorage.getItem("isStroked") === "true" ? "false" : "true";
  //     localStorage.setItem("isStroked", isStroked);
  //   }
  // },
  // data() {
  //   return {
  //     filled: false,
  //   }
  // }
