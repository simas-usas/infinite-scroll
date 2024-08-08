import ImageGrid from '../ImageGrid';
import { render, screen } from '@testing-library/react';

describe('ImageGrid', () => {
  it('renders ImageGrid component', () => {
    render(
      <ImageGrid>
        <div>Test</div>
      </ImageGrid>,
    );

    expect(screen.getByTestId('image-grid')).toBeInTheDocument();
  });
});
