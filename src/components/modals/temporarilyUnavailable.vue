<template>
  <Modal
    name="temporarily_unavailable"
    title="Внимание!"
    size="lg"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div class="modal__text">
          Регистрация кодов станет доступна с&nbsp;31&nbsp;октября 2022 года.
          <br />Сохраняйте коды, <br /><b>Копите силы с&nbsp;Чабаном!</b>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
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
