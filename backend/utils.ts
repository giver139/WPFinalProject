export function isNumeric(data: unknown): boolean {
  return !isNaN(Number(data));
}

export function isInteger(value: number): boolean {
  if(!isFinite(value)) {
    return false;
  }
  return Math.floor(value) === value;
}

function assertUnreachable(arg: never): never {
    throw new Error("Unexpected behavior.");
}
