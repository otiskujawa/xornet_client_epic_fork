<template>
  <div class="machines flex flex-col gap-4 p-6 w-full h-100vh mb-128px">
    <div class="heading flex items-center gap-4">
      <h1 class="text-32px font-semibold">Machines</h1>
      <input
        type="text"
        v-model="filter"
        placeholder="Filter machines"
        class="text-11px font-semibold placeholder-alpha-50 outline-none p-2 bg-gray-500 rounded-4px"
      />
      <div class="buttons flex gap-2">
        <Tooltip text="Windows Machines">
          <div class="filterButton" @click="tags.windows = !tags.windows" :class="{ enabled: tags.windows }">Windows</div>
        </Tooltip>
        <Tooltip text="Linux Machines">
          <div class="filterButton" @click="tags.linux = !tags.linux" :class="{ enabled: tags.linux }">Linux</div>
        </Tooltip>
        <Tooltip text="Darwin Machines">
          <div class="filterButton" @click="tags.macos = !tags.macos" :class="{ enabled: tags.macos }">MacOS</div>
        </Tooltip>
        <Tooltip text=">50% CPU">
          <div class="filterButton" @click="tags.cpu = !tags.cpu" :class="{ enabled: tags.cpu }">High CPU Usage</div>
        </Tooltip>
        <Tooltip text=">70% RAM">
          <div class="filterButton" @click="tags.ram = !tags.ram" :class="{ enabled: tags.ram }">High RAM Usage</div>
        </Tooltip>
        <Tooltip text=">100Mbps Traffic">
          <div class="filterButton" @click="tags.network = !tags.network" :class="{ enabled: tags.network }">High Network</div>
        </Tooltip>
      </div>
    </div>
    <div class="w-full h-1px bg-gray-500"></div>
    <ServerList :machines="taggedMachines" />
    <!-- <div class="content">
      <div class="machines">

        <Chart
          v-if="uploadGraph.length != 0"
          :key="labels[2]"
          :identity="labels[2]"
          :type="'line'"
          :data="{
            labels: labels,
            datasets: [
              {
                label: 'Download',
                data: downloadGraph,
                borderColor: '#00c8ff',
                backgroundColor: '#52daffaa'
              }
            ]
          }"
        />
        <Chart
          v-if="uploadGraph.length != 0"
          :key="labels[2] + 'up'"
          :identity="labels[2] + 'up'"
          :type="'line'"
          :data="{
            labels: labels,
            datasets: [
              {
                label: 'Upload',
                data: uploadGraph,
                borderColor: '#ff0062',
                backgroundColor: '#ff458caa'
              }
            ]
          }"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
import socket from "@/services/socket.js";
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Chart from "@/components/dashboard/Chart";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Nav from "@/components/dashboard/Nav";
import Tooltip from "@/components/dashboard/Tooltip";
export default {
  name: "Machines",
  components: {
    Terminal,
    Nav,
    Header,
    Chart,
    LoadingScreen,
    Tooltip,
    ServerList
  },
  data() {
    return {
      tags: {
        windows: false,
        linux: false,
        macos: false,
        cpu: false,
        ram: false,
        network: false
      },
      machines: new Map(),
      downloadGraph: [],
      uploadGraph: [],
      labels: []
    };
  },
  computed: {
    taggedMachines() {
      if (!Object.values(this.tags).some(tag => tag == true)) return Array.from(this.machines.values());
      return Array.from(this.machines.values()).filter(machine => {
        if (this.tags.windows && machine.platform == "win32") return machine;
        if (this.tags.linux && machine.platform == "linux") return machine;
        if (this.tags.macos && machine.platform == "darwin") return machine;
        if (this.tags.cpu && machine.cpu >= 50) return machine;
        if (this.tags.ram && 100 - (100 * machine.ram.used) / machine.ram.total < 30) return machine;
        if (this.tags.network && machine.network.TxSec + machine.network.RxSec > 100) return machine;
        // else return machine;
      });
    },
    selectedMachine() {
      return this.$route.params.machine;
    },
    machineArray() {
      return Array.from(this.machines.values());
    }
  },
  methods: {
    async getNetwork() {
      const networkData = await this.api.machine.getNetwork(this.selectedMachine);
      this.downloadGraph = networkData.map(entity => entity.network.RxSec);
      this.uploadGraph = networkData.map(entity => entity.network.TxSec);
      this.labels = networkData.map(entity => {
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);
        return `${hour}:${minute}:${second}`;
      });
    }
  },
  watch: {
    selectedMachine: async function() {
      if (this.selectedMachine) this.getNetwork();
    }
  },
  async mounted() {
    if (this.$route.query.newMachine) {
      this.api.user.addMachine(this.$route.query.newMachine);
    }

    if (this.selectedMachine) this.getNetwork();

    socket.off("machines");
    socket.on("machines", machines => {
      console.log(
        `%c[WS]` + `%c [Machines]`,
        "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;",
        "color: #ff77aa;",
        machines
      );

      Object.values(machines).forEach(machine => (machine.uuid ? this.machines.set(machine.uuid, machine) : null));

      // this.labels.push(`${new Date().getHours()}:${new Date().getMinutes()}`);
    });
    socket.emit("getMachines");
  }
};
</script>

<style lang="postcss" scoped>
.filterButton {
  @apply cursor-pointer 
  select-none 
  text-11px 
  font-semibold 
  rounded-full 
  whitespace-nowrap 
  bg-gray-500 
  px-2 
  py-1.5
  border 
  border-gray-600 
  text-gray-600 
  hover:border-white 
  hover:text-white;
}

.filterButton.enabled {
  @apply bg-primary-100 border border-primary-300 text-primary-400;
}
</style>
