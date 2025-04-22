import React from "react";
import Container from "../../components/container";
import List from "../../components/list";
import theme from "@styles/theme";

interface PersonalSectionProps {
  personDetails: any[];
}

const PersonalSection: React.FC<PersonalSectionProps> = ({ personDetails }) => (
  <Container title="Personal Details">
    <div className="w-full p-4 flex gap-2">
      <List data={personDetails} evenBg={theme.colors.bg.secondary} first={4} />
      <List data={personDetails} evenBg={theme.colors.bg.secondary} last={4} />
    </div>
  </Container>
);

export default PersonalSection;
