<template>
  <div v-if="machine" class="machine overflow-scroll p-4 md:p-2 w-full h-full flex-col md:flex-row flex gap-4">
    <div class="div flex gap-4 flex-col">
      <div class="heading flex gap-4 items-center">
        <Icon class="w-32px" :icon="type" v-if="!machine.rogue && Date.now() < machine.timestamp + 15000" />
        <h1 class="text-2xl font-bold">{{ machine.hostname }}</h1>
        <img class="w-32px" :src="machine.geolocation?.countryCode ? require(`@/assets/flags/${machine.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" />
      </div>
      <div class="grid gap-2 grid-cols-2">
        <InfoField borderless icon="cpu" title="CPU Usage" color="#8676FF" suffix="%" :value="machine.cpu" />
        <InfoField borderless icon="network" title="Ping" color="#516DFF" suffix="ms" :value="machine.ping" />
        <InfoField borderless icon="ram" title="Total RAM Usage" color="#32B5FF" suffix="GB" :value="machine.ram.used" :maxValue="machine.ram.total" />
        <InfoField borderless icon="rj45" title="Upload Bandiwdth" color="#4ADEFF" suffix="Mbps" :value="(machine.network.TxSec + machine.network.RxSec).toFixed(2)" />
      </div>
      <div class="flex gap-2 justify-between items-center">
        <div class="flex gap-2 items-center">
          <router-link :to="{ name: 'specs', params: { machine: machine.uuid } }">
            <ShadowButton title="details" icon="details" />
          </router-link>
          <ShadowButton icon="clipboard" :title="machine.uuid" allowCopy />
        </div>

        <!-- <Tooltip flipped text="Restart Machine">
          <ShadowButton icon="restart"/>
        </Tooltip>
        <Tooltip flipped text="Shutdown Machine">
          <ShadowButton icon="shutdown"/>
        </Tooltip> -->
        <Tooltip flipped text="Trash Machine">
          <ShadowButton icon="trash" />
        </Tooltip>
      </div>
    </div>
    <div v-if="processes" class="processList w-full h-full overflow-scroll ">
      <div class="ml-24px header px-1 py-0.5 flex items-center gap-2 justify-start">
        <h1 class="w-full max-w-48px" @click="sort('pid')">Pid</h1>
        <h1 class="w-full max-w-168px" @click="sort('name')">Name</h1>
        <h1 class="w-full max-w-64px" @click="sort('cpu')">Cpu</h1>
        <h1 class="w-full max-w-64px" @click="sort('memRss')">Mem</h1>
        <h1 class="w-full max-w-256px hidden md:inline" @click="sort('started')">Started</h1>
        <h1 class="w-full max-w-128px hidden md:inline" @click="sort('user')">User</h1>
      </div>
      <div class="
        process 
        cursor-pointer 
        border 
        border-transparent 
        rounded-4px 
        px-1 
        py-0.5 
        flex 
        items-center 
        whitespace-nowrap
        gap-2
        justify-start
        " 
        v-for="process of processes" :key="process">
        <Icon
          app
          class="w-16px min-w-16px h-16px"
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
        <h1 class="w-full max-w-256px hidden md:inline">{{ process.started }}</h1>
        <h1 class="w-full max-w-128px hidden md:inline">{{ process.user || "unknown" }}</h1>
        <!-- <ShadowButton tiny icon="trash"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import ShadowButton from "@/components/dashboard/ShadowButton";
import socket from "@/services/socket.js";
import InfoField from "@/components/dashboard/InfoField";
import Tooltip from "@/components/dashboard/Tooltip";
export default {
  name: "Machine",
  data() {
    return {
      machine: null,
      processes: null
    };
  },
  components: {
    ShadowButton,
    Icon,
    InfoField,
    Tooltip
  },
  async created() {
    socket.off("machines");
    socket.on("machines", machines => {
      this.machine = Object.values(machines).filter(machine => machine.uuid == this.$route.params.machine)[0];
    });
    socket.emit("getMachines");

    this.processes = (await this.api.machine.getProcesses(this.$route.params.machine)).list.sort((a, b) => (a.name < b.name ? 1 : -1));
  },
  methods: {
    sort(by) {
      this.processes = this.processes.sort((a, b) => (a[by] < b[by] ? 1 : -1));
    }
  },
  computed: {
    type: function() {
      return this.machine.isVirtual ? "slave" : "master";
    }
  }
};
</script>

<style scoped lang="postcss">
.processList h1 {
  @apply text-sm overflow-ellipsis overflow-hidden text-left;
  font-family: Work Sans, sans-serif;
  font-size: 11px;
}

.processList .header h1 {
  @apply uppercase font-medium;
}

.process:hover {
  border: 1px solid var(--white);
  background-color: var(--white);
}
</style>
