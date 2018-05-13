<template>
<b-row class="justify-content-md-center">
  <b-col cols="6">
    <h2>Пройдите регистрацию</h2>
    <div v-if="errors && errors.length">
      <div v-for="erorr of errors">
        <b-alert show>{{error.message}}</b-alert>
      </div>
    </div>
    <b-form @submit="onSubmit">
      <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Введите ваше имя"
      >
        <b-form-input id="username" :state="state" v-model.trim="register.username"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Введите ваш email"
      >
        <b-form-input id="email" :state="state" v-model.trim="register.email"></b-form-input>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Введите ваш пароль"
      >
        <b-form-input id="password" :state="state" v-model.trim="register.password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Регистрация</b-button>
      <b-button type="button" variant="success" @click="$router.go(-1)">Отмена</b-button>
    </b-form>
  </b-col>
</b-row>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      register: [],
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/auth/register`, this.register)
        .then(response => {
          alert("Регистрация произведена")
          this.$router.push({
            name: 'Login'
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    },
  }
}
</script>

<style scoped>

</style>
