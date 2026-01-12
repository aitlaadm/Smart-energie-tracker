// Données de consommation simulées pour le Smart Energy Tracker

export const monthlyData = [
  { name: "Jan", electricity: 320, water: 4500, gas: 180 },
  { name: "Fév", electricity: 280, water: 4200, gas: 165 },
  { name: "Mar", electricity: 250, water: 3800, gas: 140 },
  { name: "Avr", electricity: 220, water: 3500, gas: 110 },
  { name: "Mai", electricity: 200, water: 4000, gas: 85 },
  { name: "Juin", electricity: 240, water: 4800, gas: 60 },
  { name: "Juil", electricity: 280, water: 5200, gas: 45 },
  { name: "Août", electricity: 290, water: 5500, gas: 40 },
  { name: "Sep", electricity: 260, water: 4600, gas: 70 },
  { name: "Oct", electricity: 300, water: 4100, gas: 120 },
  { name: "Nov", electricity: 340, water: 4000, gas: 155 },
  { name: "Déc", electricity: 380, water: 4300, gas: 190 },
];

export const weeklyData = [
  { name: "Lun", electricity: 45, water: 650, gas: 28 },
  { name: "Mar", electricity: 52, water: 720, gas: 32 },
  { name: "Mer", electricity: 48, water: 680, gas: 30 },
  { name: "Jeu", electricity: 55, water: 750, gas: 35 },
  { name: "Ven", electricity: 60, water: 800, gas: 38 },
  { name: "Sam", electricity: 70, water: 900, gas: 42 },
  { name: "Dim", electricity: 65, water: 850, gas: 40 },
];

export const dailyData = [
  { name: "00h", electricity: 2, water: 20, gas: 1 },
  { name: "03h", electricity: 1.5, water: 15, gas: 0.5 },
  { name: "06h", electricity: 3, water: 80, gas: 2 },
  { name: "09h", electricity: 5, water: 120, gas: 4 },
  { name: "12h", electricity: 6, water: 100, gas: 5 },
  { name: "15h", electricity: 4, water: 80, gas: 3 },
  { name: "18h", electricity: 7, water: 150, gas: 6 },
  { name: "21h", electricity: 8, water: 130, gas: 5 },
];

export const currentConsumption = {
  electricity: { value: 3160, unit: "kWh", trend: 5.2 },
  water: { value: 52600, unit: "L", trend: -3.8 },
  gas: { value: 1360, unit: "kWh", trend: 12.5 },
  total: { value: 4520, unit: "kWh eq.", trend: 2.1 },
};

export const historicalRecords = [
  { id: 1, date: "2024-01-15", type: "electricity", value: 45, unit: "kWh" },
  { id: 2, date: "2024-01-15", type: "water", value: 650, unit: "L" },
  { id: 3, date: "2024-01-15", type: "gas", value: 28, unit: "kWh" },
  { id: 4, date: "2024-01-14", type: "electricity", value: 52, unit: "kWh" },
  { id: 5, date: "2024-01-14", type: "water", value: 720, unit: "L" },
  { id: 6, date: "2024-01-14", type: "gas", value: 32, unit: "kWh" },
  { id: 7, date: "2024-01-13", type: "electricity", value: 48, unit: "kWh" },
  { id: 8, date: "2024-01-13", type: "water", value: 680, unit: "L" },
  { id: 9, date: "2024-01-13", type: "gas", value: 30, unit: "kWh" },
  { id: 10, date: "2024-01-12", type: "electricity", value: 55, unit: "kWh" },
  { id: 11, date: "2024-01-12", type: "water", value: 750, unit: "L" },
  { id: 12, date: "2024-01-12", type: "gas", value: 35, unit: "kWh" },
];

export const alerts = [
  {
    type: "danger" as const,
    title: "Consommation de gaz élevée",
    message: "Votre consommation de gaz a augmenté de 12.5% ce mois-ci. Vérifiez votre chauffage.",
  },
  {
    type: "success" as const,
    title: "Économie d'eau réalisée",
    message: "Félicitations ! Vous avez réduit votre consommation d'eau de 3.8% ce mois.",
  },
  {
    type: "warning" as const,
    title: "Pic de consommation détecté",
    message: "Un pic de consommation électrique a été détecté samedi entre 18h et 21h.",
  },
];
