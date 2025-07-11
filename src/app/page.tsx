"use client";
import Image from "next/image";
import { TabsContent } from "../components/ui/tabs";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Expanded metrics for a more total view
const metrics = [
  {
    label: "GPT-3 Training Energy",
    value: "1,287,000 kilowatt-hours",
    sub: "Single GPT-3 run",
    icon: "/energy.svg",
    color: "bg-blue-100 text-blue-800",
    comparison: "≈ 120 US homes/year",
  },
  {
    label: "GPT-3 Training Carbon",
    value: "552,000 kilograms CO₂ equivalent",
    sub: "Single GPT-3 run",
    icon: "/carbon.svg",
    color: "bg-green-100 text-green-800",
    comparison: "≈ 650 acres forest/year",
  },
  {
    label: "GPT-3 Training Water",
    value: "700,000 liters",
    sub: "Single GPT-3 run",
    icon: "/water.svg",
    color: "bg-cyan-100 text-cyan-800",
    comparison: "≈ 1,850 US homes/day",
  },
  {
    label: "GPT-3 E-waste",
    value: "~35 kilograms per server",
    sub: "3–5 year lifecycle",
    icon: "/waste.svg",
    color: "bg-yellow-100 text-yellow-800",
    comparison: "17% recycled globally",
  },
  {
    label: "Global AI Energy (2023)",
    value: "10+ terawatt-hours",
    sub: "All AI workloads",
    icon: "/global-energy.svg",
    color: "bg-blue-200 text-blue-900",
    comparison: "≈ 1 million US homes/year",
  },
  {
    label: "Global AI Carbon (2023)",
    value: ">4 million tons CO₂ equivalent",
    sub: "All AI workloads",
    icon: "/global-carbon.svg",
    color: "bg-green-200 text-green-900",
    comparison: "≈ 1 million cars/year",
  },
  {
    label: "Global AI Water (2023)",
    value: ">1 billion liters",
    sub: "All AI workloads",
    icon: "/global-water.svg",
    color: "bg-cyan-200 text-cyan-900",
    comparison: "≈ 1 million US homes/day",
  },
  {
    label: "Global AI E-waste (2023)",
    value: ">10,000 tons",
    sub: "All AI hardware",
    icon: "/global-waste.svg",
    color: "bg-yellow-200 text-yellow-900",
    comparison: "17% recycled globally",
  },
];

// Updated pie chart: Emphasize AI's rapid growth and projected impact
// Data sources: IEA, Cambridge Bitcoin Electricity Index, International Aluminum Institute, industry reports
const pieData = {
  labels: [
    "Current AI (2023-24)",
    "Projected AI (2027)",
    "All Data Centers (2022)",
    "Bitcoin Mining (2023)",
    "YouTube Streaming (2022)",
    "Global Internet (2022)",
    "Global Aviation (2022)",
    "Global Aluminum (2021)",
    "US Electricity (2022)",
  ],
  datasets: [
    {
      // Current AI: 15 TWh (midpoint of 10-20), Projected AI: 100 TWh (IEA 2024 projection)
      data: [15, 100, 460, 121, 244, 1250, 1000, 880, 4000],
      backgroundColor: [
        "#2563eb", // Current AI - blue
        "#ef4444", // Projected AI - red
        "#60a5fa", // Data centers - light blue
        "#facc15", // Bitcoin - yellow
        "#f97316", // YouTube - orange
        "#a78bfa", // Internet - purple
        "#f87171", // Aviation - light red
        "#84cc16", // Aluminum - lime
        "#34d399", // US electricity - green
      ],
      borderWidth: 0,
    },
  ],
};

const donutData = {
  labels: ["Recycled", "Not Recycled"],
  datasets: [
    {
      data: [17, 83],
      backgroundColor: ["#34d399", "#f87171"],
      borderWidth: 0,
    },
  ],
};

// Data for Huge Energy Costs bar graph
const trainingBarData = {
  labels: ["GPT-3", "GPT-4 (est.)", "Gemini 1.5 (est.)", "Claude 3 (est.)"],
  datasets: [
    {
      label: "Training Energy (MWh)",
      data: [1287, 3000, 2000, 1500], // GPT-4 is estimated higher, Gemini/Claude are ballpark
      backgroundColor: ["#2563eb", "#f87171", "#a78bfa", "#34d399"],
      borderRadius: 8,
    },
  ],
};

