import { riskAlerts, useCases, recentResults } from "../../constants/dashboardData";
import RiskAlertItem from './components/RiskAlertItem'
import UseCaseCard from "./components/UseCaseCard";
import ResultItem from "./components/ResultItem";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 bg-[#f5f7fa] min-h-screen p-6">
      {/* ...Header and Summary Card here... */}

      

      {/* Main Row */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Card */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-lg p-8 min-h-[220px] transition hover:shadow-xl">
        {/* You can add a chart or summary here */}
        <div className="text-gray-400 italic text-center">[Dashboard Summary or Chart Placeholder]</div>
        </div>
        {/* ...Summary Card... */}
        <aside className="w-full md:w-1/3 flex flex-col gap-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Risk Alerts</h2>
          <div className="flex flex-col gap-4">
            {riskAlerts.map((alert, idx) => (
              <RiskAlertItem key={idx} {...alert} />
            ))}
          </div>
        </aside>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row gap-6">
        <section className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Active Use Cases</h2>
          <div className="flex flex-col gap-4">
            {useCases.map((uc, idx) => (
              <UseCaseCard key={idx} {...uc} />
            ))}
          </div>
        </section>
        <section className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Results</h2>
          <div className="flex flex-col gap-4">
            {recentResults.map((result, idx) => (
              <ResultItem key={idx} {...result} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
