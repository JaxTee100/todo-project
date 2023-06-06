import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./todos.model"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";


@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    constructor( @InjectModel('Todo') private readonly todoModel: Model<Todo>){}


    //post a todo
    async addTodo(todoInput: string){
        const newTodo = new this.todoModel({
            todoInput
        });

        const result = await newTodo.save();
        return result


    }

    async getTodos(){
        const todos = await this.todoModel.find().exec();
        return todos
    }


    async getTodo(todoId: string){
        const todo = await this.todoModel.findById(todoId).exec()

        if(!todo){
            throw new NotFoundException('no todo like this')
        }
        return todo


    }


    async editTodo(todoId: string, todoInput: string){
        const editedTodo = await this.todoModel.findById(todoId)
        if(todoInput){
            editedTodo.todoInput = todoInput
        }

        editedTodo.save()
    }

    async deleteTodo(todoId: string){
        await this.todoModel.deleteOne({_id: todoId}).exec()
    }


}