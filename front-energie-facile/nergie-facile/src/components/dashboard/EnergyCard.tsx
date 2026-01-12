import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface EnergyCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  trend: number;
  variant: "electricity" | "water" | "gas" | "total";
  delay?: number;
}

const variantStyles = {
  electricity: {
    gradient: "gradient-electricity",
    iconBg: "bg-electricity/10",
    iconColor: "text-electricity",
    trendColor: "text-electricity-foreground",
  },
  water: {
    gradient: "gradient-water",
    iconBg: "bg-water/10",
    iconColor: "text-water",
    trendColor: "text-water-foreground",
  },
  gas: {
    gradient: "gradient-gas",
    iconBg: "bg-gas/10",
    iconColor: "text-gas",
    trendColor: "text-gas-foreground",
  },
  total: {
    gradient: "gradient-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    trendColor: "text-foreground",
  },
};

const EnergyCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  variant,
  delay = 0,
}: EnergyCardProps) => {
  const styles = variantStyles[variant];
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendLabel = trend > 0 ? "hausse" : trend < 0 ? "baisse" : "stable";
  const trendColorClass =
    trend > 0 ? "text-danger" : trend < 0 ? "text-success" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-lg transition-shadow"
    >
      {/* Gradient accent bar */}
      <div className={`h-1 ${styles.gradient}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${styles.iconBg}`}>
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${trendColorClass}`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{Math.abs(trend)}%</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold text-foreground">
              {value.toLocaleString("fr-FR")}
            </span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {trend !== 0 ? `${Math.abs(trend)}% de ${trendLabel}` : "Stable"} vs mois dernier
        </p>
      </div>
    </motion.div>
  );
};

export default EnergyCard;
