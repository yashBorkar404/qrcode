import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock react-d3-tree
jest.mock("react-d3-tree", () => ({
  __esModule: true,
  default: ({ data, ...props }: any) => (
    <div data-testid="mock-tree" data-tree-name={data.name} {...props}>
      Tree Visualization: {data.name}
    </div>
  ),
}))

describe("RecursiveTreeVisualization", () => {
  const mockData = {
    name: "factorial(3)",
    attributes: { result: 6 },
    children: [
      {
        name: "factorial(2)",
        attributes: { result: 2 },
        children: [
          {
            name: "factorial(1)",
            attributes: { result: 1 },
          },
        ],
      },
    ],
  }

  test("renders tree visualization", () => {
    render(<RecursiveTreeVisualization data={mockData} />)
    expect(screen.getByTestId("mock-tree")).toBeInTheDocument()
  })

  test("displays correct tree data", () => {
    render(<RecursiveTreeVisualization data={mockData} />)
    expect(screen.getByText("Tree Visualization: factorial(3)")).toBeInTheDocument()
  })

  test("applies correct dimensions", () => {
    const { container } = render(<RecursiveTreeVisualization data={mockData} />)
    const treeContainer = container.firstChild as HTMLElement
    expect(treeContainer).toHaveStyle({ height: "400px" })
  })
})
