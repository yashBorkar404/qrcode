import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CallstackVisualization from "@/components/CallstackVisualization"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe("CallstackVisualization", () => {
  test("renders empty callstack", () => {
    render(<CallstackVisualization callstack={[]} />)
    expect(screen.getByText("Call Stack:")).toBeInTheDocument()
  })

  test("renders callstack with items", () => {
    const callstack = ["factorial(3)", "factorial(2)", "factorial(1)"]

    render(<CallstackVisualization callstack={callstack} />)

    expect(screen.getByText("factorial(3)")).toBeInTheDocument()
    expect(screen.getByText("factorial(2)")).toBeInTheDocument()
    expect(screen.getByText("factorial(1)")).toBeInTheDocument()
  })

  test("displays callstack in correct order", () => {
    const callstack = ["first call", "second call", "third call"]

    render(<CallstackVisualization callstack={callstack} />)

    const calls = screen.getAllByText(/call/)
    expect(calls).toHaveLength(3)
    expect(calls[0]).toHaveTextContent("first call")
    expect(calls[1]).toHaveTextContent("second call")
    expect(calls[2]).toHaveTextContent("third call")
  })

  test("updates when callstack changes", () => {
    const { rerender } = render(<CallstackVisualization callstack={["initial"]} />)
    expect(screen.getByText("initial")).toBeInTheDocument()

    rerender(<CallstackVisualization callstack={["initial", "updated"]} />)
    expect(screen.getByText("initial")).toBeInTheDocument()
    expect(screen.getByText("updated")).toBeInTheDocument()
  })
})
