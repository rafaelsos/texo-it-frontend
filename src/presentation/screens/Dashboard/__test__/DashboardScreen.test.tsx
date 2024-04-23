import { fireEvent, render, screen } from '@testing-library/react'

import { DashboardScreen } from '@/presentation/screens/Dashboard/DashboardScreen'

const yearsWinnersDataMock = {
  years: [
    {
      year: 1986,
      winnerCount: 1,
    },
    {
      year: 1990,
      winnerCount: 2,
    },
    {
      year: 2015,
      winnerCount: 3,
    },
  ],
}

const studiosDataMock = {
  studios: [
    {
      name: 'Columbia Pictures',
      winCount: 7,
    },
    {
      name: 'Paramount Pictures',
      winCount: 6,
    },
    {
      name: 'Warner Bros.',
      winCount: 5,
    },
  ],
}

export const dataMock = jest.fn().mockReturnValue([])
const handleFetchMock = jest.fn()

jest.mock('@/presentation/hooks/UseFecth/UseFecthHook', () => ({
  useFetch: jest.fn(() => ({
    handleFetch: handleFetchMock,
    data: dataMock(),
  })),
}))

describe('DashboardScreen', () => {
  it('should render the winners of the year in the table', () => {
    render(<DashboardScreen />)

    const gridYearsWinners = screen.getByText(
      'List years with multiple winners'
    )

    expect(gridYearsWinners).toBeInTheDocument()
  })

  it('should render the studios in the table', () => {
    render(<DashboardScreen />)

    const gridStudios = screen.getByText('Top 3 studios with winners')

    expect(gridStudios).toBeInTheDocument()
  })

  it('should present the information of the year of the winners of the year', () => {
    dataMock.mockReturnValueOnce(yearsWinnersDataMock)

    render(<DashboardScreen />)

    yearsWinnersDataMock.years.forEach((item) => {
      const yearText = screen.getByText(item.year)
      expect(yearText).toBeInTheDocument()
    })
  })

  it('should present the information of the name of the studios', () => {
    dataMock
      .mockReturnValueOnce(studiosDataMock)
      .mockReturnValueOnce(studiosDataMock)

    render(<DashboardScreen />)

    studiosDataMock.studios.forEach((item) => {
      const nameText = screen.getByText(item.name)
      expect(nameText).toBeInTheDocument()
    })
  })

  it('should look for the winner per year', () => {
    render(<DashboardScreen />)

    const inputYear = screen.getByPlaceholderText('Search by year')

    fireEvent.change(inputYear, { target: { value: 1980 } })

    const searchByYearButton = screen.getByRole('button', {
      name: 'Search by year button',
    })

    fireEvent.click(searchByYearButton)

    expect(handleFetchMock).toHaveBeenCalled()
  })
})
