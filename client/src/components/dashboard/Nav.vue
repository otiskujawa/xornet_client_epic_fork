<template>
  <nav class="buttons">
    <div class="top">
      <SquareButton icon="user" :to="{ name: 'profile', params: { username } }" />
      <SquareButton icon="dashboard" :to="{ name: 'summary' }" />
      <SquareButton icon="stack" :to="{ name: 'machines' }" />
      <SquareButton icon="datacenter" :to="{ name: 'datacenters' }" />
      <SquareButton icon="network" :to="{ name: 'network' }" />
      <SquareButton icon="clipboard" :to="{ name: 'logs' }" />
    </div>
    <SquareButton class="settings" icon="settings" :to="{ name: 'settings' }" />
  </nav>
</template>

<script>
import SquareButton from "@/components/dashboard/SquareButton";

export default {
  name: "Nav",
  components: {
    SquareButton
  },
  computed: {
    username: function() {
      return localStorage.getItem("username");
    }
  }
};
</script>

<style scoped>
nav {
  height: calc(100vh - 48px);
  width: 48px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
</style>
