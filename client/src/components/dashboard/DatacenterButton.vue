<template>
  <router-link v-if="!addButton" class="datacenter" :to="{ name: 'datacenters', params: { name: datacenter.name } }">
    <div class="heading">
      <Icon icon="datacenter" />
      <h1>{{ datacenter.name }}</h1>
    </div>
    <Icon v-if="!datacenter.logo" icon="datacenter" class="logo" />
    <img v-else class="logo" :src="datacenter.logo" :alt="datacenter.name" />
    <div class="footer">
      <h1 v-if="datacenter.owner === me._id" class="primary">Primary</h1>

      <!-- <ColoredGauge icon="stack" color="#00FF67" :value="machines.size || 0" :maxValue="stats.totalMachines" /> -->
      <!-- <ColoredGauge icon="network" color="#FFA800"  :value="datacenter.networkHealth || 0" :maxValue="100" /> -->
      <!-- <ColoredGauge icon="rj45" color="#00F0FF" :value="stats.currentBandwidth?.toFixed(2) || 0" /> -->
      <!-- <ColoredGauge icon="ram" color="#7000FF" :value="stats.ramUsage?.current?.toFixed(2) || 0" :maxValue="stats.ramUsage?.max?.toFixed(2)"/> -->
    </div>
  </router-link>
  <div v-else class="datacenter">
    <div class="heading">
      <Icon icon="add" />
      <h1>Create new</h1>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import DatacenterButton from "@/components/dashboard/DatacenterButton";
import ColoredGauge from "@/components/dashboard/ColoredGauge";
export default {
  name: "DatacenterButton",
  components: {
    Icon,
    ColoredGauge
  },
  props: {
    datacenter: { type: Object },
    addButton: { type: Boolean }
  },
  computed: {
    me: function() {
      return JSON.parse(localStorage.getItem("me"));
    }
  }
};
</script>

<style scoped>
.datacenter {
  aspect-ratio: 1;
  max-height: 256px;
  border-radius: 8px;
  background-color: var(--background-color);
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: 100ms ease;
  border: 1px solid var(--border-color);
}

.datacenter:hover {
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
  transform: translateY(-1px);
  border: 1px solid var(--theme-color);
}

.datacenter:active {
  transform: translateY(1px);
}

.datacenter img {
  filter: invert(var(--filter)) grayscale(1);
}

.datacenter .logo {
  max-width: 80%;
  max-height: 60%;
}

.datacenter .heading,
.datacenter .footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 24px;
  align-items: center;
}

.datacenter .heading img {
  filter: invert(var(--filter));
  width: 24px;
  height: 24px;
}

.datacenter .heading h1 {
  color: var(--black);
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
}

.primary {
  padding: 2px 6px;
  background-color: #8171ff44;
  border-radius: 167px;
  color: var(--theme-color) !important;
  border: 1px solid var(--theme-color);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 10px;
}
</style>
