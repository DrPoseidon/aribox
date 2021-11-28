<template>
  <div class="payment">
    <div class="card">
      <div class="payment__card-main">
        <img src="@/assets/img/logo.png" class="payment__card-main-logo">

        <input
            :class="{error: errors.includes('number')}"
            placeholder="Номер карты"
            type="text"
            class="payment__card-main-card-number"
            v-mask="'#### #### #### ####'"
            v-model="card.number">

        <div>
          <input
              :class="{error: errors.includes('name')}"
              type="text"
              class="payment__card-main-name"
              placeholder="Имя держателя карты"
              v-model="card.name"
          >

          <div>
            <span>Действует до:</span>

            <input
                :class="{error: errors.includes('month')}"
                class="payment__card-date"
                type="text"
                v-mask="'##'"
                v-model="card.month"
                placeholder="ММ"
            >
            <input
                :class="{error: errors.includes('year')}"
                class="payment__card-date"
                type="text"
                v-mask="'####'"
                v-model="card.year"
                placeholder="ГГ"
            >
          </div>
        </div>
      </div>


      <div class="payment__card-additional">
        <input
            :class="{error: errors.includes('cvc')}"
            class="payment__card-additional-cvc"
            type="text"
            v-model="card.cvc"
            v-mask="'###'"
            placeholder="CVC/CVV"
        >
        <span>Код с обратной стороны</span>

        <button @click="sendPayment" class="payment__card-additional-button">
          Оплатить
        </button>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "payment.js",

  data() {
    return {
      card: {
        name: '',
        number: '',
        month: '',
        year: '',
        cvc:'',
      },
      errors: [],
    }
  },

  methods: {
    sendPayment() {
      this.errors = Object.keys(this.card).reduce((acc, key) => {
        if(!this.card[key]) {
          acc.push(key)
        }

        return acc;
      },[])

      console.log(this.errors);
    }
  }
}
</script>

<style lang="scss">
  @import './styles.scss'
</style>
