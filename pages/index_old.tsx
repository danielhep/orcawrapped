/* eslint-disable react/no-unescaped-entities */
import { FileValidated } from "@dropzone-ui/react";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Link,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppState } from "../src/components/AppContext";
import FileUpload from "../src/components/FileUpload";
import { parseOrcaFiles } from "../src/processing_utils/processingUtils";

export default function Home(): JSX.Element {
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [appState, setCsvRows] = useAppState();
  const router = useRouter();

  useEffect(() => {
    async function process(): Promise<void> {
      const output = await parseOrcaFiles(files.map((f) => f.file));
      setCsvRows(output);
    }
    if (files.length > 0) {
      void process();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const hasStoredData = Object.keys(appState || {}).length !== 0;

  return (
    <>
      <Head>
        <title>ORCA Year in Transit</title>
        <meta name="description" content="Get your ORCA year in transit!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        component="main"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          gap: 3,
        }}
      >
        <Card sx={{ minWidth: 375, maxWidth: 450 }}>
          <CardContent>
            <FileUpload onFilesChange={setFiles} files={files} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                color="success"
                variant="contained"
                endIcon={<ArrowForward />}
                disabled={!hasStoredData}
                onClick={() => {
                  void router.push("/wrapped");
                }}
              >
                View ORCA Wrapped
              </Button>
              {hasStoredData && files.length === 0 && (
                <Typography mt={1}>
                  <small>
                    We found stored ORCA history on this browser. If you'd like
                    to overwrite it, upload new files above.
                  </small>
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 375, maxWidth: 500 }}>
          <CardHeader
            title="Instructions"
            subheader="How to get your ORCA history."
          />
          <CardContent>
            <Typography paragraph>
              ORCA Wrapped uses the CSV file of your tap history available at{" "}
              <Link target="_blank" rel="noopener" href="https://myorca.com/">
                myorca.com
              </Link>
              . You must have an ORCA account and your card(s) must be added to
              "My ORCA Cards".
              <br />
              <strong>
                Note: ORCA currently does not let riders see their history on
                many employer-provided cards.
              </strong>
              If you are affected by this and you should be able to see your own
              ORCA card history, we recommend filing a complaint with{" "}
              <Link href="https://info.myorca.com/contact/">ORCA support</Link>.
            </Typography>
            <Typography paragraph>
              To download the CSV, go to the My Cards page and click "Manage
              this Card", then the "Card Activity" tab. At the bottom of the
              activity, click the "Download CSV" button. Repeat this for each
              card that you use regularly, ORCA wrapped will aggregate the data
              from all of them.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
