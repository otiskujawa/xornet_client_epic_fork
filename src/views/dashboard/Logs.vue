<template>
  <div class="logs overflow-scroll w-full h-100vh p-2 flex flex-col">
    <div class="list w-min mb-64 flex flex-col gap-1">
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
