import styled from "@emotion/styled";
import { Paper } from "@mui/material";

const OrcaCard = styled(Paper)<{ dark?: boolean }>`
  border-radius: 12px;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  max-width: 350px;
`;

export default OrcaCard;
