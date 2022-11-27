<template>
  <Modal
    name="success_modal"
    :success="true"
    title="Спасибо!"
    size="md"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div class="modal__subtitle">Код зарегистрирован!</div>
        <p class="modal__text success_modal__text">
          {{
            "После модерации кода на указанный при регистрации электронный адрес поступит сообщение о том, как получить гарантированный приз. "
              | typograf
          }}
        </p>
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
  data: function () {
    return {};
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen() {},
  },
  mounted() {},
};
</script>
