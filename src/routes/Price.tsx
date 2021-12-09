import styled from "styled-components";

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 300px;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px;
  border-radius: 10px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;

const TableHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

function Price({ priceData }: any) {
  const priceArray = [
    { desc: "15MIN", percent: priceData.percent_change_15m },
    { desc: "30MIN", percent: priceData.percent_change_30m },
    { desc: "1HOUR", percent: priceData.percent_change_1h },
    { desc: "6HOUR", percent: priceData.percent_change_6h },
    { desc: "12HOUR", percent: priceData.percent_change_12h },
    { desc: "24HOUR", percent: priceData.percent_change_24h },
    { desc: "7DAY", percent: priceData.percent_change_7d },
    { desc: "30DAY", percent: priceData.percent_change_30d },
    { desc: "1YEAR", percent: priceData.percent_change_1y },
  ];
  const getColor = (percent: Number) => {
    if (percent > 0) return "DeepSkyBlue";
    else if (percent < 0) return "Tomato";
    else return "inherit";
  };

  return (
    <Table>
      <Row>
        <TableHeader>TIME PERIOD</TableHeader>
        <TableHeader>CHANGE PERCENT</TableHeader>
      </Row>

      {priceArray.map((row) => {
        return (
          <Row key={row.desc}>
            <div>{row.desc}</div>
            <div style={{ color: getColor(row.percent) }}>
              {row.percent > 0 ? "+" : ""}
              {row.percent}%
            </div>
          </Row>
        );
      })}
    </Table>
  );
}

export default Price;
