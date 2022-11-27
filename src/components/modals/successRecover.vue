<template>
  <Modal
    name="success_recover"
    :success="true"
    size="lg"
    title="восстановление пароля"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <p class="modal__text success_modal__text">
          Вам поступит звонок на&nbsp;номер {{ phone }}. <br />Последние
          4&nbsp;цифры этого номера станут Вашим паролем. <br />Введите
          полученный пароль в&nbsp;форму авторизации на&nbsp;сайте.
        </p>
        <div class="success_modal__footer"></div>
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
    return {
      phone: null,
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.phone = event.params.phone;
    },
  },
};
</script>
