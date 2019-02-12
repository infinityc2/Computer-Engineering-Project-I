<template>
    <div class="container">
        <button type="button" class="btn btn-primary" @click="toEmp">Back</button>
        <div class="card">
            <div class="card-body">
                <label>Stock</label>
                <div class="card">
                    <div class="card-body">
                        <label>Food</label>
                        <div class="card" v-for="food in foods" :key="food.id">
                            <img v-bind:src="food.source">
                            name: {{food.food_name}}<br>
                            price: {{food.price}}<br>
                            status: {{food.status}}<br>
                            <div v-if="food!==edit_status_food">
                                <button type="button" class="btn btn-link" @click.prevent="editStatusFood(food)">Edit</button>
                            </div>
                            <div v-else>
                            <select class="form-control" v-model="status">
                                <option value="out of stock">out of stock</option>
                                <option value="in stock">in stock</option>
                            </select>
                            <br>
                            <button type="button" class="btn btn-link" @click.prevent="cancelFood">Cancel</button>
                            <button type="button" class="btn btn-link" @click.prevent="updateStatusFood(food)">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <label>Drink</label>
                        <div class="card" v-for="drink in drinks" :key="drink.id">
                            <img v-bind:src="drink.source">
                            name: {{drink.drink_name}}
                            price: {{drink.price}}
                            status: {{drink.status}}
                            <div v-if="drink!==edit_status_drink">
                                <button type="button" class="btn btn-link" @click.prevent="editStatusDrink(drink)">Edit</button>
                            </div>
                            <div v-else>
                            <select class="form-control" v-model="status">
                                <option value="out of stock">out of stock</option>
                                <option value="in stock">in stock</option>
                            </select>
                            <br>
                            <button type="button" class="btn btn-link" @click.prevent="cancelDrink">Cancel</button>
                            <button type="button" class="btn btn-link" @click.prevent="updateStatusDrink(drink)">Update</button>
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
  name: 'Stock',
  data () {
    return {
      foods: [],
      drinks: [],
      status: '',
      edit_status_food: null,
      edit_status_drink: null
    }
  },
  methods: {
    toEmp: function () {
      this.$router.replace('/empmanage')
    },
    editStatusFood: function (food) {
      this.edit_status_food = food
      this.status = food.status
    },
    cancelFood: function () {
      this.edit_status_food = null
    },
    updateStatusFood: function (food) {
      const database = firebase.database()
      const foodRef = database.ref('Food')
      foodRef.child(food.id).update({status: this.status})
      this.cancelFood()
    },
    editStatusDrink: function (drink) {
      this.edit_status_drink = drink
      this.status = drink.status
    },
    cancelDrink: function () {
      this.edit_status_drink = null
    },
    updateStatusDrink: function (drink) {
      const database = firebase.database()
      const drinkRef = database.ref('Drink')
      drinkRef.child(drink.id).update({status: this.status})
      this.cancelDrink()
    }
  },
  created () {
    const database = firebase.database()
    const foodRef = database.ref('Food')
    const drinkRef = database.ref('Drink')

    foodRef.on('child_added', snapshot => {
      this.foods.push({...snapshot.val(), id: snapshot.key})
    })

    drinkRef.on('child_added', snapshot => {
      this.drinks.push({...snapshot.val(), id: snapshot.key})
    })
    foodRef.on('child_changed', snapshot => {
      const updatefood = this.foods.find(food => food.id === snapshot.key)
      updatefood.food_name = snapshot.val().food_name
      updatefood.price = snapshot.val().price
      updatefood.status = snapshot.val().status
    })
    drinkRef.on('child_changed', snapshot => {
      const updatedrink = this.drinks.find(drink => drink.id === snapshot.key)
      updatedrink.drink_name = snapshot.val().drink_name
      updatedrink.price = snapshot.val().price
      updatedrink.status = snapshot.val().status
    })
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
</style>
