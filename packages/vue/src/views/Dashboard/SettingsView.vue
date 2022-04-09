<template>
  <div class="w-full h-full overflow-y-scroll items-center flexcol bg-black bg-opacity-25">
    <top-bar />
    <div class="optionList flexcol ">
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
      <option-field label="Use single color for switch lights" description="Sets all the switch lights to the gigabit color regardless of speed">
        <base-switch v-model="state.settings.general.use_single_color_for_switch_lights" />
      </option-field>
      <option-field new-feature label="Minimum Blink Speed" description="Change the minimum transfer speed (in Mbps) for a interface light to blink">
        <base-input v-model="state.settings.general.minimum_blink_speed" placeholder="0.001, 0.01" class="text-white w-32" />
        <template #example>
          <div class="flex gap-2 justify-between">
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'b', s: 100, rx: 0, tx: 10000 }" />
              <p>0.001 Mbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'b', s: 100, rx: 0, tx: 100000 }" />
              <p>0.01 Mbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'c', s: 100, rx: 0, tx: 1000000 }" />
              <p>1 Mbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'd', s: 100, rx: 0, tx: 10000000 }" />
              <p>10 Mbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'e', s: 100, rx: 0, tx: 100000000 }" />
              <p>100 Mbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'f', s: 1000, rx: 0, tx: 1000000000 }" />
              <p>1 Gbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'g', s: 10000, rx: 0, tx: 10000000000 }" />
              <p>10 Gbps</p>
            </div>
            <div class="exampleNic flexcol">
              <network-interface :iface="{ n: 'g', s: 100000, rx: 0, tx: 100000000000 }" />
              <p>100 Gbps</p>
            </div>
          </div>
        </template>
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

      <p>
        Machine List
      </p>
      <option-field label="Show Offline Machines" description="Show offline machines on the machine list">
        <base-switch v-model="state.settings.general.show_offline_machines" />
      </option-field>
      <option-field label="Show Network Chart" description="Show sum transmit of physical interfaces on the machine list (laggy)">
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
import BaseInput from "/@/components/base/BaseInput.vue";
import NetworkInterface from "/@/components/NetworkInterface.vue";
const state = useState();
const deleteAccount = () => state.users.deleteAccount().then(() => logout());
</script>

<style scoped lang="postcss">

.optionList {
  @apply h-full text-left gap-4 items-center w-full max-w-224 gap-2 text-12px text-text px-8;
  & > p {
    @apply text-xl w-full pt-16;
  }
}

.exampleNic {
  @apply bg-background-400 w-full whitespace-nowrap font-light gap-4 items-center justify-center overflow-hidden p-4 rounded-8px;
  & > p {
    @apply text-white text-center text-xs text-opacity-50;
  }
}
</style>
