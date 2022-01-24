<template>
  <div class="flex w-full h-full flex-col bg-black bg-opacity-25">
    <top-bar />
    <div class="w-full h-full flex flex-col items-center gap-2 text-12px text-text px-8">
      <option-field label="Theme">
        <base-dropdown v-model="state.settings.theme.value" stay-open :options="['dark', 'light', 'nord']" />
      </option-field>
      <option-field label="API Debug Logger">
        <base-switch v-model="state.settings.enableDebugLogger.value" />
      </option-field>
      <option-field label="Status Bar">
        <base-switch v-model="state.settings.enableStatusBar.value" />
      </option-field>
      <option-field label="Sound FX">
        <base-switch v-model="state.settings.enableSoundEffects.value" />
      </option-field>
      <option-field label="Bloom Effects">
        <base-switch v-model="state.settings.enableBloom.value" />
      </option-field>
      <option-field v-if="isElectron()" label="Rounded Window Corners">
        <base-switch v-model="state.settings.enableRoundedCorners.value" />
      </option-field>
      <option-field v-if="isElectron()" label="Background Opacity">
        <div class="flex gap-2 items-center">
          <base-range-input v-model="state.settings.opacity.value" min="0" max="100" step="1" />
          {{ state.settings.opacity.value }}%
        </div>
      </option-field>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import { useState } from "/@/services/state";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import TopBar from "/@/components/TopBar.vue";
import BaseRangeInput from "/@/components/base/BaseRangeInput.vue";
import OptionField from "/@/components/OptionField.vue";
const state = useState();

</script>

<style scoped lang="postcss" >

.option {
  @apply flex w-full gap-2 items-center justify-between max-w-168;
}

</style>
