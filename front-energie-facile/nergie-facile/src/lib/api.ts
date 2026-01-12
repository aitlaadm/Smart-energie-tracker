/**
 * Service API pour communiquer avec le backend Spring Boot
 * Base URL: http://localhost:8080/api
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

/**
 * Effectue une requête fetch avec timeout et gestion d'erreurs
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Gérer les réponses vides (204 No Content)
    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * API Service - Tous les endpoints du backend
 */
export const API = {
  // ==================== DASHBOARD ====================

  /**
   * GET /dashboard/current-consumption
   * Récupère la consommation actuelle (mois courant)
   */
  getCurrentConsumption: async () => {
    return apiFetch('/dashboard/current-consumption');
  },

  /**
   * GET /dashboard/monthly-data
   * Récupère les données mensuelles (12 derniers mois)
   */
  getMonthlyData: async () => {
    return apiFetch('/dashboard/monthly-data');
  },

  /**
   * GET /dashboard/weekly-data
   * Récupère les données de la semaine actuelle
   */
  getWeeklyData: async () => {
    return apiFetch('/dashboard/weekly-data');
  },

  /**
   * GET /dashboard/daily-data
   * Récupère toutes les données quotidiennes
   */
  getDailyData: async () => {
    return apiFetch('/dashboard/daily-data');
  },

  /**
   * GET /dashboard/alerts
   * Récupère toutes les alertes actives
   */
  getAlerts: async () => {
    return apiFetch('/dashboard/alerts');
  },

  // ==================== CONSUMPTION RECORDS ====================

  /**
   * POST /consumption-records
   * Crée un nouvel enregistrement de consommation
   */
  createConsumptionRecord: async (data: {
    type: 'ELECTRICITY' | 'WATER' | 'GAS';
    value: number;
    unit?: string;
    recordedAt?: string;
    notes?: string;
  }) => {
    return apiFetch('/consumption-records', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * GET /consumption-records/type/{type}
   * Récupère les enregistrements par type
   */
  getRecordsByType: async (type: 'ELECTRICITY' | 'WATER' | 'GAS') => {
    return apiFetch(`/consumption-records/type/${type}`);
  },

  /**
   * GET /consumption-records/date-range
   * Récupère les enregistrements par plage de dates
   */
  getRecordsByDateRange: async (startDate: string, endDate: string) => {
    const params = new URLSearchParams({ startDate, endDate });
    return apiFetch(`/consumption-records/date-range?${params}`);
  },

  /**
   * GET /consumption-records/total
   * Récupère le total de consommation pour un type et une plage de dates
   */
  getTotalConsumption: async (
    type: 'ELECTRICITY' | 'WATER' | 'GAS',
    startDate: string,
    endDate: string
  ) => {
    const params = new URLSearchParams({ type, startDate, endDate });
    return apiFetch<number>(`/consumption-records/total?${params}`);
  },

  // ==================== DAILY CONSUMPTION ====================

  /**
   * POST /daily-consumption
   * Crée une consommation quotidienne
   */
  createDailyConsumption: async (data: {
    date: string;
    electricityValue: number;
    waterValue: number;
    gasValue: number;
    totalValue: number;
  }) => {
    return apiFetch('/daily-consumption', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * GET /daily-consumption/{date}
   * Récupère la consommation d'une date spécifique
   */
  getDailyByDate: async (date: string) => {
    return apiFetch(`/daily-consumption/${date}`);
  },

  /**
   * GET /daily-consumption/range
   * Récupère les consommations quotidiennes sur une plage
   */
  getDailyByDateRange: async (startDate: string, endDate: string) => {
    const params = new URLSearchParams({ startDate, endDate });
    return apiFetch(`/daily-consumption/range?${params}`);
  },

  /**
   * GET /daily-consumption/all
   * Récupère tous les enregistrements quotidiens
   */
  getAllDailyConsumption: async () => {
    return apiFetch('/daily-consumption/all');
  },

  // ==================== MONTHLY CONSUMPTION ====================

  /**
   * POST /monthly-consumption
   * Crée une consommation mensuelle
   */
  createMonthlyConsumption: async (data: {
    year: number;
    month: number;
    electricityValue: number;
    waterValue: number;
    gasValue: number;
    totalValue: number;
    trend?: number;
  }) => {
    return apiFetch('/monthly-consumption', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * GET /monthly-consumption/{year}/{month}
   * Récupère la consommation d'un mois spécifique
   */
  getMonthlyConsumption: async (year: number, month: number) => {
    return apiFetch(`/monthly-consumption/${year}/${month}`);
  },

  /**
   * GET /monthly-consumption/year/{year}
   * Récupère la consommation d'une année complète
   */
  getMonthlyConsumptionByYear: async (year: number) => {
    return apiFetch(`/monthly-consumption/year/${year}`);
  },

  /**
   * GET /monthly-consumption/all
   * Récupère tous les enregistrements mensuels
   */
  getAllMonthlyConsumption: async () => {
    return apiFetch('/monthly-consumption/all');
  },

  // ==================== ALERTS ====================

  /**
   * POST /alerts
   * Crée une alerte
   */
  createAlert: async (data: {
    type: 'DANGER' | 'WARNING' | 'SUCCESS';
    title: string;
    message: string;
    isActive?: boolean;
  }) => {
    return apiFetch('/alerts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * GET /alerts/active
   * Récupère toutes les alertes actives
   */
  getActiveAlerts: async () => {
    return apiFetch('/alerts/active');
  },

  /**
   * GET /alerts/type/{type}
   * Récupère les alertes par type
   */
  getAlertsByType: async (type: 'DANGER' | 'WARNING' | 'SUCCESS') => {
    return apiFetch(`/alerts/type/${type}`);
  },

  /**
   * PUT /alerts/{id}
   * Met à jour une alerte
   */
  updateAlert: async (
    id: number,
    data: {
      type?: 'DANGER' | 'WARNING' | 'SUCCESS';
      title?: string;
      message?: string;
      isActive?: boolean;
    }
  ) => {
    return apiFetch(`/alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE /alerts/{id}
   * Supprime une alerte
   */
  deleteAlert: async (id: number) => {
    return apiFetch(`/alerts/${id}`, {
      method: 'DELETE',
    });
  },
};

export default API;
