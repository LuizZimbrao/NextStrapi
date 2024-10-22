import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CardItem } from '@/components/CardItem';

describe('CardItem Component', () => {
  const mockImage = {
    url: '/images/product.jpg',
    width: 500,
    height: 500,
    size: 1000,
  };
  
  it('renders the product name and price', () => {
    render(<CardItem image={mockImage} name="Test Product" price={29.99} />);

    const productName = screen.getByText(/Test Product/i);
    const productPrice = screen.getByText(/\$ 29.99/i);

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('renders the image with the correct src and alt text', () => {
    render(<CardItem image={mockImage} name="Test Product" price={29.99} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', 'http://localhost:1337/images/product.jpg');
    expect(imgElement).toHaveAttribute('alt', 'Test Product');
  });
});