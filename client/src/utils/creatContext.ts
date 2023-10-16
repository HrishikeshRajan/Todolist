import { Dispatch, SetStateAction, createContext } from "react";
import { TaskItem } from "../types";
interface Context {
    tasks: TaskItem[],
    setTasks: Dispatch<SetStateAction<TaskItem[]>>
}
export default createContext<Context>({
    tasks: [],
    setTasks: () => { }
})