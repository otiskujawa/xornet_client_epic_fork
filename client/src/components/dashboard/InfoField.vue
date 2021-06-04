<template>
  <div class="info">
    <img v-if="icon" :src="icon" :alt="title">
    <div class="text">
      <h1 class="title">{{ title }}</h1>
      <h1 class="value">{{ value }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoField",
  props: {
    icon: { type: String },
    title: { type: String, required: true },
    value: { type: String, required: true }
  }
};
</script>

<style scoped>
.info {
  display: flex;
  border: 1px solid #E7E7E7;
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
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 117.9%;
  color: black;
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
  color: black;

}
</style>
