import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';

import { TodoService } from '../services/todo.service';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { Todo } from '@prisma/client';
import {
  SuccessResponse,
  ErrorResponse,
  ResponseDto,
} from '../../../common/responses/response';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  /**
   * Asynchronously creates a new todo using the provided todoData.
   *
   * @param {CreateTodoDTO} todoData - the data for creating the todo
   * @return {Promise<ResponseDto>} a promise that resolves to a ResponseDto
   */
  async create(@Body() todoData: CreateTodoDTO): Promise<ResponseDto> {
    try {
      const todo: Todo = await this.todoService.create(todoData);
      return new SuccessResponse(todo, 'Todo created successfully');
    } catch (err) {
      return new ErrorResponse(err, 'Error creating todo');
    }
  }

  @Get()
  /**
   * Retrieves response DTO by fetching todos from the todo service.
   *
   * @return {Promise<ResponseDto>} The response DTO containing the fetched todos.
   */
  async get(): Promise<ResponseDto> {
    try {
      const todos: Todo[] = await this.todoService.get();
      return new SuccessResponse(todos, 'Todos fetched successfully');
    } catch (error) {
      return new ErrorResponse(error, 'Error fetching todos');
    }
  }

  @Get(':id')
  // Get one todo by ID
  // @param id - The ID of the todo
  // @returns A response object
  async getOne(@Param('id') id: string): Promise<ResponseDto> {
    try {
      // Parse the ID to an integer
      const todoId = parseInt(id);
      // Call the todo service to get the todo by ID
      const todo = await this.todoService.getOne(todoId);
      // Return a success response
      return new SuccessResponse(todo, 'Todo fetched successfully');
    } catch (error) {
      // Return an error response if there's an error fetching the todo
      return new ErrorResponse(error, 'Error fetching todo');
    }
  }

  @Delete(':id')
  /**
   * Delete a todo item by ID
   * @param id - The ID of the todo item to delete
   * @returns A promise that resolves to a ResponseDto
   */
  async delete(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const todoId = parseInt(id); // Parse the ID string to an integer
      await this.todoService.delete(todoId); // Call the todoService to delete the todo item
      return new SuccessResponse(null, 'Todo deleted successfully'); // Return success response
    } catch (error) {
      return new ErrorResponse(error, 'Error deleting todo'); // Return error response
    }
  }

  @Put(':id')
  /**
   * Update a todo item
   *
   * @param id - The id of the todo item to update
   * @param todo - The partial todo object with the updates
   * @returns A response object with the updated todo item or an error message
   */
  async update(
    @Param('id') id: string, // Extract the id parameter from the request URL
    @Body() todo: Partial<Todo>, // Extract the partial todo object from the request body
  ): Promise<ResponseDto> {
    try {
      const todoId = parseInt(id); // Parse the id string to an integer
      const updatedTodo = await this.todoService.update(todoId, todo); // Call the service to update the todo item
      return new SuccessResponse(updatedTodo, 'Todo updated successfully'); // Return success response with the updated todo item
    } catch (error) {
      return new ErrorResponse(error, 'Error updating todo'); // Return error response if there's an error
    }
  }
}
