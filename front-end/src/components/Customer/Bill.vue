<template>
    <div class="container">
        <button class="btn btn-primary" @click="toHome">Back</button>
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">Bill</h5>
              <ul class="list-group" v-for="menu in menus" :key="menu.id">
                  <li class="list-group-item">
                    <div v-for="order in orders" :key="order.id">
                      <div v-if="order.gen===menu.gen">
                        <img :src="menu.img">
                        {{menu.order_id}}<br>
                        Qty: {{menu.amount}}<br>
                        time: {{order.time}}<br>
                        price: {{order.totalPrice}}<br>
                      </div>
                    </div>
                  </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Bill',
  data () {
    return {
      orders: [],
      menus: []
    }
  },
  methods: {
    toHome: function () {
      this.$router.replace('/home')
    }
  },
  created () {
    const database = firebase.database()
    const orderRef = database.ref('Order')

    orderRef.on('child_added', snapshot => {
      if (snapshot.hasChild('status') && snapshot.child('status').val() === 'no purchase') {
        this.orders.push({...snapshot.val(), id: snapshot.key})
        for (var i = 0; i < snapshot.child('menu').numChildren(); i++) {
          this.menus.push({
            amount: snapshot.child('menu').child(i).child('amount').val(),
            order_id: snapshot.child('menu').child(i).child('order_id').val(),
            time: snapshot.child('menu').child(i).child('time').val(),
            gen: snapshot.child('menu').child(i).child('gen').val(),
            img: snapshot.child('menu').child(i).child('img').val()
          })
        }
      }
    })
  }
}
</script>

<style scoped>
button {
    margin: 5px
}
img {
  width: 100px;
  height: 100px;
}
</style>
