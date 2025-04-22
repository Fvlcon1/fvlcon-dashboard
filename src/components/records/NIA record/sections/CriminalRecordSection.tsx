import React, { Fragment } from "react";
import Container from "../../components/container";
import List from "../../components/list";
import Divider from "@components/divider/divider";
import Text from "@styles/components/text";
import theme from "@styles/theme";

interface CriminalRecordSectionProps {
  criminalRecord: any[][];
}

const CriminalRecordSection: React.FC<CriminalRecordSectionProps> = ({ criminalRecord }) => (
  <Container title="Criminal Record">
    {criminalRecord && criminalRecord.length > 0 &&
      criminalRecord.map((record: any, index: number) => (
        <Fragment key={index}>
          <div className="w-full p-4 flex flex-col gap-2">
            <Text textColor={theme.colors.text.tetiary}>{`#${index}`}</Text>
            <div className="w-full flex gap-2">
              <List data={record} evenBg={theme.colors.bg.secondary} first={3} />
              <List data={record} evenBg={theme.colors.bg.secondary} last={3} />
            </div>
          </div>
          <Divider />
        </Fragment>
      ))
    }
  </Container>
);

export default CriminalRecordSection;
