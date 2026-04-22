import FuelPricesHistoryChart from "./fuelPriceHistory";
import FuelPricesTampere from "./fuelPricesTampere";

export const metadata = {
  title: "Fuel Prices - konsuu.net",
  description: "Current fuel prices and historical trends in Tampere, Finland",
};

export default function FuelPrices() {
  return (
    <main className="container-fluid px-0">
      <FuelPricesHistoryChart />
      <FuelPricesTampere />
    </main>
  );
}