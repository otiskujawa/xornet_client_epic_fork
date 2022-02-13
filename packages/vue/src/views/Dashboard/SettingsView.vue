<template>
  <div class="w-full h-full flexcol bg-black bg-opacity-25">
    <top-bar />
    <div class="w-full h-full flexcol items-center gap-2 text-12px text-text px-8">
      <option-field label="Theme">
        <base-dropdown v-model="state.settings.general.theme" stay-open :options="['dark', 'nord', 'opera']" />
      </option-field>
      <option-field label="Status Bar">
        <base-switch v-model="state.settings.general.enable_status_bar" />
      </option-field>
      <option-field label="Sync on startup (client only)">
        <base-switch v-model="state.settings.client.enable_autosync" />
      </option-field>
      <option-field label="Sound FX">
        <base-switch v-model="state.settings.general.enable_sound_effects" />
      </option-field>
      <option-field label="Bloom Effects">
        <base-switch v-model="state.settings.general.enable_bloom" />
      </option-field>
      <option-field v-if="isElectron()" label="Rounded Window Corners">
        <base-switch v-model="state.settings.general.enable_rounded_corners" />
      </option-field>
      <option-field label="Show Offline Machines">
        <base-switch v-model="state.settings.general.show_offline_machines" />
      </option-field>
      <option-field label="Show Owned Machines Only">
        <base-switch v-model="state.settings.general.show_owned_machines_only" />
      </option-field>
      <option-field label="Show Total Machine Stats">
        <base-switch v-model="state.settings.general.enable_totals" />
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
