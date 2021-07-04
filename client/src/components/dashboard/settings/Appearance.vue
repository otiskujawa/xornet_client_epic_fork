<template>
  <SettingsButton icon="palette" name="Appearance" description="Change your theme & colors">
    <div class="flex flex-col gap-2">
      <Switch name="Stroked Icons" v-model="iconStroke" />
      <Switch name="Tweened Numbers" v-model="tweenNumbers" />
    </div>
  </SettingsButton>
</template>

<script lang="ts" setup>
import Switch from "@/components/library/Switch.vue";
import SettingsButton from "@/components/dashboard/SettingsButton.vue";
import { iconStroke, tweenNumbers } from "@/states/prefs";
</script>
