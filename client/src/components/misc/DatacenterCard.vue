<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/714219928181276802/852445270301999124/VR_RAVE.mp4" target="_blank"><img src="https://cdn.discordapp.com/attachments/806300597338767450/853048913229643776/duck.gif" alt=""/></a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? add() : null">
        <div class="text">
          <h1>Add datacenter</h1>
          <p>Type in a name for your datacenter</p>
        </div>

        <div class="fields">
          <input v-model="form.name" class="inputField" type="text" placeholder="My uwu datacenter" />
        </div>

        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Create <img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" /></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatacenterCard",
  data() {
    return {
      form: {
        name: ""
      },
      isLoading: false
    };
  },
  computed: {
    isFormValid: function() {
      return Object.values(this.form).some(field => field == "");
    }
  },
  methods: {
    async add() {
      this.isLoading = true;
      try {
        const status = await this.api.datacenters.add(JSON.stringify(this.form));
        if (status == 200) this.$router.push(`/dashboard/datacenters/${this.form.name}`);
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    }
  }
};
</script>

<style scoped src="@/components/misc/card.css">
</style>
