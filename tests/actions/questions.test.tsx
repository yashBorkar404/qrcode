import { getQuestions } from "@/actions/questions"

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe("Questions Actions", () => {
  beforeEach(() => {
    mockFetch.mockClear()
    process.env.BACKEND_URL = "http://localhost:3001"
  })

  test("fetches and formats quiz questions correctly", async () => {
    const mockQueueQuestions = [[1, "What is FIFO?", '["First In First Out", "Last In First Out"]', 0]]
    const mockRecursionQuestions = [[1, "What is a base case?", '["Stopping condition", "Starting point"]', 0]]

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockQueueQuestions,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecursionQuestions,
      })

    const result = await getQuestions()

    expect(result).toEqual({
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
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/quizzes/queue")
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/quizzes/recursion")
  })

  test("handles fetch errors", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"))

    await expect(getQuestions()).rejects.toThrow("Network error")
  })

  test("handles non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    })

    await expect(getQuestions()).rejects.toThrow("Failed to fetch quizzes for queue")
  })

  test("handles malformed JSON in options", async () => {
    const mockQueueQuestions = [[1, "What is FIFO?", "invalid json", 0]]

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockQueueQuestions,
    })

    await expect(getQuestions()).rejects.toThrow()
  })
})
