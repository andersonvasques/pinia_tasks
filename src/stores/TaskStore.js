// Importandoo defineStore de pinia
import { defineStore } from "pinia";

// Criando a variável useTaskStore e exportando
export const useTaskStore = defineStore('taskStore', {

    // Definindo o estado, ele recebe uma função.
    // Dentro dele estamos criando o estado task
    state: () => ({
        task: [],
        loading: false
    }),
    getters: {
        favs() {
            return this.task.filter(t => t.isFav)
        },
        favCount() {
            return this.task.reduce((p, c) => {
                return c.isFav ? p + 1 : p
            }, 0) 
        },
        totalCount: (state) =>  {
            return state.task.length
        }
    },
    actions: {
        // Entrar no db.json e pegar os dados
        async getTasks() {
            this.loading = true

            const res = await fetch('http://localhost:3000/tasks');
            const data = await res.json();

            this.task = data;
            this.loading = false
        },
        async addTask(task) {
            this.task.push(task);

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}

            });

            if (res.error) {
                console.log(res.error);

            }
        },
        async deleteTask(id) {
            this.task = this.task.filter(t => {
                return t.id !== id 
            })

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE'

            });

            if (res.error) {
                console.log(res.error);

            }
        },
        async toggleFav(id) {
            const task = this.task.find(t => t.id === id);
            task.isFav = !task.isFav;

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: {'Content-Type': 'application/json'}

            });

            if (res.error) {
                console.log(res.error);

            }
        }
    }
});