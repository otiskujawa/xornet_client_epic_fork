<template>
  <div class="view home w-full h-full relative bg-dark-200">
    <Header />
    <Main />
  </div>
</template>

<script>
import Header from "@/components/home/Header";
import Main from "@/components/home/Main";

export default {
  name: "Home",
  components: {
    Main,
    Header
  },
  computed: {},
  data: () => {
    return {};
  },
  created() {},
  mounted() {}
};
</script>

<style>
.home * {
  font-family: "Comfortaa", cursive;
}
</style>
