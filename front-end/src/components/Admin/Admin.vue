<template>
  <div class="container">
    <h1>Restaurant System Admin</h1>
    <div class="row">
      <b-list-group>
        <b-list-group-item variant="primary" @click="toBill" button>Bill</b-list-group-item>
        <b-list-group-item variant="primary" @click="toManage" button>increase/decrease Food or Drink</b-list-group-item>
        <b-list-group-item variant="primary" @click="toEmp" button>Manage Employee</b-list-group-item>
        <b-list-group-item variant="primary" @click="toTable" button>Clear Table</b-list-group-item>
        <b-list-group-item variant="primary" @click="toComment" button>Comment</b-list-group-item>
        <b-list-group-item variant="primary" @click="logout" button>Logout</b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Admin',
  methods: {
    // signout Admin
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/login')
      })
    },
    toComment: function () {
      this.$router.replace('/view')
    },
    toManage: function () {
      this.$router.replace('/manage')
    },
    toEmp: function () {
      this.$router.replace('/emp')
    },
    toBill: function () {
      this.$router.replace('/receive')
    },
    toTable: function () {
      this.$router.replace('/managetable')
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.row {
  margin-left: 39%;
}
</style>
