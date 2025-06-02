import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import PriorityQueueVisualization from "@/components/PriorityQueueVisualization"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe("PriorityQueueVisualization", () => {
  beforeEach(() => {
    render(<PriorityQueueVisualization />)
  })

  test("initializes with empty priority queue", () => {
    expect(screen.getByText("Priority Queue:")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter item")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Priority")).toBeInTheDocument()
    expect(screen.getByText("Enqueue")).toBeInTheDocument()
    expect(screen.getByText("Dequeue")).toBeInTheDocument()
  })

  test("handles enqueue operation with priority", () => {
    const itemInput = screen.getByPlaceholderText("Enter item")
    const priorityInput = screen.getByPlaceholderText("Priority")

    fireEvent.change(itemInput, { target: { value: "task1" } })
    fireEvent.change(priorityInput, { target: { value: "5" } })
    fireEvent.click(screen.getByText("Enqueue"))

    expect(screen.getByText("task1")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(itemInput).toHaveValue("")
    expect(priorityInput).toHaveValue("")
  })

  test("maintains priority order", () => {
    const itemInput = screen.getByPlaceholderText("Enter item")
    const priorityInput = screen.getByPlaceholderText("Priority")

    // Add low priority item
    fireEvent.change(itemInput, { target: { value: "low" } })
    fireEvent.change(priorityInput, { target: { value: "1" } })
    fireEvent.click(screen.getByText("Enqueue"))

    // Add high priority item
    fireEvent.change(itemInput, { target: { value: "high" } })
    fireEvent.change(priorityInput, { target: { value: "10" } })
    fireEvent.click(screen.getByText("Enqueue"))

    // Add medium priority item
    fireEvent.change(itemInput, { target: { value: "medium" } })
    fireEvent.change(priorityInput, { target: { value: "5" } })
    fireEvent.click(screen.getByText("Enqueue"))

    const items = screen.getAllByText(/high|medium|low/)
    expect(items[0]).toHaveTextContent("high")
    expect(items[1]).toHaveTextContent("medium")
    expect(items[2]).toHaveTextContent("low")
  })

  test("handles dequeue operation", () => {
    const itemInput = screen.getByPlaceholderText("Enter item")
    const priorityInput = screen.getByPlaceholderText("Priority")

    // Add items
    fireEvent.change(itemInput, { target: { value: "first" } })
    fireEvent.change(priorityInput, { target: { value: "1" } })
    fireEvent.click(screen.getByText("Enqueue"))

    fireEvent.change(itemInput, { target: { value: "second" } })
    fireEvent.change(priorityInput, { target: { value: "2" } })
    fireEvent.click(screen.getByText("Enqueue"))

    // Dequeue (should remove highest priority)
    fireEvent.click(screen.getByText("Dequeue"))

    expect(screen.queryByText("second")).not.toBeInTheDocument()
    expect(screen.getByText("first")).toBeInTheDocument()
  })

  test("ignores empty inputs", () => {
    const itemInput = screen.getByPlaceholderText("Enter item")
    const priorityInput = screen.getByPlaceholderText("Priority")

    // Try with empty item
    fireEvent.change(priorityInput, { target: { value: "5" } })
    fireEvent.click(screen.getByText("Enqueue"))

    // Try with empty priority
    fireEvent.change(itemInput, { target: { value: "test" } })
    fireEvent.change(priorityInput, { target: { value: "" } })
    fireEvent.click(screen.getByText("Enqueue"))

    expect(screen.queryByText("test")).not.toBeInTheDocument()
  })
})
