import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },

  mutations: {
    CHANGE_STATUS(state, {id, status}) {
      state.tasks[state.tasks.findIndex(item => item.id == id)].status = status
    },

    CREATE_TASK(state, task) {
      state.tasks.push(task)
    },

    UPDATE_TASKS(state, arr) {
      state.tasks = [...arr]
    }
  },

  actions: {
    async changeStatus({commit}, {id, status, title, deadline, desc}) {
      try {
        const res = await fetch(`https://vue-demo3-db-default-rtdb.firebaseio.com/tasks/${id}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, deadline, desc, status})
        })
        const data = await res.json()
        commit('CHANGE_STATUS', {id, status})
      } catch (e) {
        alert(e.message)
      }
    },

    async createTask({commit, state}, {title, deadline, desc, status}) {
      try {
        const res = await fetch('https://vue-demo3-db-default-rtdb.firebaseio.com/tasks.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, deadline, desc, status})
        })
        const data = await res.json()
        commit('CREATE_TASK', {data, title, desc, status, deadline})
      } catch (e) {
        alert(e.message)
      }
    },

    async loadDB({commit}){
      try {
        const res = await fetch('https://vue-demo3-db-default-rtdb.firebaseio.com/tasks.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        const taskArr = Object.keys(data).map(key => {
          return {
            id: key, ...data[key]
          }
        })
        commit('UPDATE_TASKS', taskArr)
      } catch (e) {
        alert(e.message)
      }
    }
  },

  getters: {
    getTask: (state) => (id) => {
      return state.tasks.find(item => item.id == id)
    },

    getActiveCount: (state) => () => {
      return state.tasks.filter(item => item.status == 'active').length
    }
  }
 
})
