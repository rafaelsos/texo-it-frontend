import { act, fireEvent, render, screen } from '@testing-library/react'

import { ListScreen } from '@/presentation/screens/List/ListScreen'

export const dataListMock = {
  content: [
    {
      id: 1,
      year: 1980,
      title: "Can't Stop the Music",
      studios: ['Associated Film Distribution'],
      producers: ['Allan Carr'],
      winner: true,
    },
    {
      id: 2,
      year: 1980,
      title: 'Cruising',
      studios: ['Lorimar Productions', 'United Artists'],
      producers: ['Jerry Weintraub'],
      winner: false,
    },
    {
      id: 3,
      year: 1980,
      title: 'The Formula',
      studios: ['MGM', 'United Artists'],
      producers: ['Steve Shagan'],
      winner: false,
    },
    {
      id: 4,
      year: 1980,
      title: 'Friday the 13th',
      studios: ['Paramount Pictures'],
      producers: ['Sean S. Cunningham'],
      winner: false,
    },
    {
      id: 5,
      year: 1980,
      title: 'The Nude Bomb',
      studios: ['Universal Studios'],
      producers: ['Jennings Lang'],
      winner: false,
    },
    {
      id: 6,
      year: 1980,
      title: 'The Jazz Singer',
      studios: ['Associated Film Distribution'],
      producers: ['Jerry Leider'],
      winner: false,
    },
    {
      id: 7,
      year: 1980,
      title: 'Raise the Titanic',
      studios: ['Associated Film Distribution'],
      producers: ['William Frye'],
      winner: false,
    },
    {
      id: 8,
      year: 1980,
      title: 'Saturn 3',
      studios: ['Associated Film Distribution'],
      producers: ['Stanley Donen'],
      winner: false,
    },
    {
      id: 9,
      year: 1980,
      title: 'Windows',
      studios: ['United Artists'],
      producers: ['Mike Lobell'],
      winner: false,
    },
    {
      id: 10,
      year: 1980,
      title: 'Xanadu',
      studios: ['Universal Studios'],
      producers: ['Lawrence Gordon'],
      winner: false,
    },
    {
      id: 11,
      year: 1981,
      title: 'Mommie Dearest',
      studios: ['Paramount Pictures'],
      producers: ['Frank Yablans'],
      winner: true,
    },
    {
      id: 12,
      year: 1981,
      title: 'Endless Love',
      studios: ['PolyGram', 'Universal Studios'],
      producers: ['Dyson Lovell'],
      winner: false,
    },
  ],
  pageable: {
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    offset: 0,
    pageSize: 12,
    pageNumber: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 18,
  totalElements: 206,
  last: false,
  size: 12,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true,
  },
  first: true,
  numberOfElements: 12,
  empty: false,
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const handleFetchMock = jest.fn()

jest.mock('@/presentation/hooks/UseFecth/UseFecthHook', () => ({
  useFetch: jest.fn(() => ({
    handleFetch: handleFetchMock,
    data: dataListMock,
  })),
}))

describe('ListScreen', () => {
  it('should render title card', () => {
    render(<ListScreen />)

    const cardComponent = screen.getByText('List movies')

    expect(cardComponent).toBeInTheDocument()
  })

  it('should renders pagination buttons', () => {
    render(<ListScreen />)

    const backButton = screen.getByRole('button', { name: /previous page/i })
    const nextButton = screen.getByRole('button', { name: /next page/i })

    expect(backButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('should click button previous page', () => {
    render(<ListScreen />)

    const backButton = screen.getByRole('button', { name: /previous page/i })

    fireEvent.click(backButton)

    expect(handleFetchMock).toHaveBeenCalled()
  })

  it('should click button next page', () => {
    render(<ListScreen />)

    const nextButton = screen.getByRole('button', { name: /next page/i })

    fireEvent.click(nextButton)

    expect(handleFetchMock).toHaveBeenCalled()
  })

  it('should display the list of movies title', () => {
    render(<ListScreen />)

    dataListMock.content.forEach((movie) => {
      const movieTitleElement = screen.getByText(movie.title)
      expect(movieTitleElement).toBeInTheDocument()
    })
  })

  it('should filter movies by year', async () => {
    render(<ListScreen />)

    const inputYear = screen.getByPlaceholderText('Search by year')

    await act(async () => {
      fireEvent.change(inputYear, { target: { value: 1980 } })

      await sleep(1000)
    })

    expect(handleFetchMock).toHaveBeenCalledWith({
      page: 0,
      size: 12,
      year: 1980,
    })
  })
})
