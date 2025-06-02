import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import PracticePage from "@/app/practice/page"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock the actions
jest.mock("@/actions/questions", () => ({
  getQuestions: jest.fn(),
}))

jest.mock("@/actions/user", () => ({
  setUserScore: jest.fn(),
}))

import { getQuestions } from "@/actions/questions"
import { setUserScore } from "@/actions/user"

const mockGetQuestions = getQuestions as jest.MockedFunction<typeof getQuestions>
const mockSetUserScore = setUserScore as jest.MockedFunction<typeof setUserScore>

describe("PracticePage", () => {
  const mockQuizData = {
    queue: [
      {
        question: "What is FIFO?",
        options: ["First In First Out", "Last In First Out"],
        correctAnswer: 0,
      },
    ],
    recursion: [
      {
        question: "What is a base case?",
        options: ["Stopping condition", "Starting point"],
        correctAnswer: 0,
      },
    ],
  }

  beforeEach(() => {
    mockGetQuestions.mockResolvedValue(mockQuizData)
    mockSetUserScore.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders topic selection initially", () => {
    render(<PracticePage />)
    expect(screen.getByText("Choose a topic to practice:")).toBeInTheDocument()
    expect(screen.getByText("Queues")).toBeInTheDocument()
    expect(screen.getByText("Recursion")).toBeInTheDocument()
  })

  test("loads quiz questions when topic is selected", async () => {
    render(<PracticePage />)

    fireEvent.click(screen.getByText("Queues"))

    await waitFor(() => {
      expect(screen.getByText("What is FIFO?")).toBeInTheDocument()
    })
  })

  test("handles answer selection and submission", async () => {
    render(<PracticePage />)

    fireEvent.click(screen.getByText("Queues"))

    await waitFor(() => {
      expect(screen.getByText("What is FIFO?")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText("First In First Out"))
    fireEvent.click(screen.getByText("Submit Answer"))

    await waitFor(() => {
      expect(mockSetUserScore).toHaveBeenCalledWith("queue", 1)
    })
  })

  test("shows quiz completion screen", async () => {
    render(<PracticePage />)

    fireEvent.click(screen.getByText("Queues"))

    await waitFor(() => {
      expect(screen.getByText("What is FIFO?")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText("First In First Out"))
    fireEvent.click(screen.getByText("Submit Answer"))

    await waitFor(() => {
      expect(screen.getByText("Quiz Completed!")).toBeInTheDocument()
    })
  })
})
