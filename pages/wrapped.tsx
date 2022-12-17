import { Box, Container } from '@mui/material'

export default function Wrapped (): JSX.Element {
  return (
    <Container>
      <Box sx={{ width: 1080, height: 1920, background: 'black' }}>test</Box>
    </Container>
  )
}
