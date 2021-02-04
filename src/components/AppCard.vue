<template>
    <div class="card">
        <h2 class="card-title">
            {{ title }}
            <AppStatus :typeStatus="status" />
        </h2>
        <p>
            <strong>
            <small>
                {{ deadline }}
            </small>
            </strong>
        </p>
        <button class="btn primary" @click="goToCard(id)">Посмотреть</button>
    </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { useRouter } from 'vue-router'

export default {
    components: {AppStatus},
    props: {
        title: String,
        id: String,
        status: String,
        deadline: String
    },
    setup() {
        const router = useRouter()

        function goToCard(id) {
            router.push(`/task/${id}`)
        }
        return {
            goToCard
        }
    }

}
</script>

<style>

</style>