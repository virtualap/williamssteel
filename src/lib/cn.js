// Minimal classnames joiner — no dependency, flattens arrays, drops falsy values.
export function cn(...parts) {
  return parts
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
}

export default cn
