<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="container">
        <div class="footer__text">
          <p>
            Общий срок Акции с&nbsp;10.11.2022 по&nbsp;31.01.2023. Период совершения покупок с&nbsp;10.11.2022 по&nbsp;11.01.2023. Период выдачи призов и&nbsp;авторизации на&nbsp;сайте Акции с&nbsp;01.12.2022 по&nbsp;13.01.2023. Акция проводится для держателей карты О&rsquo;КЕЙ. Количество призов ограничено. Участие в&nbsp;Акции возможно после совершения покупки на&nbsp;сумму от&nbsp;750 рублей (после учета всех скидок и&nbsp;за&nbsp;исключением стоимости алкогольной продукции, табачных изделий, аксессуаров для курения, никотиносодержащей продукции, устройств для потребления никотиносодержащей продукции, подарочных карт и&nbsp;лотерейных билетов) или покупки товара-партнера и&nbsp;авторизации на&nbsp;сайте www.okey-calendar.ru. Информация об&nbsp;организаторе Акции, правилах ее&nbsp;проведения, количестве призов, сроках, месте и&nbsp;порядке их&nbsp;получения на&nbsp;сайте
            <a href="www.okey-calendar.ru" target="_blank">www.okey-calendar.ru</a>
          </p>
        </div>
        <div class="footer__copyright">
          © <span>{{ year }}</span> Все права защищены.
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: ["partners"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      docs: [
        {
          name: "Конфиденциальность",
          path: "terms-of-use.pdf",
        },
        {
          name: "Пользовательское соглашение",
          path: "terms-of-use.pdf",
        },
      ],
    };
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    year() {
      let date = new Date();
      return date.getFullYear();
    },
  },
};
</script>
<style scoped lang="scss">
.footer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 rem(7px);
  border-bottom: none;
  color: rgba(234, 231, 226, 0.51);
  text-align: justify;
  z-index: 10;
  .container {
    padding-top: rem(30px);
    padding-bottom: rem(30px);
  }
  &__row,
  &__docs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__text,
  &__copyright {
    font-size: rem(10px);
    line-height: 1.5;
    font-weight: 400;
    p {
      margin-bottom: rem(15px);
    }
    a {
      text-decoration: underline;
    }
  }
  &__col {
    width: 100%;
  }
  &__copyright {
    margin-top: rem(12px);
  }

  @media (min-width: $md) {
    padding: rem(150px) 0 rem(120px);
    text-align: left;
    font-size: rem(16px);
    .container {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    &__content {
      padding-top: 0;
      background: none;
    }
    &__row {
      flex-direction: row;
      justify-content: space-between;
    }
    &__copyright {
      margin-top: 0;
      text-align: left;
      font-size: rem(16px);
    }
    &__text {
      font-size: rem(16px);
      line-height: 1.8;
    }
    &__col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &:last-of-type {
        flex: 0 0 58%;
      }
    }
  }
}
</style>
