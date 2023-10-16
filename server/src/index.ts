import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import TaskModel from './models/TaskModel'
import cors from 'cors'
dotenv.config()

const app = express()


app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.post('/tasks', async (req: Request, res: Response) => {
    const newTask = new TaskModel({
        title: req.body.title
    })
    const data = await newTask.save()
    res.json(data)
})
app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await TaskModel.find({})
    res.json(tasks)
})

app.delete('/tasks/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const tasks = await TaskModel.findByIdAndDelete(id)
    res.json(tasks)
})
app.put('/tasks/:id/status', async (req: Request, res: Response) => {
    const id = req.params.id
    const tasks = await TaskModel.findById(id)
    if (tasks === null) return res.json({ message: 'Tasks not found' })
    tasks.status = !tasks.status
    await tasks?.save()
    res.json(tasks)
})
app.put('/tasks/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const { description } = req.body
    const tasks = await TaskModel.findById(id)
    if (tasks === null) return res.json({ message: 'Tasks not found' })
    tasks.description = description
    await tasks?.save()
    res.json(tasks)
})
const PORT = process.env.PORT
mongoose
    .connect(process.env.MONGO_URL!)
    .then((result) => {

        app.listen(PORT, () => {
            console.log('Server is running at', PORT)
        })
    })
    .catch((error) => console.log('Mongoose Error', error))

