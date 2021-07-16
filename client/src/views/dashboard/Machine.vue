<template>
  <div v-if="machine" class="machine p-2 md:p-6 w-full h-full flex-col flex gap-4">
    <div class="div flex gap-4 flex-col">
      <div class="heading flex gap-2 items-center ">
        <Icon class="w-32px" :icon="type" v-if="!machine.rogue && Date.now() < machine.timestamp + 15000" />
        <h1 class="text-32px font-semibold text-white">{{ machine.hostname }}</h1>
        <Flag class="mx-2 w-32px" :code="machine.geolocation?.countryCode" :name="machine.geolocation?.location" />
        <div class="flex gap-2 justify-between items-center">
          <div class="flex gap-2 items-center">
            <ShadowButton icon="clipboard" :title="machine.uuid" allowCopy />
          </div>

          <Tooltip v-if="me.machines.includes(machine.uuid)" text="Restart Machine">
            <ShadowButton icon="restart" @click="api.machine.restart(machine.uuid)" />
          </Tooltip>
          <Tooltip v-if="me.machines.includes(machine.uuid)" text="Shutdown Machine">
            <ShadowButton icon="shutdown" @click="api.machine.shutdown(machine.uuid)" />
          </Tooltip>
          <Tooltip text="Trash Machine">
            <ShadowButton icon="trash" @click="api.machine.delete(machine.uuid)" />
          </Tooltip>
          <Tooltip text="Create QR">
            <ShadowButton icon="qr" @click="qrDialogOpen = true" />
          </Tooltip>
          <Dialog v-model="qrDialogOpen">
            <QRDialog :name="$route.params.machine"></QRDialog>
          </Dialog>
        </div>
      </div>
      <Tabs :currentRoute="$route.name" 
      :routes="['dashboard', 'terminal', 'processes', 'stats', 'details']" 
      :titles="['Dashboard', 'Terminal', 'Processes', 'Statistics', 'Details']" 
      :icons="['dashboard', 'terminal', 'process-tree', 'bars', 'details']"
      :enabled="[true, details?.settings?.allowTerminal, true, false, true]" />
    </div>
    <!-- dashboard -->
    <div class="dashboard h-full gap-2 pt-2 md:gap-4 overflow-y-scroll overflow-x-hidden flex flex-col" v-if="$route.params.view == 'dashboard'">
      <fieldset class="flex gap-2 md:gap-4">
        <legend>Overview</legend>
        <InfoField borderless icon="cpu" title="Total CPU Usage" color="#8676FF" suffix="%" :value="machine.cpu" :tweened="~~cpu" />
        <InfoField borderless icon="ram" title="Total RAM Usage" color="#32B5FF" suffix="GB" :value="machine.ram.used" :tweened="ram.toFixed(2)" :maxValue="machine.ram.total" />
        <InfoField borderless icon="rj45" title="Total Network" color="#4ADEFF" suffix="Mbps" :value="machine.network.RxSec+machine.network.TxSec.toFixed(2)" :tweened="totalNetwork.toFixed(2)" />
        <InfoField borderless icon="network" title="Ping" color="#516DFF" suffix="ms" :value="machine.ping" :tweened="~~ping" />
        <!-- <CoreBars class="h-full w-full" :cores="machine.cores" /> -->
      </fieldset>

      <fieldset>
        <legend>CPUs</legend>
        <InfoField v-for="(core, index) of machine.cores" :key="index" borderless icon="cpu" :title="`#${index} Core`" color="#8676FF" suffix="%" :value="core.toFixed(2)"/>
      </fieldset>
  
      <fieldset v-for="(iface, index) of machine.network.interfaces" :key="index">
        <legend>#{{index}} Interface</legend>
        <InfoField borderless icon="download" title="Download" color="#4ADEFF" suffix="Mbps" :value="iface.rx_sec.toFixed(2)"/>
        <InfoField borderless icon="upload" title="Upload" color="#4ADEFF" suffix="Mbps" :value="iface.tx_sec.toFixed(2)" />
      </fieldset>
    </div>

    <!-- processes -->
    <div v-if="processes && $route.params.view == 'processes'" class="processList w-full h-full overflow-scroll ">
      <div class="ml-24px header px-1 py-0.5 flex items-center gap-2 justify-start">
        <h1 class="w-full max-w-48px" @click="sort('pid')">Pid</h1>
        <h1 class="w-full max-w-168px" @click="sort('name')">Name</h1>
        <h1 class="w-full max-w-64px" @click="sort('cpu')">Cpu</h1>
        <h1 class="w-full max-w-64px" @click="sort('memRss')">Mem</h1>
        <h1 class="w-full max-w-128px hidden md:inline" @click="sort('started')">Started</h1>
        <h1 class="w-full max-w-128px hidden md:inline" @click="sort('user')">User</h1>
      </div>
      <div
        class="
        process 
        cursor-pointer 
        border 
        rounded-4px 
        px-1 
        py-0.5 
        flex 
        items-center 
        whitespace-nowrap
        gap-2
        justify-start
        "
        v-for="process of processes"
        :key="process"
      >
        <Icon
          app
          class="taskIcon w-16px min-w-16px h-16px"
          :icon="
            process.name
              .split('.')
              .splice(process.name.split('.').length - 2, 1)
              .join('')
          "
          default="process"
        />
        <h1 class="w-full max-w-48px">{{ process.pid }}</h1>
        <h1 class="w-full max-w-168px">{{ process.name }}</h1>
        <h1 class="w-full max-w-64px">{{ process.cpus.toFixed(2) }}%</h1>
        <h1 class="w-full max-w-64px">{{ (process.memRss / 1000).toFixed(2) }}MB</h1>
        <h1 class="w-full max-w-128px hidden md:inline">{{ process.started }}</h1>
        <h1 class="w-full max-w-128px hidden md:inline">{{ process.user || "unknown" }}</h1>
        <!-- <ShadowButton tiny icon="trash"/> -->
      </div>
    </div>
    <!-- details -->
    <Details :machine="machine.uuid" v-if="$route.params.view == 'details'" />
    <div v-if="details?.settings?.allowTerminal">
      <Terminal v-if="$route.params.view == 'terminal'" class="w-full h-full" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/misc/Icon.vue";
