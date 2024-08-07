import { mockImage } from '#mocks/mockImages';
import { addFavourite } from '#db/indexedDb';
import ImageCard from '../ImageCard';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';

describe('Spinner', () => {
  it('renders ImageCard component', () => {
    const { getByAltText } = render(<ImageCard image={mockImage} />);

    const image = getByAltText('Test Image');

    expect(image).toHaveAttribute('src', 'https://www.test-image-.com/landscape');
    expect(screen.getByText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('Test Tester')).toBeInTheDocument();
  });

  it('renders ImageCard which is favourited', async () => {
    await addFavourite(1234567);

    render(<ImageCard image={mockImage} />);
    await waitFor(() => expect(screen.getByText('Unfavourite')).toBeInTheDocument());
  });

  it('favourites and unfavourite an ImageCard', async () => {
    const { getByText } = render(<ImageCard image={mockImage} />);

    const favouriteButton = getByText('Favourite');
    fireEvent.click(favouriteButton);

    await waitFor(() => expect(screen.getByText('Unfavourite')).toBeInTheDocument());

    const unfavouriteButton = getByText('Unfavourite');
    fireEvent.click(unfavouriteButton);

    await waitFor(() => expect(screen.getByText('Favourite')).toBeInTheDocument());
  });
});
