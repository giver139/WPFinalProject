export function isNumeric(data: unknown): boolean {
  return !isNaN(Number(data));
}

export function isInteger(value: number): boolean {
  if(!isFinite(value)) {
    return false;
  }
  return Math.floor(value) === value;
}

export function assertUnreachable(arg: never): never {
    throw new Error("Unexpected behavior.");
}

export function sleep(miliseconds: number): Promise<void> {
  return new Promise((resolve) => {setTimeout(resolve, miliseconds);});
}
