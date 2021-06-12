<template>
  <div class="popup" v-if="show">
    <div class="content">
      <transition name="fade">
        <div class="shit">
          <p v-if="show">{{errorMessage[0].message}}</p>
          <Icon icon="x" class="xButton" @click="show = !show"/>
        </div>
      </transition>
    </div>
  </div>
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
    }
  },
  async mounted() {
    eventHandler.on('error', response => {
      this.show = true;
      this.errorMessage = response;
      setTimeout(() => this.show = false, 10000);
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

  min-height: 48px;
  height: fit-content;
  z-index: 11000;
  padding: 8px;
}

.popup .content {
  background-color: var(--theme-color);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
  color: white;
  
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  width: 75%;
  height: 100%;
}

.popup .content .shit {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.popup .content .xButton {
  cursor: pointer;
  filter: invert(1);
  width: 24px;
  height: 24px;
}


</style>