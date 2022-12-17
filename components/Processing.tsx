import { Box, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { parseOrcaFiles } from '../utils'
import { useAppState } from './AppContext'

export default function Processing ({ files }): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [appState, setAppState] = useAppState()
  useEffect(() => {
    async function process (): Promise<void> {
      const output = await parseOrcaFiles(files)
      setAppState(output)
      setIsLoading(false)
    }
    void process()
  }, [files, setAppState])

  return (
    <Box sx={{ my: 4 }}>
      <LinearProgress />
    </Box>
  )
}
