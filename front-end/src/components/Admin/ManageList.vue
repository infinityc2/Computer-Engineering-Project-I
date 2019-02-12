<template>
    <div class="container">
      <button class="btn btn-primary" @click="toAdmin">Back</button>
      <b-card-group deck>
        <b-card>
          <h5 class="card-title">Food</h5>
          <b-card-body>
            <div v-if="!edit_food">
              <b-input-group size="sm" prepend="name">
                <b-form-input v-model="food_name"></b-form-input>
              </b-input-group>
              <br>
              <b-input-group size="sm" prepend="price">
                <b-form-input type="number" v-model="food_price"></b-form-input>
              </b-input-group>
              <br>
              <b-input-group size="sm" prepend="img">
                <b-form-input v-model="imgFood"></b-form-input>
              </b-input-group>
              <button type="button" class="btn btn-link" @click="addFood">Add</button>
            </div>
            <div class="card" v-for="food in foods" :key="food.id">
              <img v-bind:src="food.source">
              {{food.food_name}} {{food.price}}
              <div v-if="food!==edit_food">
                <button type="button" class="btn btn-link" @click.prevent="deleteFood(food)">Delete</button>
                <button type="button" class="btn btn-link" @click.prevent="editFood(food)">Edit</button>
              </div>
              <div v-else>
                <b-input-group size="sm" prepend="name">
                  <b-form-input v-model="food_name"></b-form-input>
                </b-input-group>
                <br>
                <b-input-group size="sm" prepend="price">
                  <b-form-input type="number" v-model="food_price"></b-form-input>
                </b-input-group>
                <br>
                <b-input-group size="sm" prepend="img">
                  <b-form-input v-model="imgFood"></b-form-input>
                </b-input-group>
                <button type="button" class="btn btn-link" @click.prevent="cancelFood">Cancel</button>
                <button type="button" class="btn btn-link" @click.prevent="updateFood">Update</button>
              </div>
            </div>
          </b-card-body>
        </b-card>
        <b-card>
          <h5 class="card-title">Drink</h5>
          <b-card-body>
            <div v-if="!edit_drink">
              <b-input-group size="sm" prepend="name">
                <b-form-input v-model="drink_name"></b-form-input>
              </b-input-group>
              <br>
              <b-input-group size="sm" prepend="price">
                <b-form-input type="number" v-model="drink_price"></b-form-input>
              </b-input-group>
              <br>
              <b-input-group size="sm" prepend="img">
                <b-form-input v-model="imgDrink"></b-form-input>
              </b-input-group>
              <button type="button" class="btn btn-link" @click="addDrink">Add</button>
            </div>
            <div class="card" v-for="drink in drinks" :key="drink.id">
              <img v-bind:src="drink.source">
              {{drink.drink_name}}  {{drink.price}}
              <div v-if="drink!==edit_drink">
                <button type="button" class="btn btn-link" @click.prevent="deleteDrink(drink)">Delete</button>
                <button type="button" class="btn btn-link" @click.prevent="editDrink(drink)">Edit</button>
              </div>
              <div v-else>
                <b-input-group size="sm" prepend="name">
                  <b-form-input v-model="drink_name"></b-form-input>
                </b-input-group>
                <br>
                <b-input-group size="sm" prepend="price">
                  <b-form-input type="number" v-model="drink_price"></b-form-input>
                </b-input-group>
                <br>
                <b-input-group size="sm" prepend="img">
                  <b-form-input v-model="imgDrink"></b-form-input>
                </b-input-group>
                <button type="button" class="btn btn-link" @click.prevent="cancelDrink">Cancel</button>
                <button type="button" class="btn btn-link" @click.prevent="updateDrink">Update</button>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-card-group>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ManageList',
  data () {
    return {
      // food
      food_name: '',
      food_price: 0,
      foods: [],
      edit_food: null,
      // drink
      drink_name: '',
      drink_price: 0,
      drinks: [],
      edit_drink: null,

      imgFood: '',
      imgDrink: ''
    }
  },
  methods: {
    addFood: function () {
      const database = firebase.database()
      const foodRef = database.ref('Food')
      foodRef.push({
        food_name: this.food_name,
        price: this.food_price,
        source: this.imgFood
      })
    },
    addDrink: function () {
      const database = firebase.database()
      const drinkRef = database.ref('Drink')
      drinkRef.push({
        drink_name: this.drink_name,
        price: this.drink_price,
        source: this.imgDrink
      })
    },
    deleteFood: function (food) {
      const database = firebase.database()
      const foodRef = database.ref('Food')
      foodRef.child(food.id).remove()
    },
    deleteDrink: function (drink) {
      const database = firebase.database()
      const drinkRef = database.ref('Drink')
      drinkRef.child(drink.id).remove()
    },
    editFood: function (food) {
      this.edit_food = food
      this.food_name = food.food_name
      this.food_price = food.price
      this.imgFood = food.source
    },
    editDrink: function (drink) {
      this.edit_drink = drink
      this.drink_name = drink.drink_name
      this.drink_price = drink.price
      this.imgDrink = drink.source
    },
    cancelFood: function () {
      this.edit_food = null
      this.food_name = ''
      this.food_price = null
      this.imgFood = ''
    },
    cancelDrink: function () {
      this.edit_drink = null
      this.drink_name = ''
      this.drink_price = null
      this.imgDrink = ''
    },
    updateFood: function () {
      const database = firebase.database()
      const foodRef = database.ref('Food')
      foodRef.child(this.edit_food.id).update({food_name: this.food_name, price: this.food_price, source: this.imgFood})
      this.cancelFood()
    },
    updateDrink: function () {
      const database = firebase.database()
      const drinkRef = database.ref('Drink')
      drinkRef.child(this.edit_drink.id).update({drink_name: this.drink_name, price: this.drink_price, source: this.imgDrink})
      this.cancelDrink()
    },
    toAdmin: function () {
      this.$router.replace('/admin')
    }
  },
  created () {
    const database = firebase.database()
    const foodRef = database.ref('Food')
    const drinkRef = database.ref('Drink')
    foodRef.on('child_added', snapshot => {
      this.foods.push({...snapshot.val(), id: snapshot.key})
    })
    foodRef.on('child_removed', snapshot => {
      const deleteFood = this.foods.find(food => food.id === snapshot.key)
      const index = this.foods.indexOf(deleteFood)
      this.foods.splice(index, 1)
    })
    foodRef.on('child_changed', snapshot => {
      const updatefood = this.foods.find(food => food.id === snapshot.key)
      updatefood.food_name = snapshot.val().food_name
      updatefood.price = snapshot.val().price
    })
    drinkRef.on('child_added', snapshot => {
      this.drinks.push({...snapshot.val(), id: snapshot.key})
    })
    drinkRef.on('child_removed', snapshot => {
      const deleteDrink = this.drinks.find(drink => drink.id === snapshot.key)
      const index = this.drinks.indexOf(deleteDrink)
      this.drinks.splice(index, 1)
    })
    drinkRef.on('child_changed', snapshot => {
      const updatedrink = this.drinks.find(drink => drink.id === snapshot.key)
      updatedrink.drink_name = snapshot.val().drink_name
      updatedrink.price = snapshot.val().price
    })
  }
}
</script>

<style scoped>
.container, .card{
  margin-top: 5px;
}
.card {
  text-align: left;
}
img {
  width: auto;
  height: 250px;
}
</style>
