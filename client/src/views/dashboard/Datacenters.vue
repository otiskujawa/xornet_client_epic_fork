<template>
  <div class="datacenters">
    <div class="datacenter">
      <div class="heading">
        <Icon icon="datacenter"/>
        <h1>Xornet</h1>
      </div>
    </div>
    <div class="datacenter">
      <div class="heading">
        <h1>Create new</h1>
      </div>
      <Icon icon="add"/>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";

export default {
  name: "Datacenter",
  components: {
    Icon
  },
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
  border: var(--dark-lighter) 2px solid;
  border-radius: 8px;
  background-color: var(--dark-light);
  cursor: pointer;
  padding: 8px;
  transition: 100ms ease;
}

.datacenter:hover {
  background-color: var(--dark-lighter);
  border: var(--border-color) 2px solid;
}

.datacenter img {
  filter: invert(var(--filter));
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
  font-size: 14px;
  font-weight: 600;
}
</style>
