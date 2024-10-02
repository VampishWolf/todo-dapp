import Header from '@/components/Header';
import TokenBalanceDisplay from '@/components/TokenBalanceDisplay';
import { useAppKit } from '@reown/appkit/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAccount } from 'wagmi';

jest.mock('wagmi', () => ({
    useAccount: jest.fn(),
}));

jest.mock('@reown/appkit/react', () => ({
    useAppKit: jest.fn(),
}));

jest.mock('@/components/TokenBalanceDisplay', () => jest.fn(() => <div>TokenBalanceDisplay</div>));

describe('Header Component', () => {
    const mockOpen = jest.fn();
    const mockClose = jest.fn();

    beforeEach(() => {
        (useAppKit as jest.Mock).mockReturnValue({ open: mockOpen, close: mockClose });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Header component correctly', () => {
        (useAccount as jest.Mock).mockReturnValue({ isConnected: false });

        render(<Header />);

        expect(screen.getByText('ToDoos')).toBeInTheDocument();
    });

    it('displays "Connecting..." button when connecting to wallet', () => {
        (useAccount as jest.Mock).mockReturnValue({ isConnecting: true });

        render(<Header />);

        expect(screen.getByText('Connecting...')).toBeInTheDocument();
    });

    it('displays TokenBalanceDisplay and address when wallet is connected', () => {
        const address = '0x1234567890abcdef1234567890abcdef12345678';
        (useAccount as jest.Mock).mockReturnValue({ isConnected: true, address });

        render(<Header />);

        expect(screen.getByText(address.slice(0, 6) + '...' + address.slice(-4))).toBeInTheDocument();
        expect(TokenBalanceDisplay).toHaveBeenCalledWith({ userAddress: address }, {});
    });

    it('does not display TokenBalanceDisplay when wallet is not connected', () => {
        (useAccount as jest.Mock).mockReturnValue({ isConnected: false });

        render(<Header />);

        expect(screen.queryByText('TokenBalanceDisplay')).not.toBeInTheDocument();
    });

    it('calls the open function when the address button is clicked', () => {
        const address = '0x1234567890abcdef1234567890abcdef12345678';
        (useAccount as jest.Mock).mockReturnValue({ isConnected: true, address });

        render(<Header />);

        const addressButton = screen.getByText(address.slice(0, 6) + '...' + address.slice(-4));
        fireEvent.click(addressButton);

        expect(mockOpen).toHaveBeenCalledTimes(1);
    });
});
