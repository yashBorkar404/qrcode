import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CircularQueueVisualization from "@/components/CircularQueueVisualization"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock window.alert
const mockAlert = jest.fn()
Object.defineProperty(window, "alert", {
  writable: true,
  value: mockAlert,
})

describe("CircularQueueVisualization", () => {
  beforeEach(() => {
    mockAlert.mockClear()
    render(<CircularQueueVisualization />)
  })

  test("initializes with empty queue", () => {
    expect(screen.getByText("Circular Queue:")).toBeInTheDocument()
    expect(screen.getByText("Front: -1")).toBeInTheDocument()
    expect(screen.getByText("Rear: -1")).toBeInTheDocument()
  })

  test("handles enqueue operation", () => {
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "42" } })
    fireEvent.click(screen.getByText("Enqueue"))

    expect(screen.getByText("42")).toBeInTheDocument()
    expect(screen.getByText("Front: 0")).toBeInTheDocument()
    expect(screen.getByText("Rear: 0")).toBeInTheDocument()
  })

  test("handles dequeue operation", () => {
    // First enqueue an item
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "42" } })
    fireEvent.click(screen.getByText("Enqueue"))

    // Then dequeue it
    fireEvent.click(screen.getByText("Dequeue"))
    expect(screen.queryByText("42")).not.toBeInTheDocument()
    expect(screen.getByText("Front: -1")).toBeInTheDocument()
    expect(screen.getByText("Rear: -1")).toBeInTheDocument()
  })

  test("handles queue overflow", () => {
    const input = screen.getByPlaceholderText("Enter item")

    // Fill queue to capacity (5 items)
    for (let i = 0; i < 5; i++) {
      fireEvent.change(input, { target: { value: i.toString() } })
      fireEvent.click(screen.getByText("Enqueue"))
    }

    // Try to enqueue one more item
    fireEvent.change(input, { target: { value: "5" } })
    fireEvent.click(screen.getByText("Enqueue"))

    expect(mockAlert).toHaveBeenCalledWith("Queue is full!")
  })

  test("handles dequeue from empty queue", () => {
    fireEvent.click(screen.getByText("Dequeue"))
    expect(mockAlert).toHaveBeenCalledWith("Queue is empty!")
  })
})
