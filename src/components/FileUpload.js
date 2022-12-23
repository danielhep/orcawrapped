import { Box } from '@mui/material'
import { Dropzone, FileItem } from '@dropzone-ui/react'

export default function FileUpload ({ onFilesChange, files }) {
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Dropzone onChange={onFilesChange} value={files} accept='.csv'>
          {files.map((file) => (
            <FileItem {...file} key={file.id} preview />
          ))}
        </Dropzone>
      </Box>
    </>
  )
}
