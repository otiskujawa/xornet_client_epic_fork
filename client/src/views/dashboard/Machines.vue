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
        <Tag icon="windows" tag="Windows"         title="Windows Machines"  :enabled="tags.windows"     @click="tags.windows    = !tags.windows"    />
        <Tag icon="linux"   tag="Linux"           title="Linux Machines"    :enabled="tags.linux"       @click="tags.linux      = !tags.linux"      />
        <Tag icon="macos"   tag="MacOS"           title="Darwin Machines"   :enabled="tags.macos"       @click="tags.macos      = !tags.macos"      />
        <Tag icon="cpu"     tag="High CPU Usage"  title=">50% CPU"          :enabled="tags.cpu"         @click="tags.cpu        = !tags.cpu"        />
        <Tag icon="ram"     tag="High RAM Usage"  title=">70% RAM"          :enabled="tags.ram"         @click="tags.ram        = !tags.ram"        />
        <Tag icon="network" tag="High Network"    title=">100Mbps Traffic"  :enabled="tags.network"     @click="tags.network    = !tags.network"    />
        <Tag icon="rj45"    tag="High Ping"       title=">150ms Ping"       :enabled="tags.ping"        @click="tags.ping       = !tags.ping"       />
        <Tag icon="master"  tag="Hypervisors"     title="Host OS"           :enabled="tags.hypervisor"  @click="tags.hypervisor = !tags.hypervisor" />
        <Tag icon="slave"   tag="VMs"             title="Virtual Machines"  :enabled="tags.vm"          @click="tags.vm         = !tags.vm"         />
      </div>
    </div>
    <Tabs
      :currentRoute="$route.name"
      :routes="['all', 'owned', 'shared', 'offline']"
      :titles="['All', 'Your Machines', 'Shared Machines', 'Offline']"
      :icons="['view-all', 'crown', 'shared', 'dead']"
    />
    <ServerList :machines="taggedMachines" />
  </div>
</template>

<script>
import ServerList from "@/components/dashboard/ServerList";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import Terminal from "@/components/dashboard/Terminal";
import Header from "@/components/dashboard/Header";
import Nav from "@/components/dashboard/Nav";
import Tabs from "@/components/dashboard/Tabs";
import Tag from "@/components/library/Tag.vue";
import { appState } from "@/states/appState";
export default {
  name: "Machines",
  components: {
    Terminal,
    Tabs,
    Nav,
    Header,
    LoadingScreen,
    ServerList,
    Tag
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
        vm: false
      },
      machines: appState.getMachines(),
      downloadGraph: [],
      filter: "",
      uploadGraph: [],
      labels: [],
      me: appState.getMe(),
      activeTab: this.$route.params.view || "all"
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
      allMachines =
        this.filter !== ""
          ? allMachines.filter(machine => machine.hostname.toLowerCase().includes(this.filter.toLowerCase()))
          : allMachines;
      if (this.activeTab === "owned") allMachines = allMachines.filter(machine => machine.owner.username === this.me.username);
      if (this.activeTab === "shared") allMachines = allMachines.filter(machine => machine.owner.username !== this.me.username);
      if (this.activeTab !== "offline") return allMachines;
    },
    selectedMachine() {
      return this.$route.params.machine;
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
.tabs {
  font-family: "Work Sans";
}
.tabs a {
  transition: 100ms ease;
  @apply opacity-50 select-none border-gray-500 text-11px font-semibold flex gap-2 pb-2 z-10 items-center px-1 whitespace-nowrap outline-none;
}
.tabs a:hover {
  @apply opacity-75;
}
.tabs a.router-link-active {
  @apply opacity-100 border-b-2 border-b-secondary-400;
}

.tabs a .icon {
  @apply w-5;
}
</style>
