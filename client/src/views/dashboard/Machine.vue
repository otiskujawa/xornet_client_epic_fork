<template>
  <div v-if="machine" class="machine p-2 w-full h-full flex flex-col gap-4">
    <div class="heading flex gap-4 items-center">
      <Icon class="w-32px" :icon="type" v-if="!machine.rogue && Date.now() < machine.timestamp + 15000"/>
      <h1 class="text-2xl font-bold">{{machine.hostname}}</h1>
      <img class="w-32px" :src="machine.geolocation?.countryCode ? require(`@/assets/flags/${machine.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" />
      <div class="flex gap-2 items-center">
        <ShadowButton icon="restart"/>
        <ShadowButton icon="shutdown"/>
        <ShadowButton icon="trash"/>
        <router-link :to="{ name: 'specs', params: { machine: machine.uuid } }">
          <ShadowButton title="details" icon="details"/>  
        </router-link>
      </div>
    </div>
    <div class="flex gap-2 flex-col">
      <InfoField borderless icon="cpu" title="CPU Usage" color="#8676FF" suffix="%" :value="machine.cpu" />
      <InfoField borderless icon="network" title="Ping" color="#516DFF" suffix="ms" :value="machine.ping" />
      <InfoField borderless icon="ram" title="Total RAM Usage" color="#32B5FF" suffix="GB" :value="machine.ram.used" :maxValue="machine.ram.total" />
      <InfoField borderless icon="rj45" title="Upload Bandiwdth" color="#4ADEFF" suffix="Mbps" :value="`${machine.network.TxSec}/${machine.network.RxSec}`"/>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import ShadowButton from "@/components/dashboard/ShadowButton";
import socket from "@/services/socket.js";
import InfoField from "@/components/dashboard/InfoField";

export default {
  name: "Machine",
  data(){
    return {
      machine: null,
    }
  },
  components: {
    ShadowButton,
    Icon,
    InfoField,
  },
  async created() {
    socket.off("machines");
    socket.on("machines", machines => {
      this.machine = Object.values(machines).filter(machine => machine.uuid == this.$route.params.machine)[0];
    });
    socket.emit('getMachines');

    this.processes = await this.api.machine.getProcesses(this.$route.params.machine);
  },
  data: () => {
    return {
      processes: null,
    }
  },
  computed: {
    type: function() {
      return this.machine.isVirtual ? "slave" : "master";
    }
  },
};
</script>

<style>

</style>