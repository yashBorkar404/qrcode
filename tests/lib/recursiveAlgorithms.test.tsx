import { factorialTree, fibonacciTree, towerOfHanoiTree } from "@/lib/recursiveAlgorithms"

describe("Recursive Algorithms", () => {
  describe("factorialTree", () => {
    test("generates correct tree for factorial(0)", () => {
      const result = factorialTree(0)
      expect(result).toEqual({
        name: "factorial(0)",
        attributes: { result: 1 },
      })
    })

    test("generates correct tree for factorial(1)", () => {
      const result = factorialTree(1)
      expect(result).toEqual({
        name: "factorial(1)",
        attributes: { result: 1 },
      })
    })

    test("generates correct tree for factorial(3)", () => {
      const result = factorialTree(3)
      expect(result.name).toBe("factorial(3)")
      expect(result.attributes?.result).toBe(6)
      expect(result.children).toHaveLength(1)
      expect(result.children?.[0].name).toBe("factorial(2)")
    })
  })

  describe("fibonacciTree", () => {
    test("generates correct tree for fibonacci(0)", () => {
      const result = fibonacciTree(0)
      expect(result).toEqual({
        name: "fibonacci(0)",
        attributes: { result: 0 },
      })
    })

    test("generates correct tree for fibonacci(1)", () => {
      const result = fibonacciTree(1)
      expect(result).toEqual({
        name: "fibonacci(1)",
        attributes: { result: 1 },
      })
    })

    test("generates correct tree for fibonacci(3)", () => {
      const result = fibonacciTree(3)
      expect(result.name).toBe("fibonacci(3)")
      expect(result.attributes?.result).toBe(2)
      expect(result.children).toHaveLength(2)
      expect(result.children?.[0].name).toBe("fibonacci(2)")
      expect(result.children?.[1].name).toBe("fibonacci(1)")
    })
  })

  describe("towerOfHanoiTree", () => {
    test("generates correct tree for n=1", () => {
      const result = towerOfHanoiTree(1)
      expect(result).toEqual({
        name: "Move disk 1 from A to C",
      })
    })

    test("generates correct tree for n=2", () => {
      const result = towerOfHanoiTree(2)
      expect(result.name).toBe("Move 2 disks from A to C")
      expect(result.children).toHaveLength(3)
      expect(result.children?.[0].name).toBe("Move disk 1 from A to B")
      expect(result.children?.[1].name).toBe("Move disk 2 from A to C")
      expect(result.children?.[2].name).toBe("Move disk 1 from B to C")
    })

    test("accepts custom rod names", () => {
      const result = towerOfHanoiTree(1, "X", "Y", "Z")
      expect(result.name).toBe("Move disk 1 from X to Z")
    })
  })
})
