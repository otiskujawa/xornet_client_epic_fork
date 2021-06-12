<template>
  <transition name="bounce">
    <div class="popup" v-if="show">
      <div class="content">
        <progress class="progressBar" :value="timeoutProgress" :max="timeoutLength / 1000"></progress>
        <div class="shit">
          <p ><strong>{{errorMethod}}</strong> - {{errorMessage}}</p>
          <Icon icon="x" class="xButton" @click="show = !show"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import eventHandler from "@/services/eventHandler.js";
import Icon from "@/components/misc/Icon";

export default {
  name: "Popup",
  components: {
    Icon,
  },
  data() {
    return {
      show: false,
      errorMessage: 'null',
      errorMethod: 'null',
      timeoutProgress: 0,
      timeoutLength: 10000,
    }
  },
  async mounted() {
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    eventHandler.on('error', async error => {
      this.timeoutProgress = 0;
      this.timeoutLength = 10000;
      this.show = true;
      this.errorMessage = error.messages[0].response.data.message;
      this.errorMethod = `${error.messages[0].response.status} ${error.method}`;
      
      for (let i = 0; i < this.timeoutLength / 1000; i++) {
        this.timeoutProgress++;
        await sleep(this.timeoutLength / 10);
      }
      
      this.show = false;
    })
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  user-select: none;

  min-height: 48px;
  height: fit-content;
  z-index: 11000;
  padding: 8px;
}

.popup .content {
  background-color: var(--theme-color);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
  color: white;

  position: relative;
  user-select: initial;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0px 0px 4px 4px;
  width: 75%;
  height: 100%;
}

.popup .content .progressBar {
  position: absolute;
  top: 0px;
  width: 100%;
  border: none;
  height: 4px;
}

.popup .content .progressBar::-webkit-progress-bar {
  background-color: transparent;
}

.popup .content .progressBar::-webkit-progress-value {
  background-color: var(--bright-theme-color); 
}

.popup .content .shit {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.popup .content .shit p {
  font-size: 13px;
}

.popup .content .xButton {
  cursor: pointer;
  filter: invert(1);
  width: 24px;
  height: 24px;
}

.bounce-enter-active {
  animation: bounce-in .4s ease-in-out;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse ease-in-out;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-64px);
  }
  80% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0px);
  }
}


</style>