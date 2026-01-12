import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Droplets, Flame, Plus, Check, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type EnergyType = "electricity" | "water" | "gas";

interface ConsumptionEntry {
  id: number;
  date: string;
  type: EnergyType;
  value: number;
}

const energyTypes = [
  {
    value: "electricity" as const,
    label: "Électricité",
    icon: Zap,
    unit: "kWh",
    color: "text-electricity",
    bg: "bg-electricity/10",
  },
  {
    value: "water" as const,
    label: "Eau",
    icon: Droplets,
    unit: "L",
    color: "text-water",
    bg: "bg-water/10",
  },
  {
    value: "gas" as const,
    label: "Gaz",
    icon: Flame,
    unit: "kWh",
    color: "text-gas",
    bg: "bg-gas/10",
  },
];

const Saisie = () => {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState<EnergyType>("electricity");
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<ConsumptionEntry[]>([]);

  const selectedEnergy = energyTypes.find((e) => e.value === type)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value || parseFloat(value) <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une valeur valide.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: ConsumptionEntry = {
      id: Date.now(),
      date,
      type,
      value: parseFloat(value),
    };

    setEntries([newEntry, ...entries]);
    setValue("");

    toast({
      title: "Consommation enregistrée",
      description: `${parseFloat(value).toLocaleString("fr-FR")} ${selectedEnergy.unit} de ${selectedEnergy.label.toLowerCase()} ajoutés.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-muted-foreground text-lg">
          ✏️ C'est le moment d'enregistrer vos derniers relevés de consommation !
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-border p-6 shadow-card"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            Nouveau relevé
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">
                Date du relevé
              </Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Energy Type Selection */}
            <div className="space-y-2">
              <Label className="text-foreground">Type d'énergie</Label>
              <div className="grid grid-cols-3 gap-3">
                {energyTypes.map((energy) => {
                  const Icon = energy.icon;
                  const isSelected = type === energy.value;
                  return (
                    <button
                      key={energy.value}
                      type="button"
                      onClick={() => setType(energy.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `border-current ${energy.color} ${energy.bg}`
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${isSelected ? energy.color : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                        {energy.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Value Input */}
            <div className="space-y-2">
              <Label htmlFor="value" className="text-foreground">
                Valeur ({selectedEnergy.unit})
              </Label>
              <div className="relative">
                <selectedEnergy.icon className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${selectedEnergy.color}`} />
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="pl-10 pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {selectedEnergy.unit}
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Enregistrer le relevé
            </Button>
          </form>
        </motion.div>

        {/* Recent Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card border border-border p-6 shadow-card"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            Saisies récentes
          </h3>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Aucune saisie pour le moment.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Utilisez le formulaire pour ajouter vos relevés.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => {
                const energyInfo = energyTypes.find((e) => e.value === entry.type)!;
                const Icon = energyInfo.icon;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${energyInfo.bg}`}>
                        <Icon className={`h-5 w-5 ${energyInfo.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {energyInfo.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-foreground">
                        {entry.value.toLocaleString("fr-FR")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {energyInfo.unit}
                      </span>
                      <Check className="h-4 w-4 text-success ml-2" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {energyTypes.map((energy) => {
          const Icon = energy.icon;
          const totalForType = entries
            .filter((e) => e.type === energy.value)
            .reduce((sum, e) => sum + e.value, 0);

          return (
            <div
              key={energy.value}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <div className={`p-3 rounded-xl ${energy.bg}`}>
                <Icon className={`h-6 w-6 ${energy.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{energy.label} saisie</p>
                <p className="font-display text-xl font-bold text-foreground">
                  {totalForType.toLocaleString("fr-FR")}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {energy.unit}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Saisie;
