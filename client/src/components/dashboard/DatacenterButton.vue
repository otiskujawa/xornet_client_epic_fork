<template>
  <router-link v-if="!addButton" class="datacenter" :to="{name: 'datacenters', params: {name: datacenter.name}}">
    <div class="heading">
      <Icon icon="datacenter"/>
      <h1>{{datacenter.name}}</h1>
    </div>
    <img class="logo" :src="datacenter.logo || require('@/assets/icons/filled/stack.svg')" :alt="datacenter.name">
    <div class="heading">
    </div>
  </router-link>
  <div v-else class="datacenter">
    <div class="heading">
      <Icon icon="add"/>
      <h1>Create new</h1>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import DatacenterButton from "@/components/dashboard/DatacenterButton";

export default {
  name: "DatacenterButton",
  components: {
    Icon,
  },
  props: {
    datacenter: {type: Object, required: true},
    addButton: {type: Boolean, required: true},
  },
};
</script>

<style scoped>

.datacenter {
  width: 224px;
  height: 224px;
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
}

.datacenter:active {
  transform: translateY(1px);
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
