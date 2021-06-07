<template>
  <div class="logs">
    <div class="list">
      <LogButton v-for="log of logs" :key="log" :log="log"/>
    </div>
  </div>
</template>
<script>

import LogButton from "@/components/dashboard/LogButton";

export default {
  name: "Logs",
  data(){
    return {
      logs: [],
    }
  },
  components: {
    LogButton
  },
  async mounted() {
    this.logs = await this.api.user.fetchLogs();
  }
};
</script>

<style scoped>

.logs {
  display: flex;
  gap: 2px;
  width: 100%;
  align-items: center;
  flex-direction: column;
}

.list {
  width: fit-content;
}

</style>
