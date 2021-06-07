<template>
  <div class="logs">
    <div class="list">
      <LogButton v-for="log of logs" :key="log" :log="log" />
    </div>
  </div>
</template>
<script>
import LogButton from "@/components/dashboard/LogButton";

export default {
  name: "Logs",
  data() {
    return {
      logs: []
    };
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
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  width: fit-content;
  margin-bottom: 256px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
