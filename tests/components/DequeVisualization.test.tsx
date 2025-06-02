import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import DequeVisualization from "@/components/DequeVisualization"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe("DequeVisualization", () => {
  beforeEach(() => {
    render(<DequeVisualization />)
  })

  test("initializes with empty deque", () => {
    expect(screen.getByText("Double-ended Queue (Deque):")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter item")).toBeInTheDocument()
    expect(screen.getByText("Add Front")).toBeInTheDocument()
    expect(screen.getByText("Add Rear")).toBeInTheDocument()
    expect(screen.getByText("Remove Front")).toBeInTheDocument()
    expect(screen.getByText("Remove Rear")).toBeInTheDocument()
  })

  test("handles add front operation", () => {
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "front" } })
    fireEvent.click(screen.getByText("Add Front"))

    expect(screen.getByText("front")).toBeInTheDocument()
    expect(input).toHaveValue("")
  })

  test("handles add rear operation", () => {
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "rear" } })
    fireEvent.click(screen.getByText("Add Rear"))

    expect(screen.getByText("rear")).toBeInTheDocument()
    expect(input).toHaveValue("")
  })

  test("handles remove front operation", () => {
    const input = screen.getByPlaceholderText("Enter item")

    // Add items
    fireEvent.change(input, { target: { value: "first" } })
    fireEvent.click(screen.getByText("Add Front"))
    fireEvent.change(input, { target: { value: "second" } })
    fireEvent.click(screen.getByText("Add Rear"))

    // Remove front
    fireEvent.click(screen.getByText("Remove Front"))

    expect(screen.queryByText("first")).not.toBeInTheDocument()
    expect(screen.getByText("second")).toBeInTheDocument()
  })

  test("handles remove rear operation", () => {
    const input = screen.getByPlaceholderText("Enter item")

    // Add items
    fireEvent.change(input, { target: { value: "first" } })
    fireEvent.click(screen.getByText("Add Front"))
    fireEvent.change(input, { target: { value: "second" } })
    fireEvent.click(screen.getByText("Add Rear"))

    // Remove rear
    fireEvent.click(screen.getByText("Remove Rear"))

    expect(screen.getByText("first")).toBeInTheDocument()
    expect(screen.queryByText("second")).not.toBeInTheDocument()
  })

  test("maintains correct order with mixed operations", () => {
    const input = screen.getByPlaceholderText("Enter item")

    // Add to front
    fireEvent.change(input, { target: { value: "1" } })
    fireEvent.click(screen.getByText("Add Front"))

    // Add to rear
    fireEvent.change(input, { target: { value: "2" } })
    fireEvent.click(screen.getByText("Add Rear"))

    // Add to front again
    fireEvent.change(input, { target: { value: "3" } })
    fireEvent.click(screen.getByText("Add Front"))

    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })
})
