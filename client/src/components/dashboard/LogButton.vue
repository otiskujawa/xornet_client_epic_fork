<template>
  <div class="log" @click="active = !active" :class="{ active }">
    <div class="heading">
      <Icon :icon="log.at.replace(/\s/g, '').toLowerCase()" default="warning" />
      <p>{{ timeago(log.timestamp) }}</p>
      <p>{{ log.at }}</p>
      <p class="summary">{{ log.summary || log.message?.error || log.message }}</p>
    </div>
    <div v-if="active" class="details">
      <!-- <p>{{log.message?.error || log.message}}</p> -->
      <div class="field" v-for="(value, key) of JSON.parse(log.message)" :key="key">
        <h1>{{ key }}</h1>
        <pre v-if="JSON.stringify(value).startsWith('{')">
          <code v-html="format(value)" class="language-json hljs" ></code>
        </pre>
        <!-- <highlightjs v-if="JSON.stringify(value).startsWith('{')" language='json' :code="JSON.stringify(value)" /> -->
        <p v-else>{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/gradient-dark.css";
import Icon from "@/components/misc/Icon";
import timeago from "epoch-timeago";

export default {
  data() {
    return {
      active: false
    };
  },
  props: {
    log: { type: Object, required: true }
  },
  components: {
    Icon
  },
  methods: {
    format(string) {
      return hljs.highlight(JSON.stringify(string, null, "   "), { language: "json" }).value;
    },
    timeago
  }
};
</script>

<style scoped>
.log {
  display: flex;
  background-color: var(--background-color);
  color: var(--black);
  padding: 2px 4px;
  cursor: pointer;
  border-radius: 4px;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  font-family: "Work Sans";
  max-width: 1000px;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 117.9%;
  flex-direction: column;
}

.log:not(.active):hover {
  background-color: var(--theme-color);
}

.log.active {
  height: fit-content;
  background-color: var(--white);
}

img {
  width: 20px;
  height: 20px;
  filter: invert(var(--filter));
}

.heading {
  gap: 16px;
  max-width: 1000px;
  display: flex;
  align-items: center;
}

.heading * {
  color: var(--black);
}

.summary {
  max-width: 100%;
  width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details {
  height: 100%;
  max-width: 100%;
  white-space: normal;
  width: 100%;
  gap: 8px;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

code {
  white-space: pre;
  display: block;
  padding: 8px;
  border-radius: 4px;
  background: #151529;
}
</style>
