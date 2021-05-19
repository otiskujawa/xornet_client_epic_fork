<template>
  <div class="info">
    <h1 class="title">{{title}}</h1>
    <h1 class="value">{{value}}</h1>
  </div>
</template>

<script>
export default {
    name: 'InfoField',
    props: {
        title: { type: String, required: true },
        value: { type: String, required: true },
    },
};
</script>

<style scoped>

.info {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
  color: var(--black);
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--background-color);
  transition: 100ms ease;
}

.info:hover {
  transform: translateY(-1px);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}

.info h1 {
  white-space: nowrap;
}

.info .title {
  font-size: 11px;
  font-family: inherit;
}

.info .value {
  font-size: 20px;
  font-weight: 400;
  font-family: 'Courier Prime', monospace;
  line-height: 18px;
}

</style>
