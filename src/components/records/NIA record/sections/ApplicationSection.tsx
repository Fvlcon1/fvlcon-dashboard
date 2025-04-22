import React from "react";
import Container from "../../components/container";
import List from "../../components/list";
import theme from "@styles/theme";

interface ApplicationSectionProps {
  applicationDetails: any[];
}

const ApplicationSection: React.FC<ApplicationSectionProps> = ({ applicationDetails }) => (
  <Container title="Application Details">
    <div className="w-full p-4 flex gap-2">
      <List data={applicationDetails} evenBg={theme.colors.bg.secondary} />
    </div>
  </Container>
);

export default ApplicationSection;
