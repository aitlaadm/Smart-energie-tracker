import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter, Zap, Droplets, Flame, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import { monthlyData, weeklyData, dailyData, historicalRecords } from "@/data/mockData";

type Period = "jour" | "mois" | "annee";
type EnergyType = "all" | "electricity" | "water" | "gas";

const typeLabels: Record<string, { label: string; icon: typeof Zap; color: string }> = {
  electricity: { label: "Électricité", icon: Zap, color: "text-electricity" },
  water: { label: "Eau", icon: Droplets, color: "text-water" },
  gas: { label: "Gaz", icon: Flame, color: "text-gas" },
};

const Historique = () => {
  const [period, setPeriod] = useState<Period>("mois");
  const [energyType, setEnergyType] = useState<EnergyType>("all");

  const getChartData = () => {
    switch (period) {
      case "jour":
        return dailyData;
      case "mois":
        return weeklyData;
      case "annee":
        return monthlyData;
      default:
        return monthlyData;
    }
  };

  const filteredRecords = historicalRecords.filter(
    (record) => energyType === "all" || record.type === energyType
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-lg">
            📊 Explorez comment votre consommation a évolué au fil du temps.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 p-4 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jour">Aujourd'hui</SelectItem>
              <SelectItem value="mois">Ce mois</SelectItem>
              <SelectItem value="annee">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={energyType} onValueChange={(v: EnergyType) => setEnergyType(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type d'énergie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les énergies</SelectItem>
              <SelectItem value="electricity">Électricité</SelectItem>
              <SelectItem value="water">Eau</SelectItem>
              <SelectItem value="gas">Gaz</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Chart */}
      <ConsumptionChart
        data={getChartData()}
        type="area"
        title={`Consommation - ${
          period === "jour" ? "Aujourd'hui" : period === "mois" ? "Ce mois" : "Cette année"
        }`}
        subtitle="Visualisation de l'évolution de votre consommation"
      />

      {/* Historical Records Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-card border border-border overflow-hidden shadow-card"
      >
        <div className="p-5 border-b border-border">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Relevés détaillés
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Historique des dernières consommations enregistrées
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Valeur
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => {
                const typeInfo = typeLabels[record.type];
                const Icon = typeInfo.icon;
                return (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-sm text-foreground">
                      {new Date(record.date).toLocaleDateString("fr-FR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${typeInfo.color}`} />
                        <span className="text-sm text-foreground">
                          {typeInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-medium text-foreground">
                        {record.value.toLocaleString("fr-FR")}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {record.unit}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Historique;
