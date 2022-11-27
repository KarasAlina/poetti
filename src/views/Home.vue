<template>
  <div class="home">
    <Hero />
    <Steps />
    <Prizes />
    <Voting />
    <!-- <Winners /> -->
    <Faq :items="faqItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/AppHero.vue";
import Steps from "@/components/AppSteps.vue";
import Prizes from "@/components/AppPrizes.vue";
import Faq from "@/components/AppFaq.vue";
// import Winners from "../components/AppWinners.vue";
import Voting from "../components/AppVoting.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Steps,
    Prizes,
    Faq,
    // Winners,
    Voting
},
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
      sectionObserver: null,
      faqItems: [
        {
          title: "Когда проводится акция?",
          text: "с&nbsp;31&nbsp;октября 2022 года по&nbsp;10&nbsp;января 2023 года&nbsp;&mdash; в&nbsp;этот период&nbsp;Вы можете приобрести продукцию в&nbsp;промоупаковке и&nbsp;зарегистрировать код.",
          isActive: false,
        },
        {
          title: "Какие продукты участвуют в акции?",
          text: `
          <div class="tg-wrapper">
          <table class="tg">
          <thead>
            <tr>
              <th class="tg-0pky">Наименование</th>
              <th class="tg-0lax _centered-text">Силы</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tg-buh4">Масло "Чабан" 72,5%, 180г</td>
              <td class="tg-buh4 _centered-text">11</td>
            </tr>
            <tr>
              <td class="tg-0lax">Масло "Чабан" 82,5%, 100г</td>
              <td class="tg-0lax _centered-text">6</td>
            </tr>
            <tr>
              <td class="tg-buh4">Масло "Чабан" 82,5%, 180г</td>
              <td class="tg-buh4 _centered-text">12</td>
            </tr>
            <tr>
              <td class="tg-0lax">Масло "Чабан" 72,5%, 380г</td>
              <td class="tg-0lax _centered-text">22</td>
            </tr>
            <tr>
              <td class="tg-buh4">Масло "Чабан" 82,5%, 380г</td>
              <td class="tg-buh4 _centered-text">23</td>
            </tr>
            <tr>
              <td class="tg-0lax">Масло "Чабан" 62% шоколадное, 180г</td>
              <td class="tg-0lax _centered-text">10</td>
            </tr>
            <tr>
              <td class="tg-buh4">Сметана "Чабан" 15%, 200г</td>
              <td class="tg-buh4 _centered-text">3</td>
            </tr>
            <tr>
              <td class="tg-0lax">Сметана "Чабан" 15%, 400г</td>
              <td class="tg-0lax _centered-text">6</td>
            </tr>
            <tr>
              <td class="tg-buh4">Сметана "Чабан" 25%, 200г</td>
              <td class="tg-buh4 _centered-text">4</td>
            </tr>
            <tr>
              <td class="tg-0lax">Сметана "Чабан" 25%, 400г</td>
              <td class="tg-0lax _centered-text">8</td>
            </tr>
            <tr>
              <td class="tg-buh4">Сметана "Чабан" 40%, 200г<br></td>
              <td class="tg-buh4 _centered-text">6</td>
            </tr>
            <tr>
              <td class="tg-0lax">Сметана "Чабан" 40%, 400г<br></td>
              <td class="tg-0lax _centered-text">12</td>
            </tr>
            <tr>
              <td class="tg-buh4">Сыр Российский "Чабан", 180г<br></td>
              <td class="tg-buh4 _centered-text">10</td>
            </tr>
            <tr>
              <td class="tg-0lax">Сыр Голландский "Чабан", 180г<br></td>
              <td class="tg-0lax _centered-text">10</td>
            </tr>
            <tr>
              <td class="tg-buh4">Сыр плавленый сливочный "Чабан", 200г<br></td>
              <td class="tg-buh4 _centered-text">8</td>
            </tr>
            <tr>
              <td class="tg-0lax">Сыр плавленый сливочный "Чабан", 400г<br></td>
              <td class="tg-0lax _centered-text">14<br></td>
            </tr>
            <tr>
              <td class="tg-buh4">Творог "Чабан" 2%, 180г<br></td>
              <td class="tg-buh4 _centered-text">5</td>
            </tr>
            <tr>
              <td class="tg-0lax">Творог "Чабан" 5%, 180г<br></td>
              <td class="tg-0lax _centered-text">5</td>
            </tr>
            <tr>
              <td class="tg-buh4">Творог "Чабан" 9%, 180г<br></td>
              <td class="tg-buh4 _centered-text">5</td>
            </tr>
          </tbody>
          </table>
          </div>`,
          isActive: false,
        },
        {
          title: "Что такое силы?",
          text: "Силы&nbsp;&mdash; это баллы, начисляемые за&nbsp;покупку Товара и&nbsp;регистрацию Кода.",
          isActive: false,
        },
        {
          title:
            "Где я&nbsp;могу узнать какое количество сил за&nbsp;какой продукт начисляют?",
          text: `<p>Количество сил указано на упаковке продукции, участвующей в акции.</p>
          <div class="tg-wrapper">
            <table class="tg">
              <thead>
                <tr>
                  <th class="tg-0pky">Наименование</th>
                  <th class="tg-0lax _centered-text">Силы</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tg-buh4">Масло "Чабан" 72,5%, 180г</td>
                  <td class="tg-buh4 _centered-text">11</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Масло "Чабан" 82,5%, 100г</td>
                  <td class="tg-0lax _centered-text">6</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Масло "Чабан" 82,5%, 180г</td>
                  <td class="tg-buh4 _centered-text">12</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Масло "Чабан" 72,5%, 380г</td>
                  <td class="tg-0lax _centered-text">22</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Масло "Чабан" 82,5%, 380г</td>
                  <td class="tg-buh4 _centered-text">23</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Масло "Чабан" 62% шоколадное, 180г</td>
                  <td class="tg-0lax _centered-text">10</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Сметана "Чабан" 15%, 200г</td>
                  <td class="tg-buh4 _centered-text">3</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Сметана "Чабан" 15%, 400г</td>
                  <td class="tg-0lax _centered-text">6</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Сметана "Чабан" 25%, 200г</td>
                  <td class="tg-buh4 _centered-text">4</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Сметана "Чабан" 25%, 400г</td>
                  <td class="tg-0lax _centered-text">8</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Сметана "Чабан" 40%, 200г<br></td>
                  <td class="tg-buh4 _centered-text">6</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Сметана "Чабан" 40%, 400г<br></td>
                  <td class="tg-0lax _centered-text">12</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Сыр Российский "Чабан", 180г<br></td>
                  <td class="tg-buh4 _centered-text">10</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Сыр Голландский "Чабан", 180г<br></td>
                  <td class="tg-0lax _centered-text">10</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Сыр плавленый сливочный "Чабан", 200г<br></td>
                  <td class="tg-buh4 _centered-text">8</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Сыр плавленый сливочный "Чабан", 400г<br></td>
                  <td class="tg-0lax _centered-text">14<br></td>
                </tr>
                <tr>
                  <td class="tg-buh4">Творог "Чабан" 2%, 180г<br></td>
                  <td class="tg-buh4 _centered-text">5</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Творог "Чабан" 5%, 180г<br></td>
                  <td class="tg-0lax _centered-text">5</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Творог "Чабан" 9%, 180г<br></td>
                  <td class="tg-buh4 _centered-text">5</td>
                </tr>
              </tbody>
            </table>
            </div>
          `,
          isActive: false,
        },
        {
          title: "Кто может принять участие в&nbsp;акции?",
          text: "В&nbsp;акции могут принимать участие только граждане&nbsp;РФ старше 18&nbsp;лет.",
          isActive: false,
        },
        {
          title: "Как принять участие в акции?",
          text: "1.	Приобретите продукцию в&nbsp;промоупаковке и&nbsp;найдите внутри упаковки или под специальным стикером код;<br>2.	Зарегистрируйтесь на&nbsp;сайте или в&nbsp;чат-боте акции.<br>3.	Зарегистрируйте код, который&nbsp;Вы нашли внутри упаковки или под специальным стикером.<br>4.	Удостоверьтесь, что в&nbsp;личном кабинете появился зарегистрированный код в&nbsp;разделе &laquo;Зарегистрированные коды&raquo;.",
          isActive: false,
        },
        {
          title: "Есть ли гарантированные призы?",
          text: `<p>Да, гарантированные подарки можно получить, обменяв на&nbsp;силы. <br>Наименование, номинал и&nbsp;количество подарков и&nbsp;Сил для обмена.<br></p>
          <div class="tg-wrapper">
            <table class="tg">
              <thead>
                <tr>
                  <th class="tg-0pky _centered-text">Количество Сил<br></th>
                  <th class="tg-0lax _centered-text">Наименование</th>
                  <th class="tg-0lax _centered-text">Номинал</th>
                  <th class="tg-0lax _centered-text">Количество в Акции, шт</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tg-buh4  _centered-text">15</td>
                  <td class="tg-buh4">50 рублей на мобильный телефон</td>
                  <td class="tg-buh4  _centered-text">50 рублей</td>
                  <td class="tg-buh4 _centered-text">7 500</td>
                </tr>
                <tr>
                  <td class="tg-0lax _centered-text">75</td>
                  <td class="tg-0lax">300 рублей на мобильный телефон<br></td>
                  <td class="tg-0lax _centered-text">300 рублей</td>
                  <td class="tg-0lax _centered-text">2 000</td>
                </tr>
                <tr>
                  <td class="tg-buh4 _centered-text">200</td>
                  <td class="tg-buh4">1 000 рублей на мобильный телефон</td>
                  <td class="tg-buh4 _centered-text">1 000 рублей</td>
                  <td class="tg-buh4 _centered-text">500</td>
                </tr>
              </tbody>
            </table>
            </div>
          `,
          isActive: false,
        },
        {
          title: "Какие призы можно выиграть?",
          text: `<p>Главный приз:<br>Автомобиль Kia Rio Comfort&nbsp;&mdash; 1&nbsp;штука.<br><br>Еженедельные призы:<br>Электронный сертификат М.Видео номиналом 3&nbsp;000 рублей&nbsp;&mdash; 150&nbsp;штук. <br>Смартфон iPhone 14&nbsp;128&nbsp;Гб&nbsp;&mdash; 10&nbsp;штук.<br><br>Специальные призы:<br>Ноутбук игровой Lenovo&nbsp;&mdash; 1&nbsp;штука.<br>Музыкальная система JBL Partybox&nbsp;&mdash; 1&nbsp;штука.</p>
          <div class="tg-wrapper">
            <table class="tg">
              <thead>
                <tr>
                  <th class="tg-0pky _centered-text">Количество Сил<br></th>
                  <th class="tg-0lax _centered-text">Наименование</th>
                  <th class="tg-0lax _centered-text">Номинал</th>
                  <th class="tg-0lax _centered-text">Количество в Акции, шт</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4">50 рублей на мобильный телефон</td>
                  <td class="tg-buh4 _centered-text">50 рублей</td>
                  <td class="tg-buh4 _centered-text">7 500</td>
                </tr>
                <tr>
                  <td class="tg-0lax _centered-text">75</td>
                  <td class="tg-0lax">300 рублей на мобильный телефон<br></td>
                  <td class="tg-0lax _centered-text">300 рублей</td>
                  <td class="tg-0lax _centered-text">2 000</td>
                </tr>
                <tr>
                  <td class="tg-buh4 _centered-text">200</td>
                  <td class="tg-buh4">1 000 рублей на мобильный телефон</td>
                  <td class="tg-buh4 _centered-text">1 000 рублей</td>
                  <td class="tg-buh4 _centered-text">500</td>
                </tr>
              </tbody>
            </table>
            </div>
          `,
          isActive: false,
        },
        {
          title: "Что нужно сделать, чтобы выиграть специальные призы?",
          text: "Для выигрыша специальных призов необходимо зарегистрировать максимальное количество кодов (приз акустическая система JBL) или накопить максимальное количество сил (приз ноутбук Lenovo) за&nbsp;весь период акции.",
          isActive: false,
        },
        {
          title: "Главный приз акции?",
          text: "Главным призом акции является автомобиль KIA RIO Comfort. Розыгрыш главного приза будет проводиться 21&nbsp;января среди участников акции, которые накопили не&nbsp;менее 123 сил за&nbsp;период с&nbsp;31&nbsp;октября 2022 по&nbsp;10&nbsp;января 2023 включительно.",
          isActive: false,
        },
        {
          title:
            "Почему для участия в&nbsp;розыгрыше автомобиля нужно набрать именно 123&nbsp;силы?",
          text: "123 (лошадиные) силы находятся под капотом Kia Rio, который является Главным призом в&nbsp;акции. Розыгрыш главного приза будет проводиться 21&nbsp;января среди участников акции, которые накопили не&nbsp;менее 123 сил за&nbsp;период с&nbsp;31&nbsp;октября 2022 по&nbsp;10&nbsp;января 2023&nbsp;включительно.",
          isActive: false,
        },
        {
          title:
            "Какое количество призов я&nbsp;могу получить за&nbsp;весь период акции?",
          text: "Вы&nbsp;можете получить не&nbsp;более 1&nbsp;еженедельного приза каждого вида, не&nbsp;более 1&nbsp;специального приза и&nbsp;не&nbsp;более 1&nbsp;главного приза за&nbsp;всю акцию.",
          isActive: false,
        },
        {
          title: "Могу ли я обменять призы на деньги?",
          text: "Денежный эквивалент приза не&nbsp;предусмотрен правилами акции.",
          isActive: false,
        },
        {
          title: "Как определяются победители в&nbsp;акции?",
          text: `<p>Определение 16 обладателей еженедельных призов определяются согласно графику:</p>
            <div class="tg-wrapper">
            <table class="tg">
              <thead>
                <tr>
                  <th class="tg-0pky">Наименование <br>Еженедельного приза<br></th>
                  <th class="tg-0lax">Количество разыгрываемых <br>Еженедельных призов</th>
                  <th class="tg-0lax">Период <br>Регистрации кодов<br></th>
                  <th class="tg-0lax">Дата проведения розыгрыша</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео<br></td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 31.10.2022 <br>по 23:59:59 <br>06.11.2022<br></td>
                  <td class="tg-buh4 _centered-text" rowspan="2">09.11.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб<br></td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео<br></td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 07.11.2022 <br>по 23:59:59 <br>13.11.2022<br></td>
                  <td class="tg-buh4 _centered-text" rowspan="2">16.11.2022<br></td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 14.11.2022 <br>по 23:59:59 <br>20.11.2022</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">23.11.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 21.11.2022 <br>по 23:59:59 <br>27.11.2022</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">30.11.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 28.11.2022 <br>по 23:59:59 <br>04.12.2022</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">07.12.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 05.12.2022 <br>по 23:59:59 <br>11.12.2022</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">14.12.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 12.12.2022 <br>по 23:59:59 <br>18.12.2022</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">21.12.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 19.12.2022 <br>по 23:59:59 <br>25.12.2022</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">28.12.2022</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 26.12.2022 <br>по 23:59:59 <br>01.01.2023</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">11.01.2023</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
                <tr>
                  <td class="tg-buh4">Электронный сертификат М.Видео</td>
                  <td class="tg-buh4 _centered-text">15</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">с 00:00:00 02.01.2023 <br>по 23:59:59 <br>10.01.2023</td>
                  <td class="tg-buh4 _centered-text" rowspan="2">21.01.2023</td>
                </tr>
                <tr>
                  <td class="tg-0lax">Смартфон iPhone 14 128 Гб</td>
                  <td class="tg-0lax _centered-text">1</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>на&nbsp;основании реестра заявок участников акции, полученных за&nbsp;указанный период регистрации кодов.</p><p>Определение победителей осуществляется с&nbsp;помощью генератора случайных чисел&nbsp;&mdash; определяется общее число заявок за&nbsp;период, указанный в&nbsp;таблице выше, и&nbsp;вводится в&nbsp;генератор случайных чисел. </p> <p>Процедура повторяется по&nbsp;количеству призов, 16&nbsp;призов еженедельно.<br>Полученное число соответствует номеру строки реестра, на&nbsp;которой находится заявка участника&nbsp;&mdash; потенциального победителя.<br>Первым определяется победитель, обладатель смартфона iPhone 14&nbsp;128&nbsp;Гб. Следующими определяются победители, обладатели электронного сертификата М.Видео номиналом 3&nbsp;000&nbsp;рублей.</p><br><p><b>Определение обладателя главного приза</b></p> <br>Обладатель главного приза определяется 21&nbsp;января 2023&nbsp;г.&nbsp;в&nbsp;12:00 по&nbsp;московскому времени в&nbsp;прямом эфире на&nbsp;YouTube канале Нальчикского МК&nbsp;<a href='https://www.youtube.com/channel/UCQ1IbTYrcgbqfmXAcqb_9Cg' target='_blank'>https://www.youtube.com/channel/UCQ1IbTYrcgbqfmXAcqb_9Cg</a>.<br>Среди участников акции с&nbsp;накопленным количеством сил не&nbsp;менее 123&nbsp;на момент 23:59:59 10&nbsp;января 2023 года включительно. Формируется общий реестр из&nbsp;участников каждому участнику присваивается номер в&nbsp;хронологической последовательности в&nbsp;зависимости от&nbsp;времени накопления 123&nbsp;Сил. <br><p>Победитель определяется следующим образом: в&nbsp;непрозрачный короб помещаются купоны, на&nbsp;которых указаны числа, соответствующие номерам строк реестра. Один из&nbsp;членов тиражной комиссии осуществляет выемку купона из&nbsp;короба&nbsp;&mdash; число, указанное на&nbsp;купоне, соответствует номеру строки реестра, на&nbsp;которой находится заявка участника&nbsp;&mdash; претендента на&nbsp;получение главного приза.</p> <br><p><b>Определение обладателей специальных призов </b></p><br>Обладателями специальных призов становятся следующие участники: <br>&bull;	участник, зарегистрировавший на&nbsp;сайте акции, наибольшее количество кодов; <br>&bull;	участник, накопивший самое большое количество сил.
          `,
          isActive: false,
        },
        {
          title: "Как вручаются призы?",
          text: "Для вручения Еженедельных, Специальных и&nbsp;Главных призов, организатор в&nbsp;течение 2&nbsp;рабочих дней с&nbsp;момента определения потенциальных победителей, связывается с&nbsp;ними по&nbsp;номеру мобильного телефона, которые были указаны при регистрации.",
          isActive: false,
        },
        {
          title:
            "Кто оплачивает налог за&nbsp;призы стоимостью более 4&nbsp;000&nbsp;рублей?",
          text: "<p>Организатор Акции выступает налоговым агентом в&nbsp;отношении еженедельных и&nbsp;специальных призов и&nbsp;выплачивает налог за&nbsp;победителя.</p> <p>С&nbsp;более подробной информацией&nbsp;Вы можете ознакомиться, скачав полную версию правил, в&nbsp;разделе &laquo;Правила Акции&raquo; на&nbsp;главной странице сайта.</p>",
          isActive: false,
        },
        {
          title: "Могут&nbsp;ли результаты розыгрыша быть аннулированы?",
          text: "Организатор вправе аннулировать результаты розыгрыша, если участник не&nbsp;предоставит необходимую информацию для вручения приза. А&nbsp;также если у&nbsp;организатора возникнут подозрения в&nbsp;мошенничестве участника. По&nbsp;своему усмотрению, организатор вправе выбрать другого победителя.",
          isActive: false,
        },
        {
          title: "Нужно ли хранить упаковку с кодом?",
          text: "Организатор акции может запросить фото упаковок, поэтому&nbsp;Вы можете хранить фото этих упаковок, на&nbsp;которых будет отчетливо виден код.",
          isActive: false,
        },
        {
          title:
            "Что делать, если возникли вопросы, ответов на&nbsp;которые нет в&nbsp;этом FAQ?",
          text: "Пожалуйста, задайте Ваш вопрос через форму обратной связи на&nbsp;сайте или в&nbsp;разделе &laquo;⚙️ Служба поддержки&raquo; в&nbsp;чат-боте.<br>Подробнее с&nbsp;правилами акции&nbsp;Вы можете ознакомиться, скачав полную версию правил, в&nbsp;разделе &laquo;Правила Акции&raquo; на&nbsp;главной странице сайта.",
          isActive: false,
        },
      ],
    };
  },
  mounted() {
    // this.$modal.show("enter_code");
    // this.$modal.show("error_code");
    // this.$modal.show("document_popup", {
    //       src: this.publicPath + 'rules.pdf'
    //     });
    // this.observeSections();
    setTimeout(() => {
      if (this.user && this.user.badUser === 1) {
        this.$modal.show("common_error", {
          size: "lg",
          title: "Внимание!",
          text: `<p>Действие учётной записи приостановлено вследствие подозрительной активности.</p> <p>Чтобы восстановить учетную запись, предоставьте, пожалуйста, фото или видео купленного акционного товара, с&nbsp;которого были зарегистрированы коды.</p> <p>Данные материалы отправьте на&nbsp;электронный адрес <a href='mailto:support@chaban-promo.ru' class='_undeline-link'>support@chaban&nbsp;-&nbsp;promo.ru</a> с&nbsp;почты, указанной при регистрации аккаунта.</p>`,
        });
      }
    }, 500);
    if (window.innerWidth >= 1024) {
      const sections = document.querySelectorAll(".section");
      const links = document.querySelectorAll("[data-menuanchor]");
      document.addEventListener("scroll", (e) => {
        sections.forEach((ha) => {
          const rect = ha.getBoundingClientRect();
          if (rect.top > 0 && rect.top < 150) {
            const location = window.location.toString().split("#")[0];
            history.replaceState(null, null, location + "#" + ha.id);
            links.forEach((element) => {
              element.classList.remove("active");
            });
            document
              .querySelector(`[data-menuanchor='${ha.id}']`)
              .classList.add("active");
          }
        });
      });
    }
    this.$parent.showFooter = false;
    const params = this.$route.query;
    if (params.email === "0") {
      let socId = params.identity_vk || params.identity_ok || "";

      console.log(socId);

      if (socId.length < 1) {
        this.$modal.show("common_error", {
          text: "Что-то пошло не так!",
        });
        this.$router.push("/");
      } else {
        this.$store.commit("SIGNUP_SOC_ID", socId);
        this.$modal.show("soc_signup");
        this.$router.push({ name: "Home" });
      }
    } else if (params.first === "1") {
      this.$store.commit("SET_TOKEN", params.auth_key);
      this.$store.dispatch("GetProfile").then((r) => {
        this.$modal.show("soc_signup-finish", {
          userName: r.data.profile.name,
        });
        this.$router.push({ name: "Home" });
      });
    } else if (params.result === "1") {
      this.$store.commit("SET_TOKEN", params.auth_key);

      this.$store.dispatch("GetProfile").then(() => {
        this.$router.push("/");
      });
    }
  },
  methods: {
    observeSections() {
      try {
        this.sectionObserver.disconnect();
      } catch (error) {
        console.log(error);
      }

      const options = {
        rootMargin: "0px 0px",
        threshold: 0,
      };
      this.sectionObserver = new IntersectionObserver(
        this.sectionObserverHandler,
        options
      );

      // Observe each section
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        this.sectionObserver.observe(section);
      });
    },
    sectionObserverHandler(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Push sectionId to router here
          this.$router.replace({
            name: this.$route.name,
            hash: `#${sectionId}`,
          });
          console.log(sectionId);
          // this.$route.hash = `#${sectionId}`;

          console.log(this.$route.hash);
        }
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {},
};
</script>
<style lang="scss">
p + .tg {
  margin-top: rem(20px);
}
.tg {
  border-collapse: collapse;
  border-color: #ccc;
  border-spacing: 0;
  &-wrapper {
    padding-bottom: rem(10px);
    margin-bottom: rem(20px);
    overflow-x: auto;
    &::-webkit-scrollbar {
      width: rem(10px);
      height: rem(5px);
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: $green;
      border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $green_dark;
      border-radius: 10px;
      transition: all 0.3s ease-in-out;
    }
  }
  & + p {
    margin-top: rem(20px);
  }
}
.tg td {
  background-color: #fff;
  border-color: #ccc;
  border-style: solid;
  border-width: 1px;
  font-size: rem(16px);
  font-weight: 400;
  overflow: hidden;
  padding: rem(8px) rem(10px);
  word-break: normal;
}
.tg th {
  background-color: #f0f0f0;
  border-color: #ccc;
  border-style: solid;
  border-width: 1px;
  text-align: center;
  font-size: rem(16px);
  overflow: hidden;
  padding: rem(10px) rem(10px);
  word-break: normal;
}
.tg .tg-buh4 {
  background-color: #f9f9f9;
  vertical-align: top;
}
.tg .tg-0pky {
  vertical-align: top;
}
.tg .tg-0lax {
  vertical-align: top;
}
</style>
