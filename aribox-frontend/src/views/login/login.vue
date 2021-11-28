<template>
  <div class="login">


    <TransitionComponent>
        <template>
          <Loader :isLoading="isLoading" v-if="isLoading"/>

          <form v-else @submit.prevent="sendData" class="login__form">
            <span class="login__form-error">
              {{error}}
            </span>

            <div class="login__form-item">
              <AppInput
                  label="Введите email"
                  type="email"
                  id="email"
                  :error="errors.email"
                  @setValue="setValue($event, 'email')"/>
            </div>

            <div class="login__form-item">
              <AppInput
                  label="Введите пароль"
                  type="password"
                  id="password"
                  :error="errors.password"
                  @setValue="setValue($event, 'password')"/>
            </div>

            <button
                type="submit"
                class="login__form-button">
              Войти
            </button>
          </form>
      </template>
    </TransitionComponent>


  </div>
</template>

<script>
import AppInput from "Components/app-input";
import Loader from 'Components/loader';
import TransitionComponent from 'Components/transition-component';
import {mapActions} from 'vuex';

export default {
  name: "login",

  components: {
    AppInput,
    Loader,
    TransitionComponent
  },

  data () {
    return {
      isLoading: false,
      data: {
        email: '',
        password: '',
      },
      focused: {
        email: false,
        password: false
      },
      errors: {
        email: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    ...mapActions(['LOGIN']),

    async sendData() {
      const {data, errors} = this;
      let isEmpty = false;

      Object.keys(data).forEach(key =>{
        if(!data[key].length) {
          errors[key] = 'Поле не должно быть пустым';
          isEmpty = true;
        } else {
          errors[key] = '';
        }
      })

      if(!isEmpty) {
        try {
          this.isLoading = true;
          const res = await this.LOGIN(data);

          if(res.error) {
            this.error = res.error
          }

          if(res.status === 200) {
            await this.$router.push('/');
          }
        } catch(e) {
          console.log(e)
        } finally {
          setTimeout(() => {
            this.isLoading = false;
          },500)
        }
      }
    },

    changeFocus(type, value) {
      this.focused[type] = value;
    },

    getStyle(type) {
      return {'bottom': this.focused[type] ? '32px' : '7px', 'color': !this.focused[type] && this[type] ? 'transparent' : 'black'}
    },

    setValue(value, key) {
      this.data[key] = value;

      if (value.length) {
        this.errors[key] = ''
      }
    }
  },

  mounted() {

  }
}
</script>

<style lang="scss">
  @import './styles.scss';
</style>
