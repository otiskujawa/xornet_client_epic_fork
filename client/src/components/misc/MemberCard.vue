<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/807448839346716683/853054616870322256/spaz.gif" target="_blank">
      <img src="https://cdn.discordapp.com/attachments/807448839346716683/853054616870322256/spaz.gif" alt="" />
    </a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? add() : null">
        <div class="text">
          <h1>Add member to datacenter</h1>
          <p>Type the users uuid</p>
        </div>

        <div class="fields">
          <input v-model="form.uuid" class="inputField" type="text" placeholder="c478ea46-f8f6-467e-a497-e2ad5caaa976" />
        </div>

        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Add<img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" /></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberCard",
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
      const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
      return Object.values(this.form).some(field => !uuidRegex.test(field.toLowerCase()));
    }
  },
  methods: {
    async add() {
      this.isLoading = true;
      try {
        const status = await this.api.datacenters.addMember(this.$route.params.name, this.form.uuid);
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

<style scoped src="@/components/misc/card.css"></style>
