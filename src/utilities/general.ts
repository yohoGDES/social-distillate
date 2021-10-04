import { uuid } from 'vue-uuid'

/**
 * Generate a unique identifier string
 * @returns a new uuid
 */
export function makeId(): string {
  return uuid.v1()
}