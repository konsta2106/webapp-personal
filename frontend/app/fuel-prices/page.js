import FuelPricesHistoryChart from "./fuelPriceHistory";

export default function FuelPrices() {
    return (
      <>
      <main className="container">
        <section id="general" className="my-5">
          <h1>Fuel Prices</h1>
          <FuelPricesHistoryChart />
        </section>
      </main>
      </>
    );
  }