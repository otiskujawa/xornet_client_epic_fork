
<template>
  <p>
    Appearance & Aesthetics
  </p>
  <option-field label="Theme" description="Change the theme of the app">
    <base-dropdown v-model="state.settings.general.theme" stay-open :options="['dark', 'nord', 'opera', 'galaxy']" />
  </option-field>
  <option-field label="Bloom Effects" description="Makes the network switch lights and activity lights bloom">
    <base-switch v-model="state.settings.general.enable_bloom" />
  </option-field>

  <option-field label="Rounded Network Interfaces" description="Makes the corners of network interfaces rounded">
    <base-switch v-model="state.settings.general.rounded_network_interfaces" />
  </option-field>

  <option-field label="Filled Network Interfaces" description="Makes the network interfaces be filled with color instead of a border">
    <base-switch v-model="state.settings.general.filled_network_interfaces" />
  </option-field>

  <option-field label="Use single color for switch lights" description="Sets all the switch lights to the gigabit color regardless of speed">
    <base-switch v-model="state.settings.general.use_single_color_for_switch_lights" />
  </option-field>
  <option-field new-feature label="Minimum Blink Speed" description="Change the minimum transfer speed (in Mbps) for a interface light to blink">
    <base-input v-model="state.settings.general.minimum_blink_speed" placeholder="Mbps" class="text-white w-32" />
    <template #example>
      <div class="flex gap-2 justify-between">
        <div class="exampleNic flexcol">
          <network-interface :iface="{ n: 'b', s: 100, rx: 0, tx: 10000 }" />
          <p>0.01 Mbps</p>
        </div>
        <div class="exampleNic flexcol">
          <network-interface :iface="{ n: 'c', s: 100, rx: 0, tx: 100000 }" />
          <p>0.1 Mbps</p>
        </div>
        <div class="exampleNic flexcol">
          <network-interface :iface="{ n: 'd', s: 100, rx: 0, tx: 1000000 }" />
          <p>1 Mbps</p>
        </div>
        <div class="exampleNic flexcol">
          <network-interface :iface="{ n: 'e', s: 100, rx: 0, tx: 10000000 }" />
          <p>10 Mbps</p>
        </div>
        <div class="exampleNic flexcol">
          <network-interface :iface="{ n: 'f', s: 100, rx: 0, tx: 100000000 }" />
          <p>100 Mbps</p>
        </div>
        <div class="exampleNic flexcol">
          <network-interface :iface="{ n: 'g', s: 1000, rx: 0, tx: 1000000000 }" />
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
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import BaseInput from "/@/components/base/BaseInput.vue";
import BaseRangeInput from "/@/components/base/BaseRangeInput.vue";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import NetworkInterface from "/@/components/NetworkInterface.vue";
import OptionField from "/@/components/OptionField.vue";
import { isElectron } from "/@/services/logic";
const state = useState();
</script>
