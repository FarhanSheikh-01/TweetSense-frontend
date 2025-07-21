import { useState, useMemo } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLOR_MAP = {
  positive: "#6366F1", // Indigo
  negative: "#C084FC", // Light Purple
  neutral: "#F472B6",  // Pink
};

const LEGEND_ITEMS = [
  { label: "Positive", key: "positive", color: COLOR_MAP.positive },
  { label: "Negative", key: "negative", color: COLOR_MAP.negative },
  { label: "Neutral", key: "neutral", color: COLOR_MAP.neutral },
];

export default function Chat1({ tweets = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate counts by sentiment ("positive", "negative", "neutral")
  const counts = useMemo(() => {
    const tally = { positive: 0, negative: 0, neutral: 0 };
    for (const t of tweets) {
      let sentiment = (t.predicted_sentiment || t.sentiment || "").toLowerCase();
      if (["positive", "negative", "neutral"].includes(sentiment)) {
        tally[sentiment]++;
      }
    }
    return tally;
  }, [tweets]);

  // Build chart data for Recharts
  const chartData = [
    { name: "Positive", value: counts.positive, fill: COLOR_MAP.positive },
    { name: "Negative", value: counts.negative, fill: COLOR_MAP.negative },
    { name: "Neutral",  value: counts.neutral, fill: COLOR_MAP.neutral },
  ];

  // Handle active section
  const onPieEnter = (_, index) => setActiveIndex(index);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value,
    } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="green" className="font-bold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 20} textAnchor="middle" fill="green" fontSize={12}>
          {`${value} tweets (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  const totalTweets = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">Pie Chart - Interactive</h3>
          <p className="text-sm text-gray-500">Tweet sentiment stats</p>
        </div>
      </div>

      {/* Pie Chart + Legend Row */}
      <div className="flex flex-row items-center justify-center gap-6 mb-4">
        {/* Chart */}
        <div className="aspect-square" style={{ width: 220, height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend / Scale */}
        <div className="flex flex-col gap-4">
          {LEGEND_ITEMS.map((item, idx) => (
            <div key={item.key} className="flex items-center gap-3">
              <span
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: item.color,
                  border: "2px solid #e5e7eb",
                }}
              />
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-gray-200 flex-col gap-2 text-sm text-center">
        <div className="flex items-center justify-center gap-2 font-medium text-blue-600">
          Based on {totalTweets || "real-time"} tweet sentiment analysis
        </div>
        <div className="text-gray-500 text-xs">
          Displaying the percentage distribution of positive, negative, and neutral tweets.
        </div>
      </div>
    </div>
  );
}
