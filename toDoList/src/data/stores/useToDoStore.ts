import create from "zustand";
import { generateId } from "../helpers"; 

interface Task {

    id: string;
    title: string;
    createdAt: number;

} 

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

// export const useToDoStore = create<ToDoStore>((set, get) => ({
//     tasks: [],
//     createTask: (title) => {
//         const { tasks } => get();
//     },
//     updateTask: (id, title) => {},
//     removeTask: (id) => {},
// }));


export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
            id: "1",
            title: "Default Task",
            createdAt: 20220502
        },

        {
            id: "2",
            title: "Create 2nd Task",
            createdAt: 20220702
        }
    ],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks:[newTask].concat(tasks),
        })

        console.log(get(), "placeholder");
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title: task.title,
            }))
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
        });
    },
}));