// Data for Global AI vs. Small Countries bar graph
const globalBarData = {
  labels: ["Global AI workloads (2023)", "Jordan", "Latvia"],
  datasets: [
    {
      label: "Annual Electricity Use (TWh)",
      data: [15, 19, 7.5], // AI: 10–20 TWh (midpoint 15), Jordan: ~19 TWh, Latvia: ~7.5 TWh
      backgroundColor: ["#ef4444", "#60a5fa", "#a78bfa"],
      borderRadius: 8,
    },
  ],
};

const tabDetails = [
  {
    key: "energy",
    label: "Energy",
    content: (
      <div className="flex flex-col gap-4">
        <Pie data={pieData} options={{ plugins: { legend: { position: "bottom" } } }} />
        <ul className="text-sm leading-6 mt-2">
          <li><b>Current AI (2023-24):</b> 10-20 TWh (15 TWh shown)</li>
          <li><b>All Data Centers (2022):</b> 460 TWh</li>
          <li><b>Bitcoin Mining (2023):</b> 121 TWh</li>
          <li><b>YouTube Streaming (2022):</b> 244 TWh</li>
          <li><b>Global Internet (2022):</b> 1,100-1,400 TWh (1,250 TWh shown)</li>
          <li><b>Global Aviation (2022):</b> ~1,000 TWh</li>
          <li><b>Global Aluminum (2021):</b> 880 TWh</li>
          <li><b>US Electricity (2022):</b> 4,000 TWh</li>
          <li className="mt-2 text-gray-500">Sources: IEA, Cambridge Bitcoin Electricity Index, International Aluminum Institute, industry reports</li>
        </ul>
      </div>
    ),
  },
  {
    key: "carbon",
    label: "Carbon",
    content: (
      <div className="flex flex-col gap-4">
        <ul className="text-sm leading-6">
          <li>GPT-3 training: <b>552 t CO₂e</b></li>
          <li>Global AI (2023): <b>4M t CO₂e</b></li>
          <li>Inference: <b>0.0002–0.001 kg CO₂e/1,000 tokens</b></li>
          <li>Comparison: 4M t CO₂e ≈ 1M cars/year</li>
          <li>Source: Patterson et al., 2021; Industry estimates</li>
        </ul>
      </div>
    ),
  },
  {
    key: "water",
    label: "Water",
    content: (
      <div className="flex flex-col gap-4">
        <ul className="text-sm leading-6">
          <li>GPT-3 training: <b>700,000 L</b></li>
          <li>Global AI (2023): <b>1B+ L</b></li>
          <li>Inference: <b>0.5 ml/10 prompts</b></li>
          <li>Comparison: 1B L ≈ 1M US homes/day</li>
          <li>Source: Li et al., 2023; Industry estimates</li>
        </ul>
      </div>
    ),
  },
  {
    key: "waste",
    label: "Hardware Waste",
    content: (
      <div className="flex flex-col gap-4">
        <Doughnut data={donutData} options={{ plugins: { legend: { position: "bottom" } } }} />
        <ul className="text-sm leading-6">
          <li>1 A100 GPU server ≈ <b>30–40 kg e-waste</b> (3–5 years)</li>
          <li>Global AI e-waste (2023): <b>10,000+ t</b></li>
          <li>Global e-waste recycling: <b>17%</b></li>
          <li>Source: UN Global E-waste Monitor 2023; Industry estimates</li>
        </ul>
      </div>
    ),
  },
];

