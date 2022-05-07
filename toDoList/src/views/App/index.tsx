import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useToDoStore } from "../../data/stores/useToDoStore";
import { InputPlus } from "../components/InputPlus/index";

export const App: React.FC = () => {
    
    console.log(useToDoStore);


    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    useEffect(() => {
        createTask('asdfasd'); 
    }, []);

    return (
        <article className = {styles.article}>
            <h1 className = {styles.articleTitle}>ToDo App</h1>
            <section className = {styles.articleSection}>
                <InputPlus 
                    onAdd = {(title) => {
                        if (title) {
                            createTask(title);
                        }
                    }}
                />
            </section>

            <section className = {styles.articleSection}>

            </section>
        </article>
    );
};