import Flag from "@/components/dashboard/Flag.vue";
import ShadowButton from "@/components/dashboard/ShadowButton.vue";
import InfoField from "@/components/dashboard/InfoField.vue";
import Tabs from "@/components/dashboard/Tabs.vue";
import Tooltip from "@/components/dashboard/Tooltip.vue";
import Details from "@/components/dashboard/Details.vue";
import QRDialog from "@/components/dashboard/QRDialog.vue";
import Dialog from "@/components/library/Dialog.vue";
import { appState } from "@/states/appState";
import CoreBars from "@/components/dashboard/CoreBars.vue";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { computed } from "vue";
import { useAppParams } from "@/logic/routing";
import api from "@/services/api";
import { TransitionPresets, useTransition } from "@vueuse/core";
import { tweened } from "@/logic/tween";
import Terminal from "@/components/dashboard/Terminal";

const params = useAppParams();

const qrDialogOpen = ref(false);
// TODO: provide full typedefs
const processList = ref<
  {
    name: string;
  }[]
>([]);

const details = ref<
  {
    name: string;
  }
>();

const machine = computed(() => {
  return appState.getMachines().get(params.value.machine);
});

onMounted(async () => {
  processList.value = (await api.machine.getProcesses(params.value.machine)).list;
  details.value = (await api.machine.getMachineSpecs(params.value.machine));
});

const cpu = tweened(computed(() => machine.value?.cpu || 0));
const ping = tweened(computed(() => machine.value?.ping || 0));
const ram = tweened(computed(() => machine.value?.ram.used || 0));
const totalNetwork = tweened(computed(() => machine.value?.network.RxSec + machine.value?.network.TxSec || 0));

const processes = computed(() => {
  return processList.value.sort((a, b) => (a.name < b.name ? 1 : -1));
});
const type = computed(() => {
  return machine.value?.isVirtual ? "slave" : "master";
});
const me = computed(() => {
  return appState.getMe();
});

</script>

<style scoped lang="postcss">
.processList h1 {
  @apply text-sm overflow-ellipsis overflow-hidden;
  font-family: Work Sans, sans-serif;
  font-size: 11px;
}

.processList .header h1 {
  @apply uppercase font-medium;
}

.process {
  border: 1px solid var(--background-color);
}

.process:hover {
  border: 1px solid var(--white);
  background-color: var(--white);
}

fieldset {
  @apply grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 relative p-4 w-full border bg-gray-300 border-gray-400 rounded-8px;
}

legend {
  @apply absolute -top-2 left-4 text-11px font-bold
}

.dashboard::-webkit-scrollbar {
  display: none;
}
.dashboard {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

</style>
