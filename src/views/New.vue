<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="deadline">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="desc"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid" @click.prevent="createTask">Создать</button>
  </form>
</template>

<script>
import {useStore} from "vuex"
import {useRouter} from "vue-router" 
import {ref, computed} from "vue"

export default {
setup() {
  let store = useStore()
  let router = useRouter()
  let title = ref('')
  let deadline = ref('')
  let desc = ref('')

  async function createTask() {
    let status = new Date(deadline.value) >= new Date() ? 'active' : 'cancelled'
    await store.dispatch('createTask', 
      {title: title.value, deadline: new Date(deadline.value).toLocaleDateString(), desc: desc.value, status: status}
    )
    router.push('/')
  }

  let isValid = computed(() => {
    return ( title.value != '' &&  deadline.value !='' && desc.value != '')
  })

  return {
    title, deadline, desc, createTask, isValid
  }
}

}

</script>