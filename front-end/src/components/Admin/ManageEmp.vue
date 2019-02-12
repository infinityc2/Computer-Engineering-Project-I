<template>
    <div class="container">
        <button type="button" class="btn btn-primary" @click="toAdmin">Back</button>
        <div class="card" >
            <div class="card-body">
                <h5 class="card-title">Manage Employee</h5>
                <b-input-group size="md" prepend="username">
                    <b-form-input v-model="username"></b-form-input>
                </b-input-group>
                <br>
                <b-input-group size="md" prepend="password">
                    <b-form-input type="password" v-model="password"></b-form-input>
                </b-input-group>
                <br>
                <button type="button" class="btn btn-primary" @click="addEmp">Add</button>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="card" v-for="employee in employees" :key="employee.id">
                    <p>
                        <b>id:</b> {{employee.emp_name}}<br>
                        <b>password:</b> {{employee.emp_password}}<br>
                    </p>
                    <button type="button" class="btn btn-link" @click.prevent="deleteEmp(employee)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ManageEmp',
  data () {
    return {
      employees: [],
      username: '',
      password: ''
    }
  },
  methods: {
    addEmp: function () {
      const database = firebase.database()
      const empRef = database.ref('Employee')
      empRef.push({
        emp_name: this.username,
        emp_password: this.password
      })

      firebase.auth().createUserWithEmailAndPassword(this.username, this.password).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        alert(errorCode + ' ' + errorMessage)
      })
    },
    deleteEmp: function (employee) {
      const database = firebase.database()
      const empRef = database.ref('Employee')
      empRef.child(employee.id).remove()
    },
    toAdmin: function () {
      this.$router.replace('/admin')
    }
  },
  created () {
    const database = firebase.database()
    const empRef = database.ref('Employee')

    empRef.on('child_added', snapshot => {
      this.employees.push({...snapshot.val(), id: snapshot.key})
    })
    empRef.on('child_removed', snapshot => {
      const deleteEmp = this.employees.find(employee => employee.id === snapshot.key)
      const index = this.employees.indexOf(deleteEmp)
      this.employees.splice(index, 1)
    })
    empRef.on('child_changed', snapshot => {
      const updateEmp = this.employees.find(employee => employee.id === snapshot.key)
      updateEmp.emp_name = snapshot.val().emp_name
      updateEmp.emp_password = snapshot.val().emp_password
    })
  }
}
</script>

<style scoped>
.container{
    margin-top: 5px;
}
button {
    margin: 2.5px;
}
</style>
