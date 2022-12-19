import { FileValidated } from '@dropzone-ui/react'
import { ArrowForward } from '@mui/icons-material'
import { Box, Button, Container } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppState } from '../src/components/AppContext'
import FileUpload from '../src/components/FileUpload'
import { parseOrcaFiles } from '../src/processingUtils'

export default function Home (): JSX.Element {
  const [files, setFiles] = useState<FileValidated[]>([])
  const [appState, setAppState] = useAppState()
  const router = useRouter()

  useEffect(() => {
    async function process (): Promise<void> {
      const output = await parseOrcaFiles(files.map(f => f.file))
      setAppState(output)
    }
    if (files.length > 0) { void process() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])
  console.log(!appState?.processed)
  console.log(appState?.processed)

  return (
    <>
      <Head>
        <title>ORCA Year in Transit</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box
        component='main'
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth='sm'>
          <FileUpload onFilesChange={setFiles} files={files} />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              color='success'
              variant='contained'
              endIcon={<ArrowForward />}
              disabled={!appState}
              onClick={() => { void router.push('/wrapped') }}
            >
              View ORCA Wrapped
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}
