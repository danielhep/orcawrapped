import { Box } from '@mui/material'
import { Dropzone, FileItem } from '@dropzone-ui/react'

export default function FileUpload ({ onFilesChange, files }) {
  const updateFiles = (incommingFiles) => {
    onFilesChange(incommingFiles)
  }

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Dropzone onChange={updateFiles} value={files} accept='.csv'>
          {files.map((file) => (
            <FileItem {...file} key={file.id} preview />
          ))}
        </Dropzone>
      </Box>
    </>
  )
}