<template>
  <div class="w-full h-full flexcol bg-black bg-opacity-25">
    <top-bar />
    <div class="w-full h-full flexcol items-center gap-2 text-12px text-text px-8">
      <option-field label="Theme">
        <base-dropdown v-model="state.settings.general.theme" stay-open :options="['dark', 'light', 'nord']" />
      </option-field>
      <option-field label="Status Bar">
        <base-switch v-model="state.settings.general.enableStatusBar" />
      </option-field>
      <option-field label="Sound FX">
        <base-switch v-model="state.settings.general.enableSoundEffects" />
      </option-field>
      <option-field label="Bloom Effects">
        <base-switch v-model="state.settings.general.enableBloom" />
      </option-field>
      <option-field v-if="isElectron()" label="Rounded Window Corners">
        <base-switch v-model="state.settings.general.enableRoundedCorners" />
      </option-field>
      <option-field v-if="isElectron()" label="Background Opacity">
        <div class="flex gap-2 items-center">
          <base-range-input v-model="state.settings.general.opacity" min="0" max="100" step="1" />
          {{ state.settings.general.opacity }}%
        </div>
      </option-field>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import { useState } from "/@/app";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import TopBar from "/@/components/TopBar.vue";
import BaseRangeInput from "/@/components/base/BaseRangeInput.vue";
import OptionField from "/@/components/OptionField.vue";
const state = useState();
</script>
