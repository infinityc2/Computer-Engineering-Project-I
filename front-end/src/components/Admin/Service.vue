<template>
    <div class="container">
        <button @click="toAdmin" type="button" class="btn btn-primary">Back</button>
        <div class="card">
            <h3 class="card-title">Service</h3>
            <div class="card-body">
                <div class="card" v-for="service in services" :key="service.id">
                    <div class="card-body">
                        service: {{service.service}}<br>
                        table: {{service.table}}<br>
                        time: {{service.time}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Service',
  data () {
    return {
      services: []
    }
  },
  methods: {
    toAdmin: function () {
      this.$router.replace('/admin')
    }
  },
  created () {
    const database = firebase.database()
    const serviceRef = database.ref('Service')

    serviceRef.on('child_added', snapshot => {
      this.services.push({...snapshot.val(), id: snapshot.key})
    })
  }
}
</script>
