import { createToDo, fetchToDos } from "@/actions/todoCrud";
import CreateToDo from '@/components/CreateToDo';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from "sonner";

// Mocking the external modules
jest.mock('@/actions/todoCrud', () => ({
    createToDo: jest.fn(),
    fetchToDos: jest.fn()
}));



jest.mock('sonner', () => ({
    toast: jest.fn()
}));

describe('CreateToDo Component', () => {
    let setTodos: jest.Mock;

    beforeEach(() => {
        setTodos = jest.fn();
        jest.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(<CreateToDo setTodos={setTodos} />);
        expect(screen.getByText(/Add ToDoos/i)).toBeInTheDocument();
    });

    it('updates the todo data on input change', () => {
        render(<CreateToDo setTodos={setTodos} />);

        const titleInput = screen.getByPlaceholderText(/Enter title/i) as HTMLTextAreaElement;
        const descriptionInput = screen.getByPlaceholderText(/Enter description/i) as HTMLTextAreaElement;

        fireEvent.change(titleInput, { target: { value: 'New Todo' } });
        fireEvent.change(descriptionInput, { target: { value: 'Todo description' } });

        expect(titleInput.value).toBe('New Todo');
        expect(descriptionInput.value).toBe('Todo description');
    });

    it('shows a toast if required fields are missing', async () => {
        render(<CreateToDo setTodos={setTodos} />);

        const button = screen.getByText(/Create ToDoo/i);
        fireEvent.click(button);

        expect(toast).toHaveBeenCalledWith("Careful, you missed something!", {
            description: "Todoo need words to be defined.",
        });
    });

    it('creates a new todo and fetches todos on successful creation', async () => {
        (fetchToDos as jest.Mock).mockResolvedValueOnce({ success: true, todos: { data: [{ id: 1, title: 'New Todo' }] } });
        (createToDo as jest.Mock).mockResolvedValueOnce({});

        render(<CreateToDo setTodos={setTodos} />);

        const titleInput = screen.getByPlaceholderText(/title/i);
        const descriptionInput = screen.getByPlaceholderText(/description/i);
        fireEvent.change(titleInput, { target: { value: 'New Todo' } });
        fireEvent.change(descriptionInput, { target: { value: 'Todo description' } });

        const button = screen.getByText(/Create ToDoo/i);
        fireEvent.click(button);

        await waitFor(() => expect(createToDo).toHaveBeenCalledWith({
            title: 'New Todo',
            description: 'Todo description',
            dueDate: expect.any(String),
            priority: 'low'
        }));

        await waitFor(() => expect(fetchToDos).toHaveBeenCalled());
        expect(toast).toHaveBeenCalledWith("Woohoo, created!", {
            description: "You just created a Todoo.",
        });
        expect(setTodos).toHaveBeenCalledWith([{ id: 1, title: 'New Todo' }]);
    });

});
