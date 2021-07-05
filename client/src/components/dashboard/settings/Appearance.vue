<template>
  <SettingsButton icon="palette" name="Appearance" description="Change your theme & colors">
    <Setting icon="fill" name="Stroked Icons" v-model="iconStroke" />
    <Setting icon="counter" name="Tweened Numbers" v-model="tweenNumbers" />
  </SettingsButton> 
</template>

<script lang="ts" setup>
import SettingsButton from "@/components/dashboard/SettingsButton.vue";
import Setting from "@/components/dashboard/settings/Setting.vue";
import { iconStroke, tweenNumbers } from "@/states/prefs";
</script>