<template>
  <SettingsButton icon="palette" name="Appearance" description="Change your theme & colors">
    <Switch name="Stroked Icons" v-model="iconStroke" />
  </SettingsButton>
</template>

<script lang="ts" setup>
import Switch from "@/components/library/Switch.vue";
import SettingsButton from "@/components/dashboard/SettingsButton.vue";
import { iconStroke } from "@/states/prefs";
</script>
