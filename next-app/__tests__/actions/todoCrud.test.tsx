import { createToDo, deleteToDo, fetchToDos, IToDo, updateToDo } from '@/actions/todoCrud';
import axios from 'axios';

jest.mock('axios');

describe('ToDo API', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchToDos', () => {
        it('should fetch todos successfully', async () => {
            const mockResponse = { data: [{ id: '1', title: 'Test ToDo' }] };
            (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await fetchToDos();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos?page=1&limit=10`);
            expect(result).toEqual({ success: true, todos: mockResponse.data });
        });

        it('should handle errors when fetching todos', async () => {
            (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

            const result = await fetchToDos();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos?page=1&limit=10`);
            expect(result).toEqual({ success: false });
        });
    });

    describe('createToDo', () => {
        const newTodo: IToDo = {
            title: 'New ToDo',
            description: 'Test Description',
            dueDate: '2024-10-05',
            priority: 'High',
        };

        it('should create a new todo successfully', async () => {
            const mockResponse = { data: { ...newTodo, id: '1' } };
            (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await createToDo(newTodo);

            expect(axios.post).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos`, newTodo);
            expect(result).toEqual({ success: true, todos: mockResponse.data });
        });

        it('should handle errors when creating a new todo', async () => {
            (axios.post as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

            const result = await createToDo(newTodo);

            expect(axios.post).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos`, newTodo);
            expect(result).toEqual({ success: false });
        });
    });

    describe('updateToDo', () => {
        const updatedTodo: IToDo = {
            title: 'Updated ToDo',
            description: 'Updated Description',
            dueDate: '2024-10-06',
            priority: 'Low',
            completed: false,
        };

        it('should update an existing todo successfully', async () => {
            const mockResponse = { data: { ...updatedTodo, id: '1', completed: true } };
            (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await updateToDo('1', updatedTodo, true);

            expect(axios.put).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos/1`, {
                ...updatedTodo,
                completed: true,
            });
            expect(result).toEqual({ success: true, todos: mockResponse.data });
        });

        it('should handle errors when updating a todo', async () => {
            (axios.put as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

            const result = await updateToDo('1', updatedTodo, false);

            expect(axios.put).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos/1`, {
                ...updatedTodo,
                completed: false,
            });
            expect(result).toEqual({ success: false });
        });
    });

    describe('deleteToDo', () => {
        it('should delete a todo successfully', async () => {
            (axios.delete as jest.Mock).mockResolvedValueOnce({ status: 204 });

            const result = await deleteToDo('1');

            expect(axios.delete).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos/1`);
            expect(result).toEqual({ success: true });
        });

        it('should handle errors when deleting a todo', async () => {
            (axios.delete as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

            const result = await deleteToDo('1');

            expect(axios.delete).toHaveBeenCalledWith(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos/1`);
            expect(result).toEqual({ success: false });
        });
    });
});
