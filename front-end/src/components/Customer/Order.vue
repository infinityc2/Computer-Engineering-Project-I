<template>
    <div class="container">
      <div class="button-b">
        <button @click="toHome" type="button" class="btn btn-primary">Back</button>
        <button @click="toSubmit(tableNumber)" type="button" class="btn btn-primary">Submit</button>
      </div>
      <div class="row">
        <div class="col">
          <div>
            <label for="exampleFormControlSelect1">Basket</label>
            <div class="form-group">
          <label>Table {{tableNumber}}</label><br>
          <label>Total price: {{sumTotalPrice}}</label>
          <select class="form-control" id="exampleFormControlSelect1" v-model="tableNumber">
            <option v-for="table in tables" :key="table.id">
              <div v-if="table.status===true">
                {{table.Table_id}}
              </div>
            </option>
          </select>
        </div>
            <div class="card">
              <ul class="list-group" v-for="menuList in menuLists" :key="menuList.id">
                <li class="list-group-item">
                {{menuList.order_name}}: {{menuList.order_price}}
                <button type="button" class="btn btn-link" @click.prevent="deleteMenu(menuList)">Delete Menu</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div>
        <div class="card">
          <div class="card-body">
              <h5 class="card-title">Food</h5>
              <div class="card" v-for="food in foods" :key="food.id">
                  <div class="detail">
                      <div class="detail-content" v-if="food.status !== 'out of stock'">
                          <img v-bind:src="food.source">
                          <button type="button" class="btn btn-link" @click.prevent="addMenuFood(food)">Add</button>
                          {{food.food_name}} : {{food.price}}
                          <input type="number" class="form-control" v-model="orderQty">
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
        </div>
        <div class="col">
          <div class="card">
          <div class="card-body">
              <h5 class="card-title">Drink</h5>
              <div class="card" v-for="drink in drinks" :key="drink.id">
                  <div class="detail">
                      <div class="detail-content" v-if="drink.status !== 'out of stock'">
                          <img v-bind:src="drink.source">
                          <button type="button" class="btn btn-link" @click.prevent="addMenuDrink(drink)">Add</button>
                          {{drink.drink_name}} : {{drink.price}}
                          <input type="number" class="form-control" v-model="orderQty">
                      </div>
                  </div>
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
  name: 'Order',
  data () {
    return {
      // food
      foods: [],

      // drink
      drinks: [],

      // order
      orders: [],
      orderList: '',
      orderPrice: 0,
      orderQty: 1,
      basket: [],
      tableNumber: '',
      tables: [],

      // menu
      menuLists: [],
      totalPrice: '',
      sumTotalPrice: 0,
      total_amount: 0,
      random: null
    }
  },
  methods: {
    addMenuFood: function (food) {
      // time
      var currentDate = new Date()
      var date = currentDate.getDate()
      var month = currentDate.getMonth()
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours()
      var minute = currentDate.getMinutes()
      this.totalPrice = food.price * this.orderQty
      this.sumTotalPrice = this.totalPrice + this.sumTotalPrice
      this.basket.push({
        order_id: food.food_name,
        amount: this.orderQty,
        time: date + '/' + month + '/' + year + ' ' + hour + ':' + minute,
        img: food.source,
        gen: this.random,
        price: this.totalPrice
      })
      this.menuLists.push({
        order_id: food.id,
        order_name: food.food_name,
        order_qty: this.orderQty,
        order_price: this.totalPrice
      })
      this.total_amount = this.total_amount + 1
    },
    addMenuDrink: function (drink) {
      // const database = firebase.database()
      // const orderRef = database.ref('Order')
      // time
      var currentDate = new Date()
      var date = currentDate.getDate()
      var month = currentDate.getMonth()
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours()
      var minute = currentDate.getMinutes()
      this.totalPrice = drink.price * this.orderQty
      this.sumTotalPrice = this.totalPrice + this.sumTotalPrice
      this.basket.push({
        order_id: drink.drink_name,
        amount: this.orderQty,
        time: date + '/' + month + '/' + year + ' ' + hour + ':' + minute,
        img: drink.source,
        gen: this.random,
        price: this.totalPrice
      })
      this.menuLists.push({
        order_id: drink.id,
        order_name: drink.drink_name,
        order_qty: this.orderQty,
        order_price: this.totalPrice
      })
      this.total_amount = this.total_amount + 1
      /* orderRef.push({
        order_id: drink.id,
        amount: this.orderQty,
        stat: false,
        time: date + '/' + month + '/' + year + ' ' + hour + ':' + minute
      }) */
    },
    toHome: function () {
      this.$router.replace('/home')
    },
    toSubmit: function (tableNumber) {
      const database = firebase.database()
      const orderRef = database.ref('Order')

      const listOrderRef = database.ref('List_Order')

      var currentDate = new Date()
      var date = currentDate.getDate()
      var month = currentDate.getMonth()
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours()
      var minute = currentDate.getMinutes()
      // var temp = []
      /* temp.push(this.basket, {
        status: 'no purchase',
        table_id: tableNumber
      })
      orderRef.push(temp) */
      if (tableNumber !== '') {
        orderRef.push({
          menu: this.basket,
          status: 'no purchase',
          table_id: tableNumber,
          amount_order: this.total_amount,
          time: date + '/' + month + '/' + year + ' ' + hour + ':' + minute,
          totalPrice: this.sumTotalPrice,
          gen: this.random
        })
        listOrderRef.push(this.basket)
        this.total_amount = 0
        this.basket.pop()
        this.menuLists.pop()
        this.$router.replace('/bill')
      } else {
        alert('Please select table number!')
      }
    },
    deleteMenu: function (menu) {
      // const deleteDrink = this.drinks.find(drink => drink.id === snapshot.key)
      // const index = this.drinks.indexOf(deleteDrink)
      // this.drinks.splice(index, 1)
      const deleteMenu = this.menuLists.find(del => menu.order_id === del.order_id)
      const indexMenu = this.menuLists.indexOf(deleteMenu)
      this.menuLists.splice(indexMenu, 1)

      const deleteBasket = this.basket.find(del => menu.order_id === del.order_id)
      const indexBasket = this.basket.indexOf(deleteBasket)
      this.basket.splice(indexBasket, 1)
    }
  },
  created () {
    const database = firebase.database()
    const foodRef = database.ref('Food')
    const drinkRef = database.ref('Drink')
    const orderRef = database.ref('Order')
    const tableRef = database.ref('Table')
    foodRef.on('child_added', snapshot => {
      this.foods.push({...snapshot.val(), id: snapshot.key})
    })
    drinkRef.on('child_added', snapshot => {
      this.drinks.push({...snapshot.val(), id: snapshot.key})
    })
    orderRef.on('child_added', snapshot => {
      this.orders.push({...snapshot.val(), id: snapshot.key})
    })
    tableRef.on('child_added', snapshot => {
      this.tables.push({...snapshot.val(), id: snapshot.key})
    })
    this.random = Math.random().toString(20).substring(5)
  }
}
</script>

<style scoped>
.card {
  margin-top: 5px;
}
img {
  width: 100px;
  height: 100px;
}
input {
  width: 100px;
}
.basket {
  float: left;
  width: 50%;
  min-height: 500px;
}
.menu {
  float: left;
  width: 50%;
}
.button-b {
  margin-top: 5px;
  margin-bottom: 5px
}
</style>
