import { GradientPinkBlue } from '@visx/gradient'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Area, AreaClosed, Bar, BarGroupHorizontal } from '@visx/shape'
import React, { useEffect, useMemo, useState } from 'react'
import { AppState } from '../components/AppContext'
import { ExtraDataType } from '../types'
import { TransitStory } from './StoryInterface'

const BAR_SPACING = 20
const BAR_WIDTH = 15
const NUM_TO_SHOW = 5

function FavoriteRoutes ({ state }: { state: AppState }): JSX.Element {
  const data = state?.extraData?.routeOccurrences.slice(0, 5) ?? []

  return (
    <div style={{ aspectRatio: '9/16' }}>
      <ParentSize>
        {
          (parent) => {
            const yScale = scaleBand({
              domain: data.map(d => d.line),
              range: [20, parent.height - 40],
              padding: 0,
              round: true
            })

            const xScale = scaleLinear({
              range: [0, parent.width],
              round: true,
              domain: [0, Math.max(...data.map(d => d.count))]
            })

            return (
              <svg width={parent.width} height={parent.height}>
                <GradientPinkBlue id='visx-pie-gradient' />
                <rect rx={14} width={parent.width} height={parent.height} fill="url('#visx-pie-gradient')" />
                <text y={20} x={10} style={{ fill: 'white', fontWeight: 'bold' }}>2022 TOP 5 LINES</text>
                <Group top={60}>
                  {data.map((line, i) => {
                    const barWidth = xScale(line.count)
                    const barHeight = yScale.bandwidth()
                    const barY = yScale(line.line) - barHeight / 2
                    return (
                      <React.Fragment key={line.line}>
                        <Bar key={`bar-${line.line}`} width={barWidth} height={barHeight} y={barY} x={0} />
                        <text y={yScale(line.line)} x={10} style={{ fill: 'white' }}>{line.line}</text>
                      </React.Fragment>
                    )
                  })}
                </Group>
              </svg>
            )
          }
        }
      </ParentSize>
    </div>
  )
}

FavoriteRoutes.storyName = 'Favorite Routes'
FavoriteRoutes.test = () => true

export default FavoriteRoutes as TransitStory
