import { Box } from '@mui/material'
import { GradientPinkBlue } from '@visx/gradient'
import { ParentSize } from '@visx/responsive'
import { AreaClosed } from '@visx/shape'
import { AppState } from '../components/AppContext'
import { TransitStory } from './StoryInterface'

function FavoriteRoutes ({ state }: { state: AppState }): JSX.Element {
  console.log(state?.extraData?.routeOccurrences)
  return (
    // <Box sx={{
    //   aspectRatio: '9/16',
    //   background: 'blue',
    //   borderRadius: 6,
    //   padding: 2,
    //   boxShadow: '0px 0px 22px 4px #008087'
    // }}
    // >
    //   YOUR TOP LINES
    // </Box>
    <div style={{ aspectRatio: '9/16' }}>
      <ParentSize>
        {
          (parent) => (
            <svg width={parent.width} height={parent.height}>
              <GradientPinkBlue id='visx-pie-gradient' />
              <rect rx={14} width={parent.width} height={parent.height} fill="url('#visx-pie-gradient')" />
              <text y={20} x={10} style={{ fill: 'white', fontWeight: 'bold' }}>2022 TOP 5 LINES</text>
            </svg>
          )
        }
      </ParentSize>
    </div>
  )
}

FavoriteRoutes.storyName = 'Favorite Routes'
FavoriteRoutes.test = () => true

export default FavoriteRoutes as TransitStory
