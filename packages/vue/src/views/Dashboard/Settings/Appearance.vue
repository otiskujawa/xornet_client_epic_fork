
<template>
  <p>
    Appearance & Aesthetics
  </p>
  <option-field label="Theme" description="Change the theme of the app">
    <base-dropdown v-model="state.settings.general.theme" stay-open :options="['dark', 'nord', 'opera', 'galaxy']" />
  </option-field>

  <option-field new-feature label="Label Scaling" description="Change how big the labels are">
    <input v-model="state.settings.general.label_scale" type="range" step="1" min="0" max="2">

    <template #example>
      <div class="flex gap-2 p-2 py-8 justify-center bg-background-200 bg-opacity-50 rounded-8px">
        <label-tag
          :label="{
            owner_uuid: '1',
            name: 'example-label',
            color: '#ff00b6',
            icon: 'computer',
            description: 'This is an example label'
          } as Label"
        />
        <label-tag
          :label="{
            owner_uuid: '1',
            name: 'example-label',
            color: '#ff00b6',
            icon: 'computer',
            description: 'This is an example label'
          } as Label"
        />
      </div>
    </template>
  </option-field>

  <option-field label="Dense machine list" description="Squishes the vertical spacing between each machine">
    <base-switch v-model="state.settings.general.compact_columns" />

    <template #example>
      <div class="flex gap-2 py-2 justify-between bg-background-200 bg-opacity-50 rounded-8px">
        <base-table>
          <template #rows>
            <tr
              v-for="machine of FAKE_MACHINES"
              :key="machine.hardware_uuid"
            >
              <th class="cursor-pointer hover:underline">
                <machine-stat :value="machine.name" dont-fade>
                  <distro-icon class="text-sm" :name="machine.os_name" />
                  <activity-status :status="machine.status" />
                </machine-stat>
              </th>
              <th>
                <machine-state :status="machine.status" />
              </th>
              <th>
                <network-switch :interfaces="machine.network" />
              </th>
            </tr>
          </template>
        </base-table>
      </div>
    </template>
  </option-field>

  <p>Network Interfaces</p>
  <option-field label="Bloom Effects" description="Makes the network switch lights and activity lights bloom">
    <base-switch v-model="state.settings.general.enable_bloom" />
  </option-field>
  <option-field label="Rounded Network Interfaces" description="Makes the corners of network interfaces rounded">
    <base-switch v-model="state.settings.general.rounded_network_interfaces" />
  </option-field>
  <option-field label="Filled Network Interfaces" description="Makes the network interfaces be filled with color instead of a border">
    <base-switch v-model="state.settings.general.filled_network_interfaces" />
  </option-field>
  <option-field label="Use new blink speed algorithm" description="This algorithm calculates the blink speed faster based on the traffic instead of using hard-stepped limits which may feel more natural (might have an impact on performance)">
    <base-switch v-model="state.settings.general.use_new_blink_algorithm" />
  </option-field>
  <option-field label="Use single color for switch lights" description="Sets all the switch lights to the gigabit color regardless of speed">
    <base-switch v-model="state.settings.general.use_single_color_for_network_interfaces" />
  </option-field>
  <option-field label="Minimum Blink Speed" description="Change the minimum transfer speed (in Mbps) for a interface light to blink">
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

  <p v-if="isElectron()">
    Window
  </p>
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
import BaseTable from "/@/components/base/BaseTable.vue";
import { MachineStatus } from "/@/types/api/machine";
import MachineStat from "/@/components/MachineStat.vue";
import ActivityStatus from "/@/components/ActivityStatus.vue";
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import MachineState from "/@/components/MachineState.vue";
import NetworkSwitch from "/@/components/NetworkSwitch.vue";
import LabelTag from "/@/components/tags/LabelTag.vue";
import { Label } from "/@/types/api/label";
const state = useState();

const DUMMY_INTERFACE = {
	n: "t",
	s: 1000,
	tx: 501205,
	rx: 29412,
};

const DUMMY_INTERFACE_OFFLINE = {
	n: "t",
	s: 1000,
	tx: 0,
	rx: 0,
};

const DUMMY_NETWORK_SWITCH_OFFLINE = [
	DUMMY_INTERFACE_OFFLINE,
	DUMMY_INTERFACE_OFFLINE,
	DUMMY_INTERFACE_OFFLINE,
	DUMMY_INTERFACE_OFFLINE,
	DUMMY_INTERFACE_OFFLINE,
];

const DUMMY_NETWORK_SWITCH = [
	DUMMY_INTERFACE,
	DUMMY_INTERFACE,
	DUMMY_INTERFACE,
	DUMMY_INTERFACE,
	DUMMY_INTERFACE,
];

const FAKE_MACHINES = [{
	hardware_uuid: "1",
	name: "xornet-kumitsu",
	os_name: "garuda",
	status: MachineStatus.Online,
	network: DUMMY_NETWORK_SWITCH,
},
{
	hardware_uuid: "2",
	name: "xornet-harukame",
	os_name: "debian",
	status: MachineStatus.Desync,
	network: DUMMY_NETWORK_SWITCH,
},
{
	hardware_uuid: "3",
	name: "xornet-yoimitsu",
	os_name: "debian",
	status: MachineStatus.Desync,
	network: DUMMY_NETWORK_SWITCH,
},
{
	hardware_uuid: "4",
	name: "xornet-kannata",
	os_name: "debian",
	status: MachineStatus.Offline,
	network: DUMMY_NETWORK_SWITCH_OFFLINE,
},
{
	hardware_uuid: "5",
	name: "xornet-tokyo",
	os_name: "alpine",
	status: MachineStatus.Offline,
	network: DUMMY_NETWORK_SWITCH_OFFLINE,
},

];

</script>
