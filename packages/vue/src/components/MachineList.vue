<template>
  <div class="flex w-full h-full">
    <div class="flexcol h-full" :class="isViewingMachine ? ' w-min' : 'w-full'">
      <machine-list-totals v-if="state.settings.general.enable_totals" :machines="machines" />
      <div class="overflow-hidden overflow-y-scroll ">
        <base-table>
          <template v-if="!isViewingMachine" #headers>
            <template v-for="column of Object.keys(columns)" :key="column">
              <base-table-header v-if="(columns as any)[column]" :class="sortByKey === column && 'active'" :text="column" @click="sortBy(column)" />
            </template>
          </template>
          <template #rows>
            <tr
              v-for="machine of machines"
              :key="machine.hardware_uuid"
              @click="router.push({name: 'machine', params: {uuid: machine.uuid}})"
              @mouseenter="soundManager.playHover()"
            >
              <th v-if="columns.hostname">
                <machine-stat :value="machine.name" dont-fade>
                  <distro-icon class="text-sm" :name="machine.os_name?.replace(/'/g, '')" />
                  <activity-status :machine="machine" />
                </machine-stat>
              </th>
              <th v-if="columns.cau && !isViewingMachine">
                <machine-stat :value="machine.cau?.toFixed(2)" suffix="%">
                  <i-fluency-processor />
                </machine-stat>
              </th>
              <th v-if="columns.cas && !isViewingMachine">
                <machine-stat :value="machine.cas?.toFixed(2)" suffix="MHz">
                  <i-fluency-speedometer />
                </machine-stat>
              </th>
              <th v-if="columns.ram_usage && !isViewingMachine">
                <machine-stat :value="machine.ram_used_gb ? `${machine.ram_used_gb?.toFixed(2)} / ${machine.ram_total_gb?.toFixed(2)}` : undefined" suffix="GB">
                  <i-fluency-memory />
                </machine-stat>
              </th>
              <th v-if="columns.gpu_usage && !isViewingMachine">
                <machine-stat :value="machine.gpu?.gpu_usage" suffix="%">
                  <i-fluency-video-card />
                </machine-stat>
              </th>
              <th v-if="columns.gpu_power_usage && !isViewingMachine">
                <machine-stat :value="machine.gpu?.power_usage" suffix="mW">
                  <i-fluency-lightning-bolt />
                </machine-stat>
              </th>
              <th v-if="columns.network_switch && !isViewingMachine">
                <network-switch v-if="machine.network" :interfaces="machine.network" />
              </th>
              <th v-if="columns.td && !isViewingMachine">
                <machine-stat :value="machine.td?.toFixed(2)" suffix="Mbps">
                  <i-fluency-down />
                </machine-stat>
              </th>
              <th v-if="columns.tu && !isViewingMachine">
                <machine-stat :value="machine.tu?.toFixed(2)" suffix="Mbps">
                  <i-fluency-up />
                </machine-stat>
              </th>
              <th v-if="columns.temperature && !isViewingMachine">
                <machine-stat :value="machine.temps?.[0].value?.toFixed(2)" suffix="°C">
                  <i-fluency-temperature />
                </machine-stat>
              </th>
              <th v-if="columns.country && !isViewingMachine">
                <img v-if="machine.country" class="h-4 rounded-2px" :src="`https://cdn.ipwhois.io/flags/${machine.country.toLowerCase()}.svg`" :alt="machine.country">
                <machine-stat v-else>
                  <i-fluency-country />
                </machine-stat>
              </th>
              <th v-if="columns.public_ip && !isViewingMachine">
                <machine-stat :value="machine.public_ip">
                  <i-fluency-ipv6 />
                </machine-stat>
              </th>
              <th v-if="columns.process_count && !isViewingMachine">
                <machine-stat :value="machine.process_count">
                  <i-fluency-processes />
                </machine-stat>
              </th>
              <th v-if="columns.host_uptime && !isViewingMachine">
                <machine-stat :value="formatEpoch(machine.host_uptime)">
                  <i-fluency-clock />
                </machine-stat>
              </th>
              <th v-if="columns.reporter_uptime && !isViewingMachine">
                <machine-stat :value="formatEpoch(machine.reporter_uptime)">
                  <i-fluency-clock />
                </machine-stat>
              </th>
              <th v-if="columns.reporter_version && !isViewingMachine">
                <machine-stat :value="`v${machine.reporter_version}`">
                  <i-fluency-upgrade />
                </machine-stat>
              </th>
              <th v-if="columns.owner && !isViewingMachine" @click.stop>
                <div class="flex items-center gap-3 max-w-32">
                  <avatar :user="machine.owner" class="w-16px" />
                  <p class="overflow-ellipsis overflow-hidden">
                    {{ machine.owner?.username }}
                  </p>
                </div>
              </th>
              <th v-if="columns.action && !isViewingMachine" @click.stop>
                <base-confirmation-dialog v-if="machine.owner_uuid === state.users.getMe().uuid" confirmation-text="Are you sure you want to delete this machine?" @confirm="state.machines.deleteMachine(machine.uuid)">
                  <i-fluency-trash />
                </base-confirmation-dialog>
              </th>
            </tr>
          </template>
        </base-table>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSoundManager, useState } from "/@/app";
