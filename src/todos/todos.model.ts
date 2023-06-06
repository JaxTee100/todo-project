import * as mongoose from 'mongoose'

export const TodoSchema = new mongoose.Schema({
    todoInput: {type: String, required: true}
})



export interface Todo extends mongoose.Document {
    id: string;
    todoInput: string
}