import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CodeBlock from "@/components/CodeBlock"

// Mock react-syntax-highlighter
jest.mock("react-syntax-highlighter", () => ({
  Prism: {
    __esModule: true,
    default: ({ children, ...props }: any) => (
      <pre data-testid="syntax-highlighter" {...props}>
        <code>{children}</code>
      </pre>
    ),
  },
}))

jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  vscDarkPlus: {},
}))

describe("CodeBlock", () => {
  const sampleCode = `function hello() {
  console.log('Hello');
}`

  test("renders code with syntax highlighting", () => {
    render(<CodeBlock code={sampleCode} language="javascript" />)
    expect(screen.getByText(/function hello/)).toBeInTheDocument()
  })

  test("displays code in pre element", () => {
    render(<CodeBlock code={sampleCode} language="javascript" />)
    const syntaxHighlighter = screen.getByTestId("syntax-highlighter")
    expect(syntaxHighlighter).toBeInTheDocument()
  })

  test("passes correct language prop", () => {
    render(<CodeBlock code={sampleCode} language="javascript" />)
    const syntaxHighlighter = screen.getByTestId("syntax-highlighter")
    expect(syntaxHighlighter).toHaveAttribute("language", "javascript")
  })
})
