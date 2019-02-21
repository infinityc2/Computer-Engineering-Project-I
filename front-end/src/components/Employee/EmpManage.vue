<template>
  <div class="container">
    <h1>Restaurant System Employee</h1>
    <div class="row">
      <b-list-group style="min-width: 200px;">
        <b-list-group-item variant="primary" @click="toBill" button>Bill</b-list-group-item>
        <b-list-group-item variant="primary" @click="toStock" button>Stock</b-list-group-item>
        <b-list-group-item variant="primary" @click="toService" button>Service</b-list-group-item>
        <b-list-group-item variant="primary" @click="toTable" button>Clear Table</b-list-group-item>
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
    // signout
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/emplogin')
      })
    },
    toTable: function () {
      this.$router.replace('/cleartable')
    },
    toBill: function () {
      this.$router.replace('/empbill')
    },
    toStock: function () {
      this.$router.replace('/stock')
    },
    toService: function () {
      this.$router.replace('/service')
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
