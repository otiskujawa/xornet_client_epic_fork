<template>
  <div class="membersInfo">
    <h1 class="title">Members</h1>
    <div class="member" v-for="member of members" :key="member">
      <router-link class="user" :to="{ name: 'profile', params: { username: member.username } }">
        <img
          :src="
            member.profileImage?.url ??
              'https://cdn.discordapp.com/attachments/816028632269979668/855437868825444372/unknown.png'
          "
          :alt="member.username"
        />
        <h1>{{ member.username }}</h1>
      </router-link>
      <ShadowButton v-if="isOwner" colored class="revoke" title="Revoke" icon="hammer" @click="revoke(member._id)" />
    </div>
    <ShadowButton v-if="isOwner" title="Add" icon="add" @click="showMemberCard = !showMemberCard" />
    <MemberCard v-if="showMemberCard" />
  </div>
</template>

<script>
import ShadowButton from "@/components/dashboard/ShadowButton";
import MemberCard from "@/components/misc/MemberCard";
export default {
  name: "MemberField",
  data() {
    return {
      showMemberCard: false
    };
  },
  props: {
    members: { type: Array, required: true },
    isOwner: { type: Boolean, required: true }
  },
  components: {
    ShadowButton,
    MemberCard
  },
  methods: {
    async revoke(user) {
      await this.api.datacenter.revokeMember(this.$route.params.name, user);
    }
  }
};
</script>

<style lang="postcss" scoped>
.membersInfo {
  @apply border border-gray-500 rounded-4px flex-col text-left gap-2 p-4 cursor-pointer w-full;
}

img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50px;
}

h1 {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.title {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 117.9%;
  color: var(--black);
}

.member {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: bold;
  line-height: 117.9%;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
  display: flex;
  text-align: center;
  color: var(--black);
}

.user {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
