<template>
  <img name="icon" :src="require(`@/assets/icons/${isStroked ? 'stroked' : 'filled'}/${icon}.svg`)" :alt="icon" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: { type: String, required: true }
  },
  components: {},
  data: () => {},
  computed: {
    isStroked() {
      return localStorage.getItem("isStroked") === true ? true : false;
    }
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style scoped></style>
