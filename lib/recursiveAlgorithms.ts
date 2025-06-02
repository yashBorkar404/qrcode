interface TreeNode {
  name: string;
  attributes?: { [key: string]: string | number };
  children?: TreeNode[];
}

export const factorialTree = (n: number): TreeNode => {
  if (n === 0 || n === 1) {
    return { name: `factorial(${n})`, attributes: { result: 1 } };
  }
  const child = factorialTree(n - 1);
  const result = n * (child.attributes?.result as number);
  return {
    name: `factorial(${n})`,
    attributes: { result },
    children: [child],
  };
};

export const fibonacciTree = (n: number): TreeNode => {
  if (n <= 1) {
    return { name: `fibonacci(${n})`, attributes: { result: n } };
  }
  const left = fibonacciTree(n - 1);
  const right = fibonacciTree(n - 2);
  const result =
    (left.attributes?.result as number) + (right.attributes?.result as number);
  return {
    name: `fibonacci(${n})`,
    attributes: { result },
    children: [left, right],
  };
};

export const towerOfHanoiTree = (
  n: number,
  source = "A",
  auxiliary = "B",
  destination = "C",
): TreeNode => {
  if (n === 1) {
    return { name: `Move disk 1 from ${source} to ${destination}` };
  }
  return {
    name: `Move ${n} disks from ${source} to ${destination}`,
    children: [
      towerOfHanoiTree(n - 1, source, destination, auxiliary),
      { name: `Move disk ${n} from ${source} to ${destination}` },
      towerOfHanoiTree(n - 1, auxiliary, source, destination),
    ],
  };
};
