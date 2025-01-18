import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function padNumber(num: number, size: number) {
  const padding = "0".repeat(size)
  return (padding + num).slice(-size)
}
