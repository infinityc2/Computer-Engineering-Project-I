<template>
    <div class="container">
        <button  type="button" class="btn btn-primary" v-on:click="toAdmin">Back</button>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Comments</h5>
                <div class="card" v-for="comment in comments" :key="comment.id">
                    <p>{{comment.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ViewComments',
  data () {
    return {
      comments: []
    }
  },
  methods: {
    toAdmin: function () {
      this.$router.replace('/admin')
    }
  },
  created () {
    const database = firebase.database()
    const commentRef = database.ref('Comment')

    commentRef.on('child_added', snapshot => {
      this.comments.push(snapshot.val())
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
