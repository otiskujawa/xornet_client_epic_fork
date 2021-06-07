<template>
  <div class="log" @click="active = !active" :class="{active}">
    <div class="heading">
      <Icon :icon="log.at.replace(/\s/g, '').toLowerCase()" default="warning" />
      <p>{{timeago(log.timestamp)}}</p>
      <p>{{log.at}}</p>
      <p>{{log.message?.error || log.message}}</p>
    </div>
    <div v-if="active" class="details">

    </div>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
import timeago from "epoch-timeago";
export default {
  data(){
    return {
      active: false,
    }
  },
  props: {
    log: {type: Object, required: true}
  },
  components: {
    Icon,
  },
  methods: {
    timeago,
  },
}
</script>

<style scoped>

.log {
  display: flex;
  background-color: var(--background-color);
  color: var(--black);
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 117.9%;
  flex-direction: column;
}

.log .heading {
  gap: 16px;
  display: flex;
  align-items: center;
}

.log.active {
  height: 400px;
  background-color:  var(--white);
}

.log:not(.active):hover {
  background-color: var(--theme-color);
}

.log.active:hover {
  background-color: var(--dark-lighter);
}

.log img {
  width: 20px;
  height: 20px;
  filter: invert(var(--filter));
}

</style>