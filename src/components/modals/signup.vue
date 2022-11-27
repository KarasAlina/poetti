<template>
  <Modal size="lg" title="регистрация" name="signup" @closeModal="closeModal">
    <template v-slot:content>
      <SignupForm></SignupForm>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import SignupForm from "@/components/form/SignupForm.vue";

export default {
  props: [],
  components: {
    Modal,
    SignupForm,
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

<style lang="scss" scoped>
.modal {
  align-self: flex-start;
}
</style>

<style lang="scss"></style>
