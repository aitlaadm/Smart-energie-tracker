import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface ConsumptionAlertProps {
  type: "success" | "warning" | "danger";
  title: string;
  message: string;
}

const alertStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: Info,
    iconColor: "text-yellow-600",
  },
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-600",
  },
};

const ConsumptionAlert = ({ type, title, message }: ConsumptionAlertProps) => {
  const normalizedType = (type.toLowerCase()) as "success" | "warning" | "danger";
  const styles = alertStyles[normalizedType];
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${styles.bg} ${styles.border}`}
    >
      <Icon className={`h-5 w-5 mt-0.5 ${styles.iconColor}`} />
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{message}</p>
      </div>
    </motion.div>
  );
};

export default ConsumptionAlert;
