<template>
<b-row>
  <b-col cols="12">
    <h2>
      Документы
      <b-link href="#/add-document">Новый</b-link>
      <b-link @click="logout()">Выход</b-link>
    </h2>
    <b-table stripped hover :items="documents" :fields="fields">
      <template slot="actions" class="row">
        <b-btn size="sm" @click.stop="delaitl(row.item)">Посмотреть</b-btn>
      </template>
    </b-table>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </b-col>
</b-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DocumentList',
  data () {
    return {
      fields: {
        type: {label: 'Тип', sortable: true, 'class': 'text-center'},
        title: {label: 'Заголовок', sortable: true},
        status: {label: 'Статус', sortable: true, 'class': 'text-center'},
        actions: {label: 'Действия', 'class': 'text-center'}
      },
      documents: [],
      errors: []
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`http://localhost:3000/document`)
      .then(response => {
        this.documents = response.data
      })
      .catch(e => {
        this.errors.push(e)
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
  },
  methods: {
    details (document) {
      this.$router.push({
        name: 'Show.Document',
        params: {id: document._id}
      })
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped>

</style>
