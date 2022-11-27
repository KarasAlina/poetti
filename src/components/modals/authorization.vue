<template>
  <Modal
    size="lg"
    title="авторизация"
    name="authorization"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <LoginForm :userPhone="phone" />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import LoginForm from "@/components/form/LoginForm.vue";

export default {
  components: {
    Modal,
    LoginForm,
  },
  data: function () {
    return {
      phone: null,
    };
  },

  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      if (event.params) {
        this.phone = event.params.phone;
      } else {
        this.phone = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  align-self: flex-start;
}
</style>

<style lang="scss"></style>
