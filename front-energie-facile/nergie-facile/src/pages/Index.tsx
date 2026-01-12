import { Zap, Droplets, Flame, Activity, Loader2 } from "lucide-react";
import EnergyCard from "@/components/dashboard/EnergyCard";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import ConsumptionAlert from "@/components/dashboard/ConsumptionAlert";
import { useDashboardData } from "@/hooks/useApi";

const Index = () => {
  const { currentConsumption, monthlyData, weeklyData, alerts, isLoading } = useDashboardData();

  // Transformer les données mensuelles pour le graphique
  const chartMonthlyData = monthlyData?.map((month: any) => ({
    name: month.monthName || month.name,
    electricity: month.electricityValue || month.electricity || 0,
    water: month.waterValue || month.water || 0,
    gas: month.gasValue || month.gas || 0,
  })) || [];

  // Transformer les données hebdomadaires pour le graphique
  const chartWeeklyData = weeklyData?.map((day: any, index: number) => ({
    name: `J${index + 1}`,
    electricity: day.electricityValue || day.electricity || 0,
    water: day.waterValue || day.water || 0,
    gas: day.gasValue || day.gas || 0,
  })) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-muted-foreground text-lg">
          👋 Bienvenue ! Voici un aperçu de votre consommation énergétique aujourd'hui.
        </p>
      </div>

      {/* Energy Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentConsumption && (
          <>
            <EnergyCard
              title="Consommation totale"
              value={currentConsumption.total?.value}
              unit={currentConsumption.total?.unit}
              icon={Activity}
              trend={currentConsumption.total?.trend}
              variant="total"
              delay={0}
            />
            <EnergyCard
              title="Électricité"
              value={currentConsumption.electricity?.value}
              unit={currentConsumption.electricity?.unit}
              icon={Zap}
              trend={currentConsumption.electricity?.trend}
              variant="electricity"
              delay={0.1}
            />
            <EnergyCard
              title="Eau"
              value={currentConsumption.water?.value}
              unit={currentConsumption.water?.unit}
              icon={Droplets}
              trend={currentConsumption.water?.trend}
              variant="water"
              delay={0.2}
            />
            <EnergyCard
              title="Gaz"
              value={currentConsumption.gas?.value}
              unit={currentConsumption.gas?.unit}
              icon={Flame}
              trend={currentConsumption.gas?.trend}
              variant="gas"
              delay={0.3}
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartMonthlyData.length > 0 && (
          <ConsumptionChart
            data={chartMonthlyData}
            type="area"
            title="Évolution annuelle"
            subtitle="Consommation mensuelle sur l'année"
          />
        )}
        {chartWeeklyData.length > 0 && (
          <ConsumptionChart
            data={chartWeeklyData}
            type="bar"
            title="Semaine en cours"
            subtitle="Consommation quotidienne"
          />
        )}
        {chartWeeklyData.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-5 shadow-card flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground text-center">Aucune donnée hebdomadaire disponible</p>
          </div>
        )}
      </div>

      {/* Alerts Section */}
      <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Alertes et notifications
        </h3>
        <div className="space-y-3">
          {alerts && alerts.length > 0 ? (
            alerts.map((alert) => (
              <ConsumptionAlert
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
              />
            ))
          ) : (
            <p className="text-muted-foreground">Aucune alerte pour le moment</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
