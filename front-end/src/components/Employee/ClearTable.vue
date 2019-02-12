<template>
    <div class="container">
        <button type="button" class="btn btn-primary" @click="toAdmin">Back</button>
        <div class="card">
            <h5 class="card-title">Table</h5>
            <div class="card-body">
                <b-list-group>
                    <b-list-group-item v-for="table in tables" :key="table.table_id">
                        Table {{ table.Table_id }}:
                        <b v-if="table.status===true">open</b>
                        <b v-else>close</b>
                        <div v-if="table!==editStatus">
                            <button type="button" class="btn btn-link" @click.prevent="editStat(table)">Edit</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-link" @click.prevent="cancelStatus">Cancel</button>
                            <button type="button" class="btn btn-link" @click.prevent="updateStatus">Update</button>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ManageTable',
  data () {
    return {
      tables: [],
      editStatus: null,
      status: null
    }
  },
  methods: {
    toAdmin: function () {
      this.$router.replace('/empmanage')
    },
    editStat: function (table) {
      this.editStatus = table
      this.status = table.status
    },
    cancelStatus: function () {
      this.editStatus = null
      this.status = null
    },
    updateStatus: function () {
      const database = firebase.database()
      const tableRef = database.ref('Table')
      tableRef.child(this.editStatus.id).update({status: !this.status})
      this.cancelStatus()
    }
  },
  created () {
    const database = firebase.database()
    const tableRef = database.ref('Table')

    tableRef.on('child_added', snapshot => {
      this.tables.push({...snapshot.val(), id: snapshot.key})
    })
    tableRef.on('child_changed', snapshot => {
      const updateTable = this.tables.find(table => table.id === snapshot.key)
      updateTable.status = snapshot.val().status
    })
  }
}
</script>
