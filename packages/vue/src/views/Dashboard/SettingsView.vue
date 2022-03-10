<template>
  <div class="w-full h-full overflow-y-scroll items-center flexcol bg-black bg-opacity-25">
    <top-bar />
    <div class="optionList">
      <p>
        Account
      </p>
      <option-field label="Delete account" description="this button will yeet your info into the abyss">
        <base-confirmation-dialog confirmation-text="Are you sure you wanna delete your account?" @confirm="deleteAccount()">
          <base-button red text="Delete Account" />
        </base-confirmation-dialog>
      </option-field>
      <p>
        Appearance & Aesthetics
      </p>
      <option-field label="Theme" description="Change the theme of the app">
        <base-dropdown v-model="state.settings.general.theme" stay-open :options="['dark', 'nord', 'opera', 'galaxy']" />
      </option-field>
      <option-field label="Sound FX" description="Enables sound effects when hovering over buttons etc.">
        <base-switch v-model="state.settings.general.enable_sound_effects" />
      </option-field>
      <option-field label="Bloom Effects" description="Makes the network switch lights and activity lights bloom">
        <base-switch v-model="state.settings.general.enable_bloom" />
      </option-field>
      <option-field v-if="isElectron()" label="Rounded Window Corners" description="This makes the corners of the window rounded when not maximized">
        <base-switch v-model="state.settings.general.enable_rounded_corners" />
      </option-field>
      <option-field label="Use single color for switch lights" description="Sets all the switch lights to the gigabit color regardless of speed">
        <base-switch v-model="state.settings.general.use_single_color_for_switch_lights" />
      </option-field>
      <option-field v-if="isElectron()" description="Adjust the window's opacity" label="Background Opacity">
        <div class="flex gap-2 items-center">
          <base-range-input v-model="state.settings.general.opacity" min="0" max="100" step="1" />
          {{ state.settings.general.opacity }}%
        </div>
      </option-field>

      <p>
        Behaviour
      </p>
      <option-field v-if="isElectron()" label="Discord Rich Presence" description="Show the current machine you're viewing on your Discord status">
        <base-switch v-model="state.settings.client.enable_rich_presence" />
      </option-field>
      <option-field label="Sync on startup (client only)" description="Synchronize your settings with the backend when opening the client">
        <base-switch v-model="state.settings.client.enable_autosync" />
      </option-field>
      <option-field label="Status Bar" description="Show the debug status bar at the bottom">
        <base-switch v-model="state.settings.general.enable_status_bar" />
      </option-field>

      <p>
        Machine List
      </p>
      <option-field label="Show Offline Machines" description="Show offline machines on the machine list">
        <base-switch v-model="state.settings.general.show_offline_machines" />
      </option-field>
      <option-field label="Show Total Machine Stats" description="Show sum stats of all machines on the machine list ">
        <base-switch v-model="state.settings.general.enable_totals" />
      </option-field>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseConfirmationDialog from "/@/components/base/BaseConfirmationDialog.vue";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import BaseRangeInput from "/@/components/base/BaseRangeInput.vue";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import OptionField from "/@/components/OptionField.vue";
import TopBar from "/@/components/TopBar.vue";
import { isElectron, logout } from "/@/services/logic";
const state = useState();
const deleteAccount = () => state.users.deleteAccount().then(() => logout());
</script>

<style scoped lang="postcss">

.optionList {
  @apply  h-full text-left flexcol items-center w-full max-w-224 gap-2 text-12px text-text px-8;
  & p {
    @apply text-xl w-full pt-16;
  }
}
</style>
