<template>
    <div class="container">
      <button @click="toHome" type="button" class="btn btn-primary">Back</button>
    </div>
</template>

<script>
export default {
  name: 'Howto',
  methods: {
    toHome: function () {
      this.$router.replace('/home')
    }
  }
}
</script>

<style scoped>
</style>
