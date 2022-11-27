<template>
  <Modal
    name="recover"
    size="lg"
    title="восстановление пароля"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <RecoverForm></RecoverForm>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import RecoverForm from "@/components/form/RecoverForm.vue";

export default {
  components: {
    Modal,
    RecoverForm,
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
