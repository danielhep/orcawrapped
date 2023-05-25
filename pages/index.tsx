import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppState } from "../src/components/AppContext";
import { useRouter } from "next/router";
import { parseOrcaFiles } from "../src/processing_utils/processingUtils";
import { Dropzone, ExtFile } from "@files-ui/react";
import FileUpload from "../src/components/FileUpload";
import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import OrcaQuestionBox from "../src/components/OrcaQuestionBox";

export default function Index() {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [appState, setCsvRows] = useAppState();
  const router = useRouter();
  const theme = useTheme();

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

  const hasStoredData = appState?.orcaData.length > 0;

  return (
    <>
      <Head>
        <title>ORCA Boop Report</title>
        <meta name="description" content="Get your ORCA boop report!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "calc(100vh - 36px)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              lineHeight: 1.5,
              color: theme.palette.text.primary,
            }}
          >
            See your{" "}
            <span style={{ color: theme.palette.brightText }}>
              ORCA Boop Report
            </span>{" "}
            by uploading your card history.
          </Typography>
          <FileUpload
            files={files}
            onFilesChange={setFiles}
            onClickContinue={() => void router.push("/wrapped")}
            continueButtonDisabled={!hasStoredData}
          />
          <OrcaQuestionBox>
            Get your ORCA CSV file from{" "}
            <Link href="https://myorca.com">myorca.com</Link>. Link your card
            and then navigate to "Card Activity", then click the "Download CSV"
            button to get your CSV.
          </OrcaQuestionBox>
        </Box>
      </Container>
    </>
  );
}
