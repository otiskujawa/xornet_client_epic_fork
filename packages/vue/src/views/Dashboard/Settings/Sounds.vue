
<template>
  <p>
    Sounds
  </p>
  <option-field label="Sound FX" description="Enables sound effects when hovering over buttons etc.">
    <base-switch v-model="state.settings.general.enable_sound_effects" />
  </option-field>
  <option-field new-feature description="Adjust the sound effect Volume" label="Sound Volume">
    <div class="flex gap-2 items-center">
      <base-range-input v-model="state.settings.general.sound_volume" min="0" max="100" step="1" />
      {{ state.settings.general.sound_volume }}%
    </div>
  </option-field>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import BaseRangeInput from "/@/components/base/BaseRangeInput.vue";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import OptionField from "/@/components/OptionField.vue";
const state = useState();
</script>
