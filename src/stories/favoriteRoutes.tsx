import { Box } from '@mui/material'
import { AppState } from '../components/AppContext'
import { TransitStory } from './StoryInterface'

function FavoriteRoutes ({ state }: { state: AppState }): JSX.Element {
  console.log(state?.extraData?.routeOccurrences)
  return (
    <p>hello</p>
  )
}

FavoriteRoutes.storyName = 'Favorite Routes'
FavoriteRoutes.test = () => true

export default FavoriteRoutes as TransitStory
