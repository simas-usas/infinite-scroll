import App from '../App';
import { Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { mockImage } from '#mocks/mockImages';

describe('App', () => {
  it('renders App with fetched images', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: [mockImage] }),
      }),
    ) as Mock;

    vi.stubGlobal('fetch', mockFetch);

    const IntersectionObserverMock = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    }));

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    render(<App />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Test Image')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Test Tester')).toBeInTheDocument());
  });

  it('renders App with images not found message', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.reject('test error'),
      }),
    ) as Mock;

    vi.stubGlobal('fetch', mockFetch);

    const IntersectionObserverMock = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    }));

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    const consoleSpy = vi.spyOn(console, 'error');

    render(<App />);

    await waitFor(() => expect(screen.getByText('Failed to retrieve images.')).toBeInTheDocument());
    await waitFor(() => expect(consoleSpy).toHaveBeenLastCalledWith('Failed to fetch images:', 'test error'));
  });

  it('fetch images when scrolling to bottom', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: Array(15).fill(mockImage) }),
      }),
    ) as Mock;

    vi.stubGlobal('fetch', mockFetch);

    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockImplementation((callback) => {
      setTimeout(() => {
        callback([{ isIntersecting: true }], mockObserver);
      }, 100);
      return mockObserver;
    });

    vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);

    render(<App />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
  });
});
