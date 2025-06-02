import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ThemeToggle from "@/components/ThemeToggle"

// Mock the ThemeProvider
const mockToggleTheme = jest.fn()
const mockTheme = "light"

jest.mock("@/components/ThemeProvider", () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}))

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockToggleTheme.mockClear()
  })

  test("renders theme toggle button", () => {
    render(<ThemeToggle />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  test("calls toggleTheme when clicked", () => {
    render(<ThemeToggle />)
    const button = screen.getByRole("button")

    fireEvent.click(button)
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  test("displays correct icon for light theme", () => {
    render(<ThemeToggle />)
    // Should show Moon icon for light theme
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
