// e.g. "group1" from ".../group1.html"; "dev" for all other pages
const group = location.pathname.match(/group\d/)?.[0] ?? 'dev'

/** Returns a storage key for a given name within the current group */
export function storageKey(name: string): string {
    return `${group}-${name}`
}