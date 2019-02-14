<template>
    <div class="container">
      <div class="card">
          <form>
              <label><h3>Employee Login</h3></label>
              <div class="form-group">
                  <label>Username</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" v-model="username">
              </div>
              <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
              </div>
              <router-link to="/login">Admin?</router-link><br>
              <button type="submit" class="btn btn-primary" v-on:click="login">Submit</button>
          </form>
      </div>
  </div>
</template>

<script>
// firebase for Authenication
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      // set default username and password NULL
      username: '',
      password: '',
      emps: []
    }
  },
  methods: {
    // function to login if success direct to admin page else error
    login: function () {
      for (var i = 0; i < this.emps.length; i++) {
        if (this.username === this.emps[i].emp_name /* && this.password === this.emps[i].emp_password */) {
          firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
            (user) => {
              this.$router.replace('/empmanage')
            },
            (err) => {
              alert('Sorry! ' + err.message)
            }
          )
        }
      }
    }
  },
  created () {
    const database = firebase.database()
    const empRef = database.ref('Employee')

    empRef.on('child_added', snapshot => {
      this.emps.push({...snapshot.val(), id: snapshot.key})
    })
  }
}
</script>

<style scoped>
  .card {
    max-width: 500px;
    width: auto;
    height: auto;
    margin: auto;
  }
  form {
    margin: 50px;
  }
  .container {
    margin-top: 50px;
    align-self: auto;
  }
</style>
