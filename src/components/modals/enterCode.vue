<template>
  <Modal
    name="enter_code"
    size="lg"
    title="Введите последние 4&nbsp;цифры звонящего номера"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div class="modal__text">
          Вам поступит звонок на&nbsp;номер {{ phone }}. <br />Последние
          4&nbsp;цифры этого номера станут Вашим паролем. <br />Введите
          полученный пароль в&nbsp;форму авторизации на&nbsp;сайте.
        </div>
        <EnterCodeForm :phone="phone" :formData="formData" />
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import EnterCodeForm from "@/components/form/EnterCodeForm.vue";
export default {
  components: {
    Modal,
    EnterCodeForm,
  },
  data: function () {
    return {
      phone: null,
      formData: null,
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.phone = event.params.phone;
      this.formData = event.params.formData;
    },
  },
  mounted() {},
};
</script>
