<template>
  <div class="info">
    <Icon v-if="icon" :icon="icon"/>
    <div class="text">
      <h1 class="title">{{ title }}</h1>
      <h1 class="value">{{ value }}</h1>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon"
export default {
  name: "InfoField",
  components: {
    Icon,
  },
  props: {
    icon: { type: String },
    title: { type: String, required: true },
    value: { type: [String, Number], required: true }
  }
};
</script>

<style scoped>
.info {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  flex-direction: row;
  text-align: left;
  gap: 8px;
  color: var(--black);
  padding: 16px;
  cursor: pointer;
  background-color: var(--background-color);
  transition: 100ms ease;
}

.info:hover {
  transform: translateY(-1px);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}

.info img {
  width: auto;
  height: 40px;
  filter: invert(var(--filter));
}

.info .text {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.info h1 {
  white-space: nowrap;
}

.info .title {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 117.9%;
  color: var(--black);
}

.info .value {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 117.9%;
  /* or 21px */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: var(--black);
}
</style>
