import type { AppState } from './../components/AppContext'

export interface TransitStory {
  storyName: string
  test: (state: AppState) => boolean
  ({ state }: { state: AppState }): JSX.Element
}
