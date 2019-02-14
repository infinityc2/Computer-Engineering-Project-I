<template>
    <div class="container">
      <button @click="toHome" type="button" class="btn btn-primary">Back</button>
      <b-card title="Service">
        <label>Table</label>
        <select class="form-control" id="exampleFormControlSelect1" v-model="tableNumber">
          <option v-for="table in tables" :key="table.id">
              <div v-if="table.status===true">
                {{table.Table_id}}
              </div>
            </option>
        </select>
        <label>Call</label>
        <select class="form-control" v-model="service">
          <option value="bill please">bill please</option>
          <option value="call employee">call employee</option>
        </select>
        <b-button @click="sentService" class="sent">Sent</b-button>
      </b-card>
      <b-card title="Comment">
          <b-form-textarea id="textarea1" v-model="content" placeholder="Enter Message" :rows="3" :max-rows="6" :maxlength="100"></b-form-textarea>
          <b-button @click="sentMessage">Sent</b-button>
      </b-card>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Comments',
  data () {
    return {
      commentText: [],
      content: '',
      list: [],
      bill: [],
      time_start: undefined,
      time_end: undefined,
      employee: [],
      emp_name: '',
      emp_password: '',
      tables: [],
      services: [],
      tableNumber: '',
      service: ''
    }
  },
  methods: {
    // post comment to firebase
    sentMessage: function () {
      // declare database
      const database = firebase.database()
      // reference table from firebase
      const commentRef = database.ref('Comment')
      /* var currentDate = new Date()
      var date = currentDate.getDate()
      var month = currentDate.getMonth()
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours()
      var minute = currentDate.getMinutes()
      this.times = date + '/' + month + '/' + year + ' ' + hour + ':' + minute
      // messages and tables variable don't be null
      // add comment to firebase
      if (this.messages !== '' && this.tables !== '') {
        commentRef.push({
          message: this.messages,
          table: this.tables,
          time: this.times
        })
        this.messages = ''
      } else {
        alert('please! enter message and table number')
      } */
      commentRef.push({
        content: this.content
      })
      this.content = ''
    },
    toHome: function () {
      this.$router.replace('/home')
    },
    sentService: function () {
      const database = firebase.database()
      const serviceRef = database.ref('Service')
      var currentDate = new Date()
      var date = currentDate.getDate()
      var month = currentDate.getMonth()
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours()
      var minute = currentDate.getMinutes()

      if (this.tableNumber !== '' && this.service !== '') {
        serviceRef.push({
          service: this.service,
          table: this.tableNumber,
          time: date + '/' + month + '/' + year + ' ' + hour + ':' + minute
        })
      } else {
        alert('please select table number')
      }
    }
  },
  // created will run always similar constructor
  created () {
    const database = firebase.database()
    const commentRef = database.ref('Comment')
    const tableRef = database.ref('Table')
    const serviceRef = database.ref('Service')
    // if event child_added push data to commentText
    commentRef.on('child_added', snapshot => {
      this.commentText.push(snapshot.val())
      // console.log(snapshot.val())
      // console.log(this.commentText.length)
    })
    tableRef.on('child_added', snapshot => {
      this.tables.push({...snapshot.val(), id: snapshot.key})
    })
    serviceRef.on('child_added', snapshot => {
      this.services.push({...snapshot.val(), id: snapshot.key})
    })
  }
}
</script>

<style scoped>
h5, p {
  margin: 5px;
}
.container {
  width: 700px;
  margin-top: 5px;
}
#textarea1 {
  margin-bottom: 5px;
}
.sent {
  margin-top: 5px;
}
</style>
