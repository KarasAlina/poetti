<template>
  <Modal
    name="change_password"
    title="изменение пароля"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <ChangePasswordForm />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import ChangePasswordForm from "../form/ChangePasswordForm.vue";

export default {
  components: {
    Modal,
    ChangePasswordForm,
  },
  data: function () {
    return {};
  },

  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen() {},
  },
};
</script>

<style lang="scss" scoped></style>
