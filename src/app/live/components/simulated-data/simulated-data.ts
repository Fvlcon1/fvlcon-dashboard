import { simulatedPeople } from "./simulated-people";
import { simulatedPlates } from "./simulated-plates";

export const simulatedData = shuffleSimulatedData([...simulatedPlates, ...simulatedPeople])

/**
 * Returns a new array with the elements of the input array shuffled.
 * @param array The array to shuffle
 */
export function shuffleSimulatedData<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Example: shuffled version of the combined simulated data
export const shuffledSimulatedData = shuffleSimulatedData(simulatedData);