import { uuid } from 'vue-uuid'

/**
 * Generate a unique identifier string
 * @returns a new uuid
 */
export function makeId(): string {
  return uuid.v1()
}

/**
 * toggleBodyClass
 * @param valueToCheck {boolean}: value to trigger adding class to body or removing
 * @param name {string}: class to add and remove
 * @example toggleBodyClass(true, 'modal-open')
 */
export function toggleBodyClass(valueToCheck: boolean, name: string): void {
  const bodyClass = document.getElementsByTagName('body')[0].classList
  valueToCheck ? bodyClass.add(name) : bodyClass.remove(name)
}
