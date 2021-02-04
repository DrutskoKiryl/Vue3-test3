<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :typeStatus="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
    <p><strong>Описание</strong>: {{ task.desc }}</p>
    <div>
      <button class="btn" 
        :disabled="task.status == 'active' || isLoading" 
        @click="changeStatus(task.id, 'active')" 
      >
        Взять в работу
      </button>

      <button class="btn primary" 
        :disabled="task.status == 'done' || isLoading" 
        @click="changeStatus(task.id, 'done')" 
      >
        Завершить
      </button>

      <button class="btn danger" 
        :disabled="task.status == 'cancelled' || isLoading" 
        @click="changeStatus(task.id, 'cancelled')" 
      >
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {ref} from 'vue'

export default {
  components: {AppStatus},
  setup() {
    let route = useRoute()
    let store = useStore()
    let id = route.params.id
    let task = store.getters.getTask(id)
    let isLoading = ref(false)

    async function changeStatus(id, status) {
      isLoading.value = true
      await store.dispatch('changeStatus', {id, status, title: task.title, deadline: task.deadline, desc: task.desc})
      isLoading.value = false
    }
 
    return {
      task, changeStatus, id, isLoading
    }
  }
}
</script>

<style scoped>

</style>