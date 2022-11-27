<template>
  <Modal
    name="update_info"
    size="lg"
    title="Внесите недостающие данные"
    @closeModal="closeModal"
    :withoutClosing="true"
  >
    <template v-slot:content>
      <UpdateInfoForm :user="user" />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import UpdateInfoForm from "../form/UpdateInfoForm.vue";

export default {
  components: {
    Modal,
    UpdateInfoForm,
  },
  data: function () {
    return {
      user: null,
    };
  },

  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.user = event.params.user;
    },
  },
};
</script>

<style lang="scss" scoped></style>
