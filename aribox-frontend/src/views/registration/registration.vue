<template>
  <div class="registration">
    <TransitionComponent>
      <template>
        <Loader :isLoading="isLoading" v-if="isLoading"/>

        <form v-else @submit.prevent="sendData" class="registration__form">
          <span class="registration__form-error">
            {{error}}
          </span>

          <AppInput
              label="Введите имя"
              type="text"
              :error="errors.name"
              @setValue="setValue($event, 'name')"/>

          <AppInput
              label="Введите email"
              type="email"
              :error="errors.email"
              @setValue="setValue($event, 'email')"/>

          <AppInput
              label="Введите пароль"
              type="password"
              :error="errors.password"
              @setValue="setValue($event, 'password')"/>

          <AppInput
              label="Подтвердите пароль"
              type="password"
              :error="errors.passwordConfirm"
              @setValue="setValue($event, 'passwordConfirm')"/>
          <AppButton/>
        </form>
      </template>
    </TransitionComponent>
  </div>
</template>

<script>
import AppInput from "Components/app-input";
import {mapActions} from "vuex";
import AppButton from "Components/app-button/app-button";
import Loader from 'Components/loader';
import TransitionComponent from 'Components/transition-component';

export default {
  name: "login",
  components: {AppButton, AppInput, Loader, TransitionComponent},
  data () {
    return {
      data: {
        email: '',
        name: '',
        password: '',
        passwordConfirm: ''
      },
      isLoading: false,
      errors: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      error: '',
    }
  },

  methods: {
    ...mapActions(['REGISTRATION']),

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
        if(data.password !== data.passwordConfirm) {
          errors.password = errors.passwordConfirm = 'Пароли должны совпдать';
        } else {
          try {
            this.isLoading = true;
            const res = await this.REGISTRATION(data);

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
    }
  }
}
</script>

<style lang="scss">
  @import './styles.scss';
</style>
