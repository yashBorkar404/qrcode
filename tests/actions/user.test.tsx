import { postUser, setUserScore, getAllUsers } from "@/actions/user"

// Mock the auth module
jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}))

import { auth } from "@/lib/auth"

const mockAuth = auth as jest.MockedFunction<typeof auth>
const mockFetch = jest.fn()
global.fetch = mockFetch

describe("User Actions", () => {
  beforeEach(() => {
    mockFetch.mockClear()
    mockAuth.mockClear()
    process.env.BACKEND_URL = "http://localhost:3001"
  })

  describe("postUser", () => {
    test("creates user successfully", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
      })

      await postUser("user123", "testuser")

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/user/user123?user_name=testuser", {
        method: "POST",
      })
    })

    test("handles creation error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
      })

      await expect(postUser("user123", "testuser")).rejects.toThrow("Failed to create user in backend")
    })
  })

  describe("setUserScore", () => {
    test("updates user score successfully", async () => {
      mockAuth.mockResolvedValue({
        user: { id: "user123" },
      })
      mockFetch.mockResolvedValue({
        ok: true,
      })

      await setUserScore("queue", 85)

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/user/user123/queue?score=85", { method: "PUT" })
    })

    test("throws error when user not found", async () => {
      mockAuth.mockResolvedValue(null)

      await expect(setUserScore("queue", 85)).rejects.toThrow("User not found")
    })

    test("handles update error", async () => {
      mockAuth.mockResolvedValue({
        user: { id: "user123" },
      })
      mockFetch.mockResolvedValue({
        ok: false,
      })

      await expect(setUserScore("queue", 85)).rejects.toThrow("Failed to update user in backend")
    })
  })

  describe("getAllUsers", () => {
    test("fetches and formats users correctly", async () => {
      const mockUsersData = [
        ["user1", "Alice", 85, 92],
        ["user2", "Bob", 78, 88],
      ]

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockUsersData,
      })

      const result = await getAllUsers()

      expect(result).toEqual([
        {
          id: "user1",
          user_name: "Alice",
          queue_score: 85,
          recursion_score: 92,
        },
        {
          id: "user2",
          user_name: "Bob",
          queue_score: 78,
          recursion_score: 88,
        },
      ])
    })

    test("handles fetch error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
      })

      await expect(getAllUsers()).rejects.toThrow("Failed to fetch users from backend")
    })
  })
})
