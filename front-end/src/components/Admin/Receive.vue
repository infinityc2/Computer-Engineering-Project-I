<template>
  <div class="container">
    <button class="btn btn-primary" @click="toAdmin">Back</button>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Bill</h5>
          <div class="card" v-for="order in orders" :key="order.id">
            <div v-if="order.status==='purchased'">
              status: {{order.status}}<br>
            table: {{order.table_id}}<br>
            amount order: {{order.amount_order}}<br>
            time: {{order.time}}<br>
            total price: {{order.totalPrice}}
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Menu</h5>
                <div v-for="menu in menus" :key="menu.id">
                  <div v-if="menu.gen===order.gen">
                    name: {{menu.order_id}}<br>
                    amount: {{menu.amount}}<br>
                    time: {{menu.time}}<br>
                    price: {{menu.price}}
                    <div class="dropdown-divider"></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="order!==edit_status">
                <button type="button" class="btn btn-link" @click.prevent="editStatus(order)">Edit</button>
            </div>
            <div v-else>
              <select class="form-control" v-model="status">
                <option value="no purchase">no purchase</option>
                <option value="inprogress">inprogress</option>
                <option value="purchased">purchased</option>
              </select>
              <br>
              <button type="button" class="btn btn-link" @click.prevent="cancel">Cancel</button>
              <button type="button" class="btn btn-link" @click.prevent="updateStatus(order)">Update</button>
            </div>
            </div>
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

      // check expand list
      isExpand: null,

      // list of food and drink
      foods: [],
      drinks: [],

      status: '',
      edit_status: null,
      menus: []
    }
  },
  methods: {
    toAdmin: function () {
      this.$router.replace('/admin')
    },
    expand: function () {
      this.isExpand = !this.isExpand
    },
    editStatus: function (order) {
      this.edit_status = order
      this.status = order.status
    },
    cancel: function () {
      this.edit_status = null
    },
    updateStatus: function (order) {
      const database = firebase.database()
      const orderRef = database.ref('Order')
      orderRef.child(order.id).update({status: this.status})
      this.cancel()
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
          time: snapshot.child('menu').child(i).child('time').val(),
          gen: snapshot.child('menu').child(i).child('gen').val(),
          price: snapshot.child('menu').child(i).child('price').val()
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
