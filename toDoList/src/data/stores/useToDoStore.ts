import create, { State, StateCreator } from "zustand";
import { generateId } from "../helpers"; 
import { devtools } from "zustand/middleware";

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

    // const localStorageUpdate = <>

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}


const localStorageUpdate = <T extends State>(config: StateCreator<T>) => (set, get, api) : StateCreator<T> => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ));
    }
    set(nextState, ...args); 
}, get, api);

const getCurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
        return currentState
    }
    catch (err) {
        window.localStorage.setItem('tasks', '[]');
    }

    return [];
}


export const useToDoStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
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
}))));