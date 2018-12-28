<template>
<div id="Test">
    <h3>This is a test</h3>
    <ul class="collection with-header">
        <li class="collection-header">
            <h3>Logs</h3>
        </li>
        <li v-for="log in logs" v-bind:key="log.id" class="collection-item">
            {{log.date}}:{{log.temperature}}
        </li>
    </ul>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name : '',
    data () {
        return{
            logs: []
        }
    },
    created () {
        db.collection('CpuTemps').orderBy("Date", "desc").limit(10).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data())
                const data = {
                    'id': doc.id,
                    'date': doc.data().Date,
                    'temperature': doc.data().Temperature
                }
                this.logs.push(data)
            })
        })
    }
}
</script>