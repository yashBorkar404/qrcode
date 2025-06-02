import { login, logout } from "@/actions/auth"

// Mock the auth module
jest.mock("@/lib/auth", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  auth: jest.fn(),
}))

// Mock next/cache
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}))

import { signIn, signOut } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>
const mockRevalidatePath = revalidatePath as jest.MockedFunction<typeof revalidatePath>

describe("Auth Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("login calls signIn with correct provider", async () => {
    mockSignIn.mockResolvedValue(undefined)

    await login("github")

    expect(mockSignIn).toHaveBeenCalledWith("github", { redirectTo: "/auth/callback" })
  })

  test("logout calls signOut and revalidates path", async () => {
    mockSignOut.mockResolvedValue(undefined)

    await logout()

    expect(mockSignOut).toHaveBeenCalled()
    expect(mockRevalidatePath).toHaveBeenCalledWith("/")
  })

  test("handles signIn errors", async () => {
    const error = new Error("Auth failed")
    mockSignIn.mockRejectedValue(error)

    await expect(login("github")).rejects.toThrow("Auth failed")
  })

  test("handles signOut errors", async () => {
    const error = new Error("Logout failed")
    mockSignOut.mockRejectedValue(error)

    await expect(logout()).rejects.toThrow("Logout failed")
  })
})
