type InputType = "text" | "number";

interface ValidatorOptions {
  type: InputType;
  value: string;
  minLength?: number;
  maxLength?: number;
}

export function validateInput({
  type,
  value,
  minLength = 0,
  maxLength = Infinity,
}: ValidatorOptions): boolean {
  if (value.length < minLength || value.length > maxLength) return false;

  switch (type) {
    case "text":
      return true; // Allow any characters
    case "number":
      return /^\d+$/.test(value); // Only digits
    default:
      return false;
  }
}
