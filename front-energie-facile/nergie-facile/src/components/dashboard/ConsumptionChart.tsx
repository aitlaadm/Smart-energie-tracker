import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface ConsumptionChartProps {
  data: Array<{
    name: string;
    electricity: number;
    water: number;
    gas: number;
  }>;
  type?: "area" | "bar";
  title: string;
  subtitle?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.value.toLocaleString("fr-FR")} {entry.name === "Eau" ? "L" : "kWh"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ConsumptionChart = ({
  data,
  type = "area",
  title,
  subtitle,
}: ConsumptionChartProps) => {
  const Chart = type === "area" ? AreaChart : BarChart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl bg-card border border-border p-5 shadow-card"
    >
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(200, 85%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(200, 85%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 88%)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(160, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(160, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="electricity"
                name="Électricité"
                stroke="hsl(45, 95%, 55%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorElec)"
              />
              <Area
                type="monotone"
                dataKey="water"
                name="Eau"
                stroke="hsl(200, 85%, 50%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWater)"
              />
              <Area
                type="monotone"
                dataKey="gas"
                name="Gaz"
                stroke="hsl(25, 95%, 55%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGas)"
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 88%)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(160, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(160, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="electricity" name="Électricité" fill="hsl(45, 95%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="water" name="Eau" fill="hsl(200, 85%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gas" name="Gaz" fill="hsl(25, 95%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-electricity" />
          <span className="text-sm text-muted-foreground">Électricité</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-water" />
          <span className="text-sm text-muted-foreground">Eau</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gas" />
          <span className="text-sm text-muted-foreground">Gaz</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ConsumptionChart;
