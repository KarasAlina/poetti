<template>
  <Modal
    name="soc_signup-finish"
    size="md"
    :withoutClosing="true"
    title="Завершите регистрацию"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <SocSignupFormFinish :userName="userName" />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import SocSignupFormFinish from "../form/SocSignupFormFinish.vue";

export default {
  components: {
    Modal,
    SocSignupFormFinish,
  },
  data: function () {
    return {
      userName: null,
    };
  },

  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.userName = event.params.userName;
    },
  },
};
</script>

<style lang="scss" scoped>
.authorization {
  &__signin {
    max-width: 342px;
    margin: 25px auto 0;

    .form__field-input {
      min-width: 100%;
      margin-bottom: 0;
    }

    .forget-link {
      color: #013f5d;
      font-size: 11px;
      text-decoration-line: underline;
      margin-left: 25px;
    }

    .forget-link:hover {
      text-decoration: none;
    }
    .form__field--white {
      margin-bottom: 0;
    }
    &__footer {
      display: flex;
      margin-top: 0;
      justify-content: center;
    }
  }

  &__signup {
    &-title {
      text-align: center;
      font-size: 24px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
  }

  &__signup-row {
    display: flex;
    margin: 0 -22px;
  }

  &__signup-column {
    width: 50%;
    padding: 0 22px;

    .form__field-input {
      width: 100%;
    }
  }

  &__signup-footer {
    display: flex;

    text-align: center;
  }

  @media (max-width: 650px) {
    &__signin {
      max-width: none;
      padding: 30px 20px;
      margin: 30px -30px 0;

      .form__field-input {
        width: 100%;
        margin-top: 15px;
      }
    }
    &__social {
      flex-direction: column;
      padding: 30px 20px;
      margin: 0 -30px 40px;
    }

    &__social-caption {
      margin-bottom: 15px;
    }

    &__social-item:first-child {
      margin-left: 0;
    }

    &__signup-row {
      flex-direction: column;
      margin: 0 -52px;
    }

    &__signup-column {
      width: 100%;
    }
  }
}
</style>
