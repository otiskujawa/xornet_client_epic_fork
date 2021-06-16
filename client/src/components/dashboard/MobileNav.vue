<template>
  <nav class="buttons">
    <div class="top">
      <SquareButton icon="user" :to="{ name: 'profile', params: { username } }" />
      <!-- <SquareButton icon="dashboard" :to="{ name: 'summary' }" /> -->
      <SquareButton icon="stack" :to="{ name: 'machines' }" />
      <SquareButton icon="datacenter" :to="{ name: 'datacenters' }" />
      <!-- <SquareButton icon="network" :to="{ name: 'network' }" /> -->
      <SquareButton icon="clipboard" :to="{ name: 'logs' }" />
      <SquareButton class="settings" icon="settings" :to="{ name: 'settings' }" />
    </div>
  </nav>
</template>

<script>
import SquareButton from "@/components/dashboard/SquareButton";

export default {
  name: "MobileNav",
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
  height: 48px;
  width: 100%;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

nav .top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 48px;
}
</style>
