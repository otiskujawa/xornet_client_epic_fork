<template>
  <div class="datacenters">
    <div class="datacenter" v-for="datacenter of datacenters" :key="datacenter">
      <div class="heading">
        <Icon icon="datacenter"/>
        <h1>{{datacenter.name}}</h1>
      </div>
      <img class="logo" :src="datacenter.logo" :alt="datacenter.name">
      <div class="heading">
      </div>
    </div>
    <div class="datacenter" @click="isAddingNew = !isAddingNew">
      <div class="heading">
        <Icon icon="add"/>
        <h1>Create new</h1>
      </div>
    </div>
    <DatacenterCard v-if="isAddingNew"/>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import DatacenterCard from "@/components/misc/DatacenterCard";

export default {
  name: "Datacenter",
  components: {
    Icon,
    DatacenterCard
  },
  data() {
    return {
      datacenters: [],
      isAddingNew: false,
    };
  },
  async mounted() {
    this.datacenters = await this.api.datacenters.fetchAll();
  }
};
</script>

<style scoped>

.datacenters {
  padding: 8px;
  display: flex;
  gap: 8px;
}

.datacenter {
  width: 224px;
  height: 224px;
  border: var(--border-color) 2px solid;
  border-radius: 8px;
  background-color: var(--background-color);
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: 100ms ease;
}

.datacenter:hover {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
}

.datacenter img {
  filter: invert(var(--filter));
  }

.datacenter .logo {
  max-width: 80%;
}

.datacenter .heading  {
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
}
</style>
