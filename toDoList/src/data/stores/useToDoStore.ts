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
            title: "dope",
            createdAt: 20220502
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
    updateTask: (id, title) => {},
    removeTask: (id) => {},
}));