<template>
  <h1 class="text-white center" v-if="!$store.state.tasks.length">Задач пока нет</h1>
  <template v-else>
  <h3 class="text-white" >Всего активных задач: {{ $store.getters.getActiveCount() }}</h3>
  <AppCard 
    v-for="el in $store.state.tasks"
    :key="el.id"
    :title="el.title" 
    :id="el.id" 
    :status="el.status" 
    :deadline="el.deadline" 
  />
  </template>
</template>

<script>
import AppCard from '../components/AppCard'
import {useStore} from 'vuex'
import {onMounted} from 'vue'

export default {
  components: {AppCard},
  setup() {
    let store = useStore()
  
    onMounted(() => {
      store.dispatch('loadDB')
    })

    return {
      
    }
  }
}
</script>
