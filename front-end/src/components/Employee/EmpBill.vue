<template>
  <div class="container">
    <button class="btn btn-primary" @click="toAdmin">Back</button>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Bill</h5>
          <div class="card" v-for="order in orders" :key="order.id">
            order id: <strong>{{order.id}}</strong><br>
            status: {{order.status}}<br>
            table: {{order.table_id}}<br>
            amount order: {{order.amount_order}}<br>
            time: {{order.time}}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Menu</h5>
          <div class="card" v-for="(menu, index) in menus" :key="menu.id">
            {{index+1}}.
            menu id: {{menu.order_id}}<br>
            amount: {{menu.amount}}<br>
            time: {{menu.time}}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Receive',
  data () {
    return {
      bills: [],
      orders: [],
      listOrders: [],
      // list of food and drink
      foods: [],
      drinks: [],
      menus: []
    }
  },
  methods: {
    toAdmin: function () {
      this.$router.replace('/empmanage')
    }
  },
  created () {
    const database = firebase.database()
    const billRef = database.ref('Bill')
    const listOrderRef = database.ref('List_Order')
    const orderRef = database.ref('Order')
    const foodRef = database.ref('Food')
    const drinkRef = database.ref('Drink')

    billRef.on('child_added', snapshot => {
      this.bills.push({...snapshot.val(), id: snapshot.key})
    })
    orderRef.on('child_added', snapshot => {
      this.orders.push({...snapshot.val(), id: snapshot.key})
      for (var i = 0; i < snapshot.child('menu').numChildren(); i++) {
        this.menus.push({
          amount: snapshot.child('menu').child(i).child('amount').val(),
          order_id: snapshot.child('menu').child(i).child('order_id').val(),
          time: snapshot.child('menu').child(i).child('time').val()
        })
      }
    })
    listOrderRef.on('child_added', snapshot => {
      this.listOrders.push({...snapshot.val(), id: snapshot.key})
    })
    foodRef.on('child_added', snapshot => {
      this.foods.push({...snapshot.val(), id: snapshot.key})
    })
    drinkRef.on('child_added', snapshot => {
      this.drinks.push({...snapshot.val(), id: snapshot.key})
    })
    orderRef.on('child_removed', snapshot => {
      const deleteOrder = this.orders.find(order => order.id === snapshot.key)
      const index = this.orders.indexOf(deleteOrder)
      this.orders.splice(index, 1)
    })
    orderRef.on('child_changed', snapshot => {
      const updateOrder = this.orders.find(order => order.id === snapshot.key)
      updateOrder.menu = snapshot.val().menu
      updateOrder.status = snapshot.val().status
      updateOrder.table_id = snapshot.val().table_id
    })
  }
}
</script>

<style scoped>
.card {
    margin-top: 5px;
}
button {
    margin-top: 5px;
    width: auto;
    max-width: 100px;
}
</style>
