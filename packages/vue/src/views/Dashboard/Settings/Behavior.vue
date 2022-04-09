<template>
  <p>
    Behavior
  </p>
  <option-field v-if="isElectron()" label="Discord Rich Presence" description="Show the current machine you're viewing on your Discord status">
    <base-switch v-model="state.settings.client.enable_rich_presence" />
  </option-field>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import OptionField from "/@/components/OptionField.vue";
import { isElectron } from "/@/services/logic";
const state = useState();
</script>
