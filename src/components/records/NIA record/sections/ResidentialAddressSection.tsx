import React from "react";
import Container from "../../components/container";
import List from "../../components/list";
import theme from "@styles/theme";

interface ResidentialAddressSectionProps {
  residentialAddress: any[];
}

const ResidentialAddressSection: React.FC<ResidentialAddressSectionProps> = ({ residentialAddress }) => (
  <Container title="Residential Address">
    <div className="w-full p-4 flex gap-2">
      <List data={residentialAddress} evenBg={theme.colors.bg.secondary} first={3} />
      <List data={residentialAddress} evenBg={theme.colors.bg.secondary} last={3} />
    </div>
  </Container>
);

export default ResidentialAddressSection;
