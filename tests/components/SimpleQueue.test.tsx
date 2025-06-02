import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import SimpleQueue from "@/components/SimpleQueue"

describe("SimpleQueue", () => {
  beforeEach(() => {
    render(<SimpleQueue />)
  })

  test("initializes with empty queue", () => {
    expect(screen.getByText("Queue Contents:")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter item")).toBeInTheDocument()
    expect(screen.getByText("Enqueue")).toBeInTheDocument()
    expect(screen.getByText("Dequeue")).toBeInTheDocument()
  })

  test("handles enqueue operation", () => {
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "test item" } })
    fireEvent.click(screen.getByText("Enqueue"))

    expect(screen.getByText("test item")).toBeInTheDocument()
    expect(input).toHaveValue("")
  })

  test("handles dequeue operation", () => {
    // First enqueue an item
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "first" } })
    fireEvent.click(screen.getByText("Enqueue"))

    fireEvent.change(input, { target: { value: "second" } })
    fireEvent.click(screen.getByText("Enqueue"))

    // Then dequeue
    fireEvent.click(screen.getByText("Dequeue"))

    expect(screen.queryByText("first")).not.toBeInTheDocument()
    expect(screen.getByText("second")).toBeInTheDocument()
  })

  test("ignores empty input", () => {
    const input = screen.getByPlaceholderText("Enter item")
    fireEvent.change(input, { target: { value: "   " } })
    fireEvent.click(screen.getByText("Enqueue"))

    expect(screen.queryByText("   ")).not.toBeInTheDocument()
  })

  test("handles dequeue from empty queue", () => {
    fireEvent.click(screen.getByText("Dequeue"))
    // Should not crash and queue should remain empty
    expect(screen.getByText("Queue Contents:")).toBeInTheDocument()
  })
})
