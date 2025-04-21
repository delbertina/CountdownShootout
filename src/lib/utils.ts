import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function padNumber(num: number, size: number) {
  const padding = "0".repeat(size)
  return (padding + num).slice(-size)
}

export function getYoutubeURL(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

export function getYoutubeBoundedURL(id: string, start: number, end: number) {
  return `https://www.youtube.com/watch?v=${id}&t=${start}s&end=${end}s`
}
