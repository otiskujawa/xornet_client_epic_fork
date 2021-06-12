<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/807448839346716683/853054616870322256/spaz.gif" target="_blank">
      <img src="https://cdn.discordapp.com/attachments/806300597338767450/853124043486134272/f23a88ed1cb21f394a560354c80026f6e4df643cr1-723-666v2_uhq.jpg" alt="" />
    </a>
    <div class="content">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? add() : null">
        <div class="text">
          <h1>Add server to datacenter</h1>
          <p>Type the servers uuid</p>
        </div>

        <div class="fields">
          <input v-model="form.uuid" class="inputField" type="text" placeholder="c478ea46f8f6467ea497e2ad5caaa976" />
        </div>

        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Add<img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" /></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerCard",
  data() {
    return {
      form: {
        uuid: ""
      },
      isLoading: false
    };
  },
  computed: {
    isFormValid: function() {
      const uuidRegex = /([0-9a-f]{16})|([0-9a-f]{32})/g;
      return Object.values(this.form).some(field => !uuidRegex.test(field.toLowerCase()));
    }
  },
  methods: {
    async add() {
      this.isLoading = true;
      try {
        const status = await this.api.datacenters.addMachine(this.$route.params.name, this.form.uuid);
        if (status == 200) {
          console.log("added");
        }
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.card {
  width: 280px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  min-height: 400px;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  position: absolute;
  left: 50%;
  z-index: 500;
  top: 50%;
  transform: translate(-50%, -50%) scale(1.25);
}

.card a img {
  width: 280px;
  height: auto;
}

.card .content {
  padding: 16px 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 100%;
}

.card .content form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.card .content form .text * {
  font-style: normal;
  line-height: 175%;
}

.card .content form .text h1 {
  font-weight: bold;
  font-size: 16px;
  color: #585858;
}

.card .content form .text p {
  font-weight: 600;
  font-size: 12px;
  color: #8b8b8b;
}
.card .content form .fields {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-direction: column;
}

.card .content form .fields .inputField {
  width: 100%;

  font-weight: 600;
  font-size: 12px;
  border-radius: 4px;

  border: none;
  background-color: #f8f8f8;
  height: 32px;
  padding: 6px 8px;
}

.card .content form .fields .inputField::placeholder {
  color: #c4c4c4;
}
.card .content form .fields p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color: #c4c4c4;
  line-height: 175%;
}

.card .content form .fields p a {
  font-family: Montserrat;
  color: var(--theme-color);
  font-weight: bold;
  font-style: normal;
}

.card .content form button {
  color: white;
  border: none;
  background-color: var(--theme-color);
  width: min-content;
  padding: 4px 16px;
  border-radius: 4px;
  /* box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5); */

  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  line-height: 175%;
  transition: 100ms ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.card .content form button.disabled {
  cursor: not-allowed;
  user-select: none;
  filter: grayscale(1);
}

.card .content form button:hover {
  box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5);
  transform: translateY(-1px);
}

.card .content form button:active {
  transform: translateY(1px);
}

.card .content form button img {
  filter: invert(1);
  mix-blend-mode: screen;
  width: 16px;
  height: 16px;
}
</style>
