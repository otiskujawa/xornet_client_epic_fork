<template>
  <nav class="buttons">
    <SquareButton icon="user" :to="{ name: 'profile', params: { username } }" />
    <SquareButton icon="dashboard" :to="{ name: 'summary' }" />
    <SquareButton icon="stack" :to="{ name: 'machines' }" />
    <SquareButton icon="network" :to="{ name: 'network' }" />
    <SquareButton icon="clipboard" :to="{ name: 'logs' }" />
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
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
