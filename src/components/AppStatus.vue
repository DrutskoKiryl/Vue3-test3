<template>
  <span :class="statusClass" class="badge">{{ statusName }}</span>
</template>

<script>
import { ref, reactive, computed } from 'vue'

export default {
  props:{
    typeStatus: String
  },
  setup(props) {
    
    let statusClass = computed(() => {
      switch (props.typeStatus) {
        case 'done':
          return 'primary'
          break;
        case 'active':
          return 'primary'
          break;
        case 'cancelled':
          return 'danger'
          break;
        case 'pending':
          return 'warning'
          break;
      }
    })

    let statusName = computed(() => {
      switch (props.typeStatus) {
        case 'done':
          return 'завершен'
          break;
        case 'active':
          return 'активен'
          break;
        case 'cancelled':
          return 'отменен'
          break;
        case 'pending':
          return 'ожидание'
          break;
      }
    })

    return {
      statusClass, statusName
    }
  }
  
}

</script>