import ActivityStatus from "/@/components/ActivityStatus.vue";
import BaseTable from "/@/components/base/BaseTable.vue";
import MachineStat from "/@/components/MachineStat.vue";
import NetworkSwitch from "/@/components/NetworkSwitch.vue";
import Avatar from "/@/components/user/Avatar.vue";
import BaseConfirmationDialog from "/@/components/base/BaseConfirmationDialog.vue";
import BaseTableHeader from "/@/components/base/BaseTableHeader.vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";
import { detectBrowser, formatEpoch } from "../services/logic";
import DistroIcon from "./shared/DistroIcon.vue";
import MachineListTotals from "./MachineListTotals.vue";
const soundManager = useSoundManager();
const state = useState();
const router = useRouter();
const columns = computed(() => state.settings.columns);
const sortByKey = useLocalStorage("sortByKey", "hostname");
const sortBy = (field: string) => sortByKey.value = field;
const browser = detectBrowser();
const isViewingMachine = computed(() => router.currentRoute.value.name === "machine");

// This whole thing is fucked honestly
const machines = computed(() => state.machines.getAll()
// Compute a bunch of properties so we don't have to do it multiple times
	.map((machine) => {
		return ({
			...machine,
			ram_used_gb: ~~(machine.ram?.used || 0) / 1024 / 1024,
			ram_total_gb: ~~(machine.ram?.total || 0) / 1024 / 1024,
			temperature: machine.temps?.[0].value,
			owner: state.users.get(machine.owner_uuid),
		});
	})
// This is for the filter input so user's can quickly search through machines
	.filter(machine =>
		machine.name.toLowerCase().includes(state.machines.filterText.value.toLowerCase())
    || state.users.get(machine.owner_uuid).username.toLowerCase().includes(state.machines.filterText.value.toLowerCase()),
	)
// This is so you can hide offline machines
	.filter(machine => state.settings.general.show_offline_machines ? machine : machine.status === 2)
// This switch is what sorts the columns
	.sort((a, b) => {
		let comparison = false;

		switch (sortByKey.value) {
			case "hostname":
				comparison = (a.hostname?.toLowerCase() || "") > (b.hostname?.toLowerCase() || "");
				break;
			case "ram_usage":
				comparison = a.ram_used_gb / a.ram_total_gb < b.ram_used_gb / b.ram_total_gb;
				break;
			case "network_switch":
				comparison = (a.network?.length || "") < (b.network?.length || "");
				break;
			case "gpu_usage":
				comparison = (a.gpu?.gpu_usage || "") < (b.gpu?.gpu_usage || "");
				break;
			case "gpu_power_usage":
				comparison = (a.gpu?.power_usage || "") < (b.gpu?.power_usage || "");
				break;
			case "owner":
				comparison = (a.owner.username.toLowerCase() || "") > (b.owner.username.toLowerCase() || "");
				break;
			case "cau":
			case "cas":
			case "country":
			case "td":
			case "tu":
			case "temperature":
			case "public_ip":
			case "reporter_version":
			case "host_uptime":
			case "reporter_uptime":
			case "process_count":
				comparison = (a[sortByKey.value] || "") < (b[sortByKey.value] || "");
				break;
			default:
				comparison = (a.hostname?.toLowerCase() || "") > (b.hostname?.toLowerCase() || "");
				break;
		}

		// For some reason this ends up being reversed only
		// in firefox so this will do as a temp fix for now
		return browser === "firefox" ? comparison ? 1 : -1 : comparison ? -1 : 1;
	})
// This puts all the offline machines at the bottom
	.sort(a => a.status === 2 ? -1 : 1));

</script>

<style scoped>
th {
  @apply text-text text-opacity-50;
}
</style>
