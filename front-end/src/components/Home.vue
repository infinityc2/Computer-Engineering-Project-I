<template>
  <div class="container">
    <div>
      <h4>Menu</h4>
      <b-list-group>
        <b-list-group-item @click="toOrder">Select Menu</b-list-group-item>
        <b-list-group-item @click="toBill">Bill</b-list-group-item>
        <b-list-group-item @click="toComment">Comment and Service</b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    toOrder: function () {
      this.$router.replace('/order')
    },
    toBill: function () {
      this.$router.replace('/bill')
    },
    toComment: function () {
      this.$router.replace('/comments')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    float: left;
    margin: auto;
    max-width: 277px;
    margin-bottom: 25px;
  }
  .card img {
    width: auto;
    height: 200px;
  }
  /* a:link , a:hover, a:active, a:visited{
    color: white;
    text-decoration: none;
  } */
</style>
