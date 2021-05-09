<template>
  <div class="info">
    <h1 class="title">{{title}}</h1>
    <h1 class="value">{{value}}</h1>
  </div>
</template>

<script>
import gauge from '@/components/gauge';


export default {
    name: 'infoField',
    components: {
        gauge,
    },
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
  padding: 16px;
  border: 1px solid var(--dark-lighter);
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--dark-light);
}

.info .title {
  font-size: 12px;
  font-family: inherit;
  color: var(--white);
  white-space: nowrap;
}

.info .value {
  font-size: 20px;
  font-weight: 400;
  font-family: 'Courier Prime', monospace;
  color: var(--white);
  line-height: 18px;
}

</style>
