import { MasonryGrid } from '@egjs/react-grid'
import { Container } from '@mui/material'
import { useAppState } from '../src/components/AppContext'
import allStories from '../src/stories'

export default function Wrapped (): JSX.Element {
  const [appState] = useAppState()
  const shownStories = allStories.filter(s => s.test(appState))
  return (
    <Container>
      <MasonryGrid>
        {shownStories.map(S => <S state={appState} key={S.storyName} />)}
      </MasonryGrid>
    </Container>
  )
}
