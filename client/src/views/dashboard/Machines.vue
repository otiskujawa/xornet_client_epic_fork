<template>
  <div class="machines flex flex-col gap-4 p-6 w-full h-100vh mb-128px">
    <div class="flex items-center gap-4">
      <h1 class="text-32px font-semibold text-white">Machines</h1>
      <input
        type="text"
        v-model="filter"
        placeholder="Filter machines"
        class="text-11px font-semibold placeholder-alpha-60 outline-none p-2 bg-gray-400 rounded-4px"
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
        <Tooltip text=">150ms Ping">
          <div class="filterButton" @click="tags.ping = !tags.ping" :class="{ enabled: tags.ping }">High Ping</div>
        </Tooltip>
        <Tooltip text="Host OS">
          <div class="filterButton" @click="tags.hypervisor = !tags.hypervisor" :class="{ enabled: tags.hypervisor }">Hypervisors</div>
        </Tooltip>
        <Tooltip text="Virtual Machines">
          <div class="filterButton" @click="tags.vm = !tags.vm" :class="{ enabled: tags.vm }">VMs</div>
        </Tooltip>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="tabs flex gap-4 justify-between md:justify-start">
        <router-link :to="{ name: 'machines', params: {view: 'all'}}">
          <Icon icon="view-all"/> All
        </router-link>
        <router-link :to="{ name: 'machines', params: {view: 'owned'}}">
          <Icon icon="crown"/> Your Machines
        </router-link >
        <router-link :to="{ name: 'machines', params: {view: 'shared'}}">
          <Icon icon="shared"/> Shared Machines
        </router-link>
        <router-link :to="{ name: 'machines', params: {view: 'offline'}}">
          <Icon icon="dead"/> Offline
        </router-link>
      </div>
      <div class="w-full h-1px bg-gray-500"></div>
    </div>
    <ServerList :machines="taggedMachines" />
  </div>
</template>

<script>
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Chart from "@/components/dashboard/Chart";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Icon from "@/components/misc/Icon";
import Nav from "@/components/dashboard/Nav";
import Tooltip from "@/components/dashboard/Tooltip";
import { appState } from "@/states/appState";
export default {
  name: "Machines",
  components: {
    Terminal,
    Nav,
    Header,
    Icon,
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
        network: false,
        ping: false,
        hypervisor: false,
        vm: false,
      },
      machines: appState.getMachines(),
      downloadGraph: [],
      filter: "",
      uploadGraph: [],
      labels: [],
      me: appState.getMe(),
      activeTab: "all",
    };
  },
  computed: {
    taggedMachines() {
      if (!Object.values(this.tags).some(tag => tag == true)) return this.machineArray;
      // Im sure theres a way better way of writting this
      // Take it uppon yourself to improve it
      return this.machineArray.filter(machine => {
        if (this.tags.windows && machine.platform == "win32") return machine;
        if (this.tags.linux && machine.platform == "linux") return machine;
        if (this.tags.macos && machine.platform == "darwin") return machine;
        if (this.tags.cpu && machine.cpu >= 50) return machine;
        if (this.tags.ram && 100 - (100 * machine.ram.used) / machine.ram.total < 30) return machine;
        if (this.tags.network && machine.network.TxSec + machine.network.RxSec > 100) return machine;
        if (this.tags.ping && machine.ping > 150) return machine;
        if (this.tags.hypervisor && !machine.isVirtual) return machine;
        if (this.tags.vm && machine.isVirtual) return machine;
      });
    },
    machineArray() {
      let allMachines = Array.from(this.machines.values());
      allMachines = this.filter !== ""
        ? allMachines.filter(machine => machine.hostname.toLowerCase().includes(this.filter.toLowerCase()))
        : allMachines;
      if (this.activeTab === 'owned') allMachines = allMachines.filter(machine => machine.owner.username === this.me.username);
      if (this.activeTab === 'shared') allMachines = allMachines.filter(machine => machine.owner.username !== this.me.username);
      if (this.activeTab !== 'offline') return allMachines;
    },
    selectedMachine() {
      return this.$route.params.machine;
    },
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
    $route(to, from) {
      if (to.params.view) this.activeTab = to.params.view;
    },
    selectedMachine: async function() {
      if (this.selectedMachine) this.getNetwork();
    }
  },
  async mounted() {
    if (this.$route.query.newMachine) {
      this.api.user.addMachine(this.$route.query.newMachine);
    }
    if (this.selectedMachine) this.getNetwork();
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
  @apply bg-tertiary-100 border border-tertiary-300 text-tertiary-400;
}
.tabs {
  font-family: 'Work Sans';
}
.tabs a{
  transition: 100ms ease;
  @apply opacity-50 select-none border-gray-500 text-11px font-semibold flex gap-2 pb-2 z-10 items-center px-1 whitespace-nowrap outline-none;
}
.tabs a:hover {
  @apply opacity-75;
}
.tabs a.router-link-active {
  @apply opacity-100 border-b-2 border-b-secondary-400 ;
}

.tabs a .icon {
  @apply w-5;
}

</style>
