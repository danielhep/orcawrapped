import { ProcessedOrcaData } from '../types'

export function routeOccurrences (data: ProcessedOrcaData[]): Record<string, number> {
  return data.reduce<Record<string, number>>((prev, cur) => {
    if (!cur.line) {
      return prev
    }
    const previousValue = prev[cur.line] || 0
    prev[cur.line] = previousValue + 1
    return prev
  }, {})
}
