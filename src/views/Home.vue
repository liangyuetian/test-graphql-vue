<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <Card :msg='cardVal' />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
    import gql from 'graphql-tag';
    import Card from '@/components/card/index.vue';


    // import TASKS_ALL from '../graphql/get/TasksAll.gql'
    // import TASKS_DELETE from '../graphql/'
    @Component({
        components: {
            HelloWorld,
            Card
        }
    })
    export default class Home extends Vue {

        data() {
            return {
                cardVal: '我是一个卡片',
                tasks: [],
                addMode: false,
                task: {
                    type: Object,
                    required: true,
                }
            }
        }
        mounted() {
            this.deleteTask();
            this.getOrigin();
            this.getApiClient();

        }

        deleteTask() {
            this.$apollo.mutate({
                mutation: gql`mutation tasksDelete ($id: ID!) {
                    deleteTask (id: $id) {
                        id
                    }
                }`,
                variables: {
                    id: 'this.task.id',
                },

            }).then((data) => {
                console.log('请求成功', data)
            }).catch((err) => {
                console.log('请求失败', err)
            })
        }

        getOrigin() {
            this.$apollo.query({
                query: gql`query tasksAll ($filter: TaskFilter) {
                    allTasks (filter: $filter) {
                        id
                        done
                        label
                    }
                }`,
                variables: {
                    filter: 'this.Select'
                }
            })
                .then(res => {
                    console.log('请求成功', res)
                })
                .catch(err => {
                    console.log('请求失败', err)
                })

        }

        getApiClient() {
            console.log(this.$apollo.provider.clients.api)
            this.$apollo.provider.clients.api.query({
                query: gql`query tasksAll ($filter: TaskFilter) {
                    allTasks (filter: $filter) {
                        id
                        done
                        label
                    }
                }`,
                variables: {
                    filter: 'this.Select'
                }
            }).then((params: any) => {

            }).catch((err: any) => {
                console.log('请求百度', err)
            });
        }
    }
</script>

