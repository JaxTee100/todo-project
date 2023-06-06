import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TodosService } from "./todos.service";

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}

    @Post()
    async addTodo(@Body('todoInput') todoText: string){
            const todoItem = await this.todosService.addTodo(todoText)
            return todoItem;
       
    }


    @Get()
    async getAllTodos(){
        const todos = await this.todosService.getTodos()
        return todos
    }


    @Get(':id')
    async getTodo (@Param('id') todoId: string){
        return await this.todosService.getTodo(todoId)
    }


    @Patch(':id')
    async editTodo (@Param('id') todoId: string, @Body('todoInput') todoText:string ){
        await this.todosService.editTodo(todoId, todoText)
        return "updated"
    }

    @Delete(':id')
    async removeTodo(@Param('id') todoId: string){
        await this.todosService.deleteTodo(todoId)
    
    }
}