import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { ArrowForward } from "@mui/icons-material";

export default function FileUpload({
  onFilesChange,
  onClickContinue,
  files,
  continueButtonDisabled,
}: {
  onFilesChange: (files: ExtFile[]) => void;
  files: ExtFile[];
  onClickContinue: () => void;
  continueButtonDisabled: boolean;
}) {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 450, minWidth: 400 }}>
      <CardContent sx={{ m: 1 }}>
        <Dropzone onChange={onFilesChange} value={files} accept=".csv">
          {files.map((file) => (
            <FileMosaic {...file} key={file.id} preview />
          ))}
        </Dropzone>
        <Button
          onClick={onClickContinue}
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{ width: "100%", mt: 2 }}
          disabled={continueButtonDisabled}
        >
          Show me the goods
        </Button>
        {!continueButtonDisabled && files.length === 0 && (
          <Typography mt={1}>
            <small>
              We found stored ORCA history on this browser. If you'd like to
              overwrite it, upload new files above.
            </small>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
