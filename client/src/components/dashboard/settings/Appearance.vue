<template>
  <SettingsButton icon="palette" name="Appearance" description="Change your theme & colors">
    <div class="flex flex-col gap-2">

      <Icon icon="fill" class="w-6"/>
      <label class="flex-1" for="Stroked Icons">Stroked Icons</label>
      <Switch name="Stroked Icons" v-model="iconStroke" />

      <Icon icon="counter" class="w-6"/>
      <label class="flex-1" for="Tweened Numbers">Tweened Numbers</label>
      <Switch name="Tweened Numbers" v-model="tweenNumbers" />

    </div>
  </SettingsButton> 
</template>

<script lang="ts" setup>
import Switch from "@/components/library/Switch.vue";
import Icon from "@/components/misc/Icon.vue";
import SettingsButton from "@/components/dashboard/SettingsButton.vue";
import { iconStroke, tweenNumbers } from "@/states/prefs";
</script>