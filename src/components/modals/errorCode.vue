<template>
  <Modal name="error_code" title="регистрация кода" @closeModal="closeModal">
    <template v-slot:content>
      <div class="error_modal">
        <img src="../../assets/images/error.svg" alt="" />
        <p class="modal__text error_modal-text">
          ошибка<br />не удалось <br />зарегистрировать код
        </p>
        <p class="modal__text error_modal-text" v-html="text"></p>
        <button class="btn btn--secondary" @click="closeModal('error_code')">
          закрыть
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { set } from "lodash";

export default {
  components: {
    Modal,
  },
  data: () => ({
    text: null,
  }),
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.text = event.params.text;
    },
  },
  mounted() {},
};
</script>
