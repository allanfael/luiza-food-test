import { act, render, screen, waitFor } from '@testing-library/react';

import Home from '@/app/(project)/page'
import { Cart } from '@/components/header/cart'
import { Header } from '@/components/header'
import items from '@/services/foods.json'
import { useUserStore } from '@/store/user-store';
import { useCartStore } from '@/store/cart-store';

jest.mock('../services/fetchProducts', () => ({
  fetchProducts: jest.fn(() => Promise.resolve(items)),
}));

jest.mock('../store/user-store', () => ({
  useUserStore: jest.fn(() => ({
    email: '',
    setEmail: jest.fn(),
  })),
}))

jest.mock('../store/cart-store', () => ({
  useCartStore: jest.fn(() => ({
    totalItems: 0,
    items: [],
    addItem: jest.fn(),
  })),
}))

describe('Home', () => {
  it('should render', async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen).toBeTruthy()
  })

  it('should render guest message', async () => {
    await act(async () => {
      render(<Home />);
    });

    const guestMessage = screen.queryByText(/Visitante/i);

    expect(guestMessage).toBeTruthy()
  })

  it('should render user email when logged', async () => {
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      email: 'user@example.com',
      setEmail: jest.fn(),
    });

    await act(async () => {
      render(<Home />);
    });

    const guestMessage = screen.queryByText(/user@example.com/i);

    expect(guestMessage).toBeDefined()
  })

  it('should render only pizza', async () => {
    await act(async () => {
      render(<Home />);
    });

    const pizza = screen.queryByRole('button', { name: /pizza/i });

    pizza?.click();

    await waitFor(() => {
      expect(screen.queryByTestId('hamburger-list')).not.toBe(true);
    })
  })

  it('should render only hamburguer', async () => {
    await act(async () => {
      render(<Home />);
    });

    const hamburguer = screen.queryByRole('hamburguer', { name: /pizza/i });

    hamburguer?.click();

    await waitFor(() => {
      expect(screen.queryByTestId('pizza-list')).not.toBe(true);
    })
  })

  it('should render total items in cart', async () => {
    (useCartStore as jest.MockedFunction<typeof useCartStore>).mockReturnValue({
      totalItems: 1,
      addItem: jest.fn(),
      items: [
        {
          id: "1",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2499&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "Cheeseburger Clássico",
          description: "Hambúrguer suculento com queijo derretido.",
          value: 24.90,
          type: "hamburger",
          rate: 4.7
        },
      ],
    });

    await act(async () => {
      render(<Cart />);
    });

    const totalItems = screen.queryByText(/1/i);

    expect(totalItems).toBeDefined()
  })

  it('should render Sair when logged', async () => {
    (useCartStore as jest.MockedFunction<typeof useCartStore>).mockReturnValue({
      totalItems: 1,
      addItem: jest.fn(),
      items: [
        {
          id: "1",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2499&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "Cheeseburger Clássico",
          description: "Hambúrguer suculento com queijo derretido.",
          value: 24.90,
          type: "hamburger",
          rate: 4.7
        },
      ],
    });

    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      email: 'user@example.com',
      setEmail: jest.fn(),
    });

    await act(async () => {
      render(<Header />);
    });

    const text = screen.queryByText(/Sair/i);

    expect(text).toBeDefined()
  })
})