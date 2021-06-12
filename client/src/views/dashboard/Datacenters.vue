<template>
  <div class="datacenters">
    <DatacenterButton class="datacenter" :datacenter="datacenter" v-for="datacenter of datacenters" :key="datacenter" />
    <DatacenterButton :addButton="true" @click="isAddingNew = !isAddingNew"/>
    <DatacenterCard v-if="isAddingNew"/>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import DatacenterCard from "@/components/misc/DatacenterCard";
import DatacenterButton from "@/components/dashboard/DatacenterButton";

export default {
  name: "Datacenters",
  components: {
    Icon,
    DatacenterButton,
    DatacenterCard,
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

</style>
