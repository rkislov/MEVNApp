<template>
<b-row class="justify-content-md-center">
  <b-col cols="6">
    <div v-if="errors && errors.length">
      <div v-for="error of errors">
        <b-alert show>{{error.message}}</b-alert>
      </div>
    </div>
    <b-form @submit="onSubmit">
      <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breackpoint="md"
                    label="Имя пользователя">
        <b-form-input id="username" :state="state" v-model.trim="login.username"></b-form-input>
      </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                      horizontal
                      :label-cols="4"
                      breackpoint="md"
                      label="Пароль">
          <b-form-input id="password" :state="state" v-model.trim="login.password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Вход</b-button>
        <b-button type="submit" variant="success" @click.stop="register()">Регистрация</b-button>
    </b-form>
  </b-col>
</b-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      login: [],
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/auth/login`, this.login)
        .then(response => {
          localStorage.setItem('jwtToken', response.data.token)
          this.$router.push({
            name: 'DocumentList'
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    },
    register () {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>

<style scoped>

</style>