export default function Home() {
  const [selectedGraph, setSelectedGraph] = React.useState("energy");

  // Graphs config
  const graphCards = [
    {
      key: "energy",
      label: "AI vs. Other Global Energy Uses",
      chart: <Pie data={pieData} options={{ plugins: { legend: { display: false } } }} />, // Hide legend for compact view
      detail: tabDetails.find((t) => t.key === "energy")?.content,
    },
    {
      key: "training",
      label: "Model Training Energy (Bar)",
      chart: <Bar data={trainingBarData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />, // Hide legend
      detail: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full max-w-md mx-auto">
            <Bar data={trainingBarData} options={{ plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
          <ul className="text-sm leading-6 mt-2">
            <li><b>GPT-3:</b> 1,287 MWh (1.3 GWh)</li>
            <li><b>GPT-4 (est.):</b> 3,000 MWh</li>
            <li><b>Gemini 1.5 (est.):</b> 2,000 MWh</li>
            <li><b>Claude 3 (est.):</b> 1,500 MWh</li>
            <li className="mt-2 text-gray-500">Sources: Industry estimates, OpenAI, Google, Anthropic</li>
          </ul>
        </div>
      ),
    },
    {
      key: "global",
      label: "Global AI vs. Small Countries",
      chart: <Bar data={globalBarData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />, // Hide legend
      detail: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full max-w-md mx-auto">
            <Bar data={globalBarData} options={{ plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
          <ul className="text-sm leading-6 mt-2">
            <li><b>Global AI workloads (2023):</b> 15 TWh</li>
            <li><b>Jordan:</b> 19 TWh</li>
            <li><b>Latvia:</b> 7.5 TWh</li>
            <li className="mt-2 text-gray-500">Sources: IEA, World Bank, Industry estimates</li>
          </ul>
        </div>
      ),
    },
    {
      key: "waste",
      label: "AI Hardware E-waste",
      chart: <Doughnut data={donutData} options={{ plugins: { legend: { display: false } } }} />, // Hide legend
      detail: (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full max-w-md mx-auto">
            {tabDetails.find((t) => t.key === "waste")?.content?.props.children[0]}
          </div>
          {tabDetails.find((t) => t.key === "waste")?.content?.props.children[1]}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-0 sm:p-8">
      <main className="w-full max-w-5xl flex flex-col gap-8 mt-8">
        <section className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-3">
            <Image src="/globe.svg" alt="Impact" width={48} height={48} />
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-800">AI Environmental Impact</h1>
          </div>
          <p className="text-lg text-gray-600 text-center max-w-2xl mt-2">Statistics and visualizations of the environmental impact of large AI/LLM models</p>
        </section>
        {/* Metric Tiles Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className={`rounded-xl shadow-lg p-5 flex flex-col items-center gap-2 transition-transform hover:scale-105 ${m.color}`}>
              <Image src={m.icon} alt={m.label} width={32} height={32} />
              <div className="text-xl font-bold">{m.value}</div>
              <div className="text-xs uppercase tracking-wide opacity-80">{m.label}</div>
              <div className="text-xs text-gray-500">{m.sub}</div>
              <div className="text-xs text-gray-700 font-medium mt-1">{m.comparison}</div>
            </div>
          ))}
        </section>
        {/* Interactive Graphs Section */}
        <section className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {graphCards.map((g) => (
              <button
                key={g.key}
                onClick={() => setSelectedGraph(g.key)}
                className={`group rounded-xl shadow-md p-4 flex flex-col items-center gap-2 border-2 transition-all duration-200 focus:outline-none
                  ${selectedGraph === g.key ? 'border-blue-500 bg-blue-50 scale-105' : 'border-transparent bg-white hover:bg-blue-50 hover:scale-105'}`}
                aria-pressed={selectedGraph === g.key}
              >
                <div className="w-full h-48 flex items-center justify-center">{g.chart}</div>
                <div className="text-base font-semibold text-gray-800 mt-2 text-center">{g.label}</div>
              </button>
            ))}
          </div>
          {/* Detail Panel */}
          <div className="mt-6">
            <div className="rounded-xl bg-gradient-to-r from-blue-100 to-green-100 shadow-inner p-6 animate-fade-in">
              {graphCards.find((g) => g.key === selectedGraph)?.detail}
            </div>
          </div>
        </section>
        <section className="text-xs text-gray-500 mt-8 max-w-3xl mx-auto">
          <b>References:</b> Patterson et al., 2021 (arXiv:2104.10350); Li et al., 2023 (arXiv:2304.03271); UN Global E-waste Monitor 2023; IEA; Statista; Cambridge Bitcoin Electricity Consumption Index; OpenAI, HuggingFace, Google whitepapers; Industry estimates.
        </section>
      </main>
    </div>
  );
}
