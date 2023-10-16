"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const TaskModel_1 = __importDefault(require("./models/TaskModel"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = new TaskModel_1.default({
        title: req.body.title
    });
    const data = yield newTask.save();
    res.json(data);
}));
app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield TaskModel_1.default.find({});
    res.json(tasks);
}));
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tasks = yield TaskModel_1.default.findByIdAndDelete(id);
    res.json(tasks);
}));
app.put('/tasks/:id/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tasks = yield TaskModel_1.default.findById(id);
    if (tasks === null)
        return res.json({ message: 'Tasks not found' });
    tasks.status = !tasks.status;
    yield (tasks === null || tasks === void 0 ? void 0 : tasks.save());
    res.json(tasks);
}));
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { description } = req.body;
    const tasks = yield TaskModel_1.default.findById(id);
    if (tasks === null)
        return res.json({ message: 'Tasks not found' });
    tasks.description = description;
    yield (tasks === null || tasks === void 0 ? void 0 : tasks.save());
    res.json(tasks);
}));
const PORT = process.env.PORT;
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then((result) => {
    app.listen(PORT, () => {
        console.log('Server is running at', PORT);
    });
})
    .catch((error) => console.log('Mongoose Error', error));
