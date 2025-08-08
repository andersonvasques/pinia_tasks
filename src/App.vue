<template>
  <main>

    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1> Pinia Tasks </h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm/>
    </div>

    <!-- filter  -->
    <nav class="filter">
      <button @click="filter = 'all'"> All tasks </button>
      <button @click="filter = 'favs'"> Fav tasks </button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="taskStore.loading">
      Loading tasks...
    </div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p> Your have {{ taskStore.totalCount }} tasks left do to </p>
      <div v-for="task in taskStore.task" :key="task.id">
        <TaskDetails :task="task"/> <!-- :task é o props que está em TaskDetails -->
      </div>
    </div>

    <!-- Show only tasks favs -->
    <div class="task-list" v-if="filter === 'favs'">
      <p> Your have {{ taskStore.favCount }} fav left to do </p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task"/> 
      </div>
    </div>

  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'

  export default {
    components: {
      TaskDetails,
      TaskForm
    },
    setup() {
      const taskStore = useTaskStore();

      // fetch tasks
      taskStore.getTasks();

      const filter = ref('all');

      return { taskStore, filter }
    }
  }
</script>