<template>
  <section class="voting section" id="voting">
    <div class="container">
      <div class="section-title _white">Голосуйте за лучшее фото</div>
      <div class="voting-nav">
        <button class="voting-nav__btn btn btn--primary btn--lg">Примеры работ</button>
        <button class="voting-nav__btn btn btn--primary btn--lg">добавить свою фотографию</button>
        <div class="voting-nav-dropdown" :class="{ active: openDropdown }">
          <div class="voting-nav-dropdown__trigger btn btn--bordered btn--lg" @click="openDropdown = !openDropdown">
            <span>сортировать по {{ sortingList.filter((item) => item.value === sortBy)[0].text }}</span>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.3584L12 13.6417L23 1.3584" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="voting-nav-dropdown__content">
            <ul class="voting-nav-dropdown__list">
              <li 
                v-for="(opt,i) in sortingList"
                :key="i"
                class="voting-nav-dropdown__option"
                @click="setSorting(opt)"
              >
                по {{ opt.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="voting-list">
        <div 
          v-for="(item, i) in photos"
          :key="i"
          class="voting-list__item"
          @click="$modal.show('image', { src: item.path })"
        >
          <div class="voting-list__item-img-wrapper">
            <img :src="item.path" alt="" class="voting-list__item-img">
          </div>
          <div class="voting-list__item-rating">
            <span>{{ item.rating }}</span>
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.16712 16.7547C5.16712 17.3378 4.66206 17.8432 4.0793 17.8432H1.08781C0.505057 17.8432 0 17.3378 0 16.7547V8.24129C0 7.65818 0.505057 7.15282 1.08781 7.15282H4.0793C4.66206 7.15282 5.16712 7.65818 5.16712 8.24129V16.7547ZM17.8712 10.1072C18.2209 10.3794 18.4151 10.807 18.4151 11.2735C18.4151 11.9732 17.9101 12.5563 17.2885 12.7118C17.6381 12.9839 17.8324 13.4115 17.8324 13.878C17.8324 14.5778 17.3273 15.1609 16.6669 15.3164C17.0165 15.5885 17.2108 16.0161 17.2108 16.4826C17.2108 17.2989 16.5503 17.9598 15.7345 17.9598L7.34275 17.8821C6.75999 17.8821 6.25493 17.3767 6.25493 16.7936V8.24129C6.25493 6.8807 10.5285 4.43164 10.7616 3.07105C10.917 2.21582 10.7227 0 11.3055 0C12.3156 0 13.5977 0.388741 13.5977 2.60456C13.5977 4.54826 12.3156 7.11395 12.3156 7.11395H17.5216C18.3374 7.11395 18.9979 7.77481 18.9979 8.59116C19.0368 9.36864 18.5317 9.95175 17.8712 10.1072Z" fill="#005532"/>
              <path d="M5.16712 16.7547C5.16712 17.3378 4.66206 17.8432 4.0793 17.8432H1.08781C0.505057 17.8432 0 17.3378 0 16.7547V8.24129C0 7.65818 0.505057 7.15282 1.08781 7.15282H4.0793C4.66206 7.15282 5.16712 7.65818 5.16712 8.24129V16.7547Z" fill="#005532"/>
              <path d="M17.8712 10.1072C18.2209 10.3794 18.4151 10.807 18.4151 11.2735C18.4151 11.9732 17.9101 12.5563 17.2885 12.7118C17.6381 12.9839 17.8324 13.4115 17.8324 13.878C17.8324 14.5778 17.3273 15.1609 16.6669 15.3164C17.0165 15.5885 17.2108 16.0161 17.2108 16.4826C17.2108 17.2989 16.5503 17.9598 15.7345 17.9598L7.34275 17.8821C6.75999 17.8821 6.25493 17.3767 6.25493 16.7936V8.24129C6.25493 6.8807 10.5285 4.43164 10.7616 3.07105C10.917 2.21582 10.7227 0 11.3055 0C12.3156 0 13.5977 0.388741 13.5977 2.60456C13.5977 4.54826 12.3156 7.11395 12.3156 7.11395H17.5216C18.3374 7.11395 18.9979 7.77481 18.9979 8.59116C19.0368 9.36864 18.5317 9.95175 17.8712 10.1072Z" fill="#005532"/>
            </svg>
          </div>
        </div>
      </div>
      <button class="voting__show-more btn btn--bordered btn--lg" @click="showMore()">ещё</button>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    openDropdown: false,
    sortBy: 'rating',
    sortingList: [
      {
        text: 'рейтингу',
        value: 'rating',
      },
      {
        text: 'дате',
        value: 'date',
      }
    ],
    photos: [
    {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 123
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 123
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      }
    ],
    photosDefault: [
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 123
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 123
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 346
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      },
      {
        path: "https://poetti.emlsdr.ru/1.jpg",
        rating: 367
      }
    ]
  }),
  methods: {
    setSorting(opt) {
      this.sortBy = opt.value;
      this.openDropdown = false;
    },
    showMore() {
      for (let index = 0; index < this.photosDefault.length; index++) {
        const element = this.photos[index];
        this.photos.push(element)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.voting {
  position: relative;
  padding-top: rem(50px);
  padding-bottom: rem(160px);
  z-index: 1;
  &-nav {
    display: flex;
    flex-direction: column;
    margin-top: rem(35px);
    margin-bottom: rem(66px);
    &__btn {
      margin-bottom: rem(15px);
      padding: 0 rem(0px);
      font-size: rem(16px);
      letter-spacing: normal;
    }
    &-dropdown {
      position: relative;
      flex: 0 0 calc(33% - #{rem(20px)});
      &__trigger {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 rem(80px);
        svg {
          position: absolute;
          top: 50%;
          right: rem(40px);
          transform: translateY(-50%);
          width: rem(22px);
          margin-left: rem(17px);
          path {
            stroke: $yellow;
            transition: .4s;
          }
        }
        &:hover,
        .active & {
          svg {
            path {
              stroke: #000;
            }
          }
        }
        .active & {
          background: $yellow;
          color: #000;
          svg {
            transform: translateY(-50%) rotate(180deg);
          }
        }
      }
      &__content {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        opacity: 0;
        transition: .4s;
        pointer-events: none;
        background: $brown;
        border: 1px solid $yellow;
        z-index: 1;
        .active & {
          pointer-events: all;
          opacity: 1;
        }
      }
      &__option {
        padding: rem(15px) rem(40px);
        line-height: rem(50px);
        font-size: rem(16px);
        text-transform: uppercase;
        transition: .4s;
        cursor: pointer;
        &:hover {
          background: $yellow;
          color: #000;
        }
      }
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: calc(100% + #{rem(30px)});
    margin: 0 rem(-14px) rem(40px) rem(-14px);
    height: rem(370px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: rem(3px);
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba($yellow,.6);
      border-radius: 0px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: $yellow;
      transition: all 0.3s ease-in-out;
    }
    &__item {
      width: rem(150px);
      margin: 0 rem(14px) rem(25px);
      padding: rem(14px) rem(14px) 0;
      background: $grey;
      cursor: pointer;
      &-img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        &-wrapper {
          position: relative;
          &::after {
            content: '';
            width: 0;
            display: block;
            padding-top: 100%;
          }
        }
      }
      &-rating {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: rem(5px) 0;
        font-size: rem(16px);
        color: $green;
        svg {
          width: rem(12px);
          margin-left: rem(9px);
        }
      }
    }
  }
  &__show-more {
    width: 50%;
    margin: 0 auto;
  }
  @media (min-width: $sm) {
    padding-top: rem(100px);
    padding-bottom: rem(180px);
    .section-title {
      margin-bottom: rem(65px);
    }
    &-nav {
      flex-direction: row;
      justify-content: space-between;
      margin-top: 0;
      &__btn {
        flex: 0 0 calc(33% - #{rem(18px)});
        margin-bottom: 0;
        padding: 0 rem(30px);
        font-size: rem(17px);
        letter-spacing: rem(1px);
      }
    }
    &-list {
      width: calc(100% + #{rem(80px)});
      height: rem(645px);
      margin: 0 rem(-45px) rem(0px) rem(-35px);
      &__item {
        width: rem(222px);
        margin: 0 rem(35px) rem(70px);
        padding: rem(20px) rem(20px) 0;
        &-rating {
          font-size: rem(24px);
          svg {
            width: rem(19px);
          }
        }
      }
    }
    &__show-more {
      width: auto;
      margin-right: 0;
      margin-left: auto;
    }
  }
}
</style>