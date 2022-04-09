<template>
  <p>
    Account
  </p>
  <option-field label="Delete account" description="This button will yeet your info into the abyss">
    <base-confirmation-dialog confirmation-text="Are you sure you wanna delete your account?" @confirm="deleteAccount()">
      <base-button red text="Delete Account" />
    </base-confirmation-dialog>
  </option-field>
  <option-field label="Logout" description="This will reset all your localstorage (sometimes fixes bugged clients)">
    <base-confirmation-dialog confirmation-text="Are you sure you wanna logout?" @confirm="logout()">
      <base-button red text="Logout" />
    </base-confirmation-dialog>
  </option-field>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseConfirmationDialog from "/@/components/base/BaseConfirmationDialog.vue";
import OptionField from "/@/components/OptionField.vue";
import { logout } from "/@/services/logic";
const state = useState();
const deleteAccount = () => state.users.deleteAccount().then(() => logout());
</script>
