import React from "react";
import Container from "../../components/container";
import List from "../../components/list";
import theme from "@styles/theme";

interface OccupationSectionProps {
  occupation: any[];
}

const OccupationSection: React.FC<OccupationSectionProps> = ({ occupation }) => (
  <Container title="Occupation">
    <div className="w-full p-4 flex gap-2">
      <List data={occupation} evenBg={theme.colors.bg.secondary} />
    </div>
  </Container>
);

export default OccupationSection;
