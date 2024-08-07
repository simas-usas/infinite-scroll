import Spinner from '../Spinner';
import { render } from '@testing-library/react';

describe('Spinner', () => {
  it('renders Spinner component with custom class', () => {
    const { container } = render(<Spinner className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
