import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRoomId() {
  return Math.random().toString(36).substring(2, 12);
}

export async function getMediaStream(video = true, audio = true) {
  try {
    return await navigator.mediaDevices.getUserMedia({ video, audio });
  } catch (error) {
    console.error('Error accessing media devices:', error);
    throw error;
  }
}