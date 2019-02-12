<template>
  <div class="container">
    <button class="btn btn-primary" @click="toAdmin">Back</button>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">History</h5>
        <div class="card" v-for="order in orders" :key="order.id">
          <div v-if="order.status==='purchased'">
            order id: <strong>{{order.id}}</strong><br>
            status: {{order.status}}<br>
            table: {{order.table_id}}<br>
            amount order: {{order.amount_order}}<br>
            time: {{order.time}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Purchased',
  data () {
    return {
      orders: []
    }
  },
  methods: {
    toAdmin: function () {
      this.$router.replace('/admin')
    }
  },
  created () {
    const database = firebase.database()
    const orderRef = database.ref('Order')

    orderRef.on('child_added', snapshot => {
      this.orders.push({...snapshot.val(), id: snapshot.key})
    })
  }
}
</script>

<style scoped>

</style>
