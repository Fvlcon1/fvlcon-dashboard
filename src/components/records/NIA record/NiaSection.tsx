import Container from "../components/container";
import List from "../components/list";
import theme from "@styles/theme";

interface NiaSectionProps {
  title: string;
  data: any[];
  first?: number;
  last?: number;
}

const NiaSection = ({ title, data, first, last }: NiaSectionProps) => (
  <Container title={title}>
    <div className="w-full p-4 flex gap-2">
      <List data={data} evenBg={theme.colors.bg.secondary} first={first} last={last} />
    </div>
  </Container>
);

export default NiaSection;
