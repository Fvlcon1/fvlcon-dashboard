import React from "react";
import Container from "../../components/container";
import List from "../../components/list";
import theme from "@styles/theme";

interface HometownSectionProps {
  hometown: any[];
}

const HometownSection: React.FC<HometownSectionProps> = ({ hometown }) => (
  <Container title="Hometown">
    <div className="w-full p-4 flex gap-2">
      <List data={hometown} evenBg={theme.colors.bg.secondary} first={2} />
      <List data={hometown} evenBg={theme.colors.bg.secondary} last={2} />
    </div>
  </Container>
);

export default HometownSection;
