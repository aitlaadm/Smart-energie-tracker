/**
 * Hooks personnalisés pour React Query - Energie Facile
 * Utilisent l'API du backend
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../lib/api';
import type {
  CurrentConsumption,
  MonthlyConsumption,
  DailyConsumption,
  Alert,
  ConsumptionRecord,
} from './types';

// ==================== DASHBOARD HOOKS ====================

/**
 * Hook pour récupérer la consommation actuelle
 * Se rafraîchit toutes les minutes automatiquement
 */
export const useCurrentConsumption = () => {
  return useQuery<CurrentConsumption>({
    queryKey: ['currentConsumption'],
    queryFn: API.getCurrentConsumption,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook pour récupérer les données mensuelles
 */
export const useMonthlyData = () => {
  return useQuery<MonthlyConsumption[]>({
    queryKey: ['monthlyData'],
    queryFn: API.getMonthlyData,
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook pour récupérer les données hebdomadaires
 */
export const useWeeklyData = () => {
  return useQuery<DailyConsumption[]>({
    queryKey: ['weeklyData'],
    queryFn: API.getWeeklyData,
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook pour récupérer toutes les données quotidiennes
 */
export const useDailyData = () => {
  return useQuery<DailyConsumption[]>({
    queryKey: ['dailyData'],
    queryFn: API.getDailyData,
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook pour récupérer les alertes
 * Se rafraîchit toutes les 30 secondes
 */
export const useAlerts = () => {
  return useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: API.getAlerts,
    staleTime: 30000, // 30 secondes
    gcTime: 120000, // 2 minutes
    retry: 1,
  });
};

// ==================== CONSUMPTION RECORDS HOOKS ====================

/**
 * Hook pour créer un enregistrement de consommation
 */
export const useCreateConsumptionRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.createConsumptionRecord,
    onSuccess: () => {
      // Invalider les caches affectés
      queryClient.invalidateQueries({ queryKey: ['currentConsumption'] });
      queryClient.invalidateQueries({ queryKey: ['dailyData'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyData'] });
    },
    onError: (error) => {
      console.error('Error creating consumption record:', error);
    },
  });
};

/**
 * Hook pour récupérer les enregistrements par type
 */
export const useRecordsByType = (type: 'ELECTRICITY' | 'WATER' | 'GAS') => {
  return useQuery<ConsumptionRecord[]>({
    queryKey: ['recordsByType', type],
    queryFn: () => API.getRecordsByType(type),
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook pour récupérer les enregistrements par plage de dates
 */
export const useRecordsByDateRange = (startDate: string, endDate: string) => {
  return useQuery<ConsumptionRecord[]>({
    queryKey: ['recordsByDateRange', startDate, endDate],
    queryFn: () => API.getRecordsByDateRange(startDate, endDate),
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    retry: 2,
    enabled: !!startDate && !!endDate, // Ne lance la requête que si les dates sont présentes
  });
};

/**
 * Hook pour récupérer le total de consommation
 */
export const useTotalConsumption = (
  type: 'ELECTRICITY' | 'WATER' | 'GAS',
  startDate: string,
  endDate: string
) => {
  return useQuery<number>({
    queryKey: ['totalConsumption', type, startDate, endDate],
    queryFn: () => API.getTotalConsumption(type, startDate, endDate),
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    retry: 2,
    enabled: !!startDate && !!endDate,
  });
};

// ==================== DAILY CONSUMPTION HOOKS ====================

/**
 * Hook pour créer une consommation quotidienne
 */
export const useCreateDailyConsumption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.createDailyConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyData'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyData'] });
    },
  });
};

/**
 * Hook pour récupérer la consommation d'une date spécifique
 */
export const useDailyByDate = (date: string) => {
  return useQuery<DailyConsumption>({
    queryKey: ['dailyByDate', date],
    queryFn: () => API.getDailyByDate(date),
    staleTime: 60000,
    gcTime: 300000,
    retry: 2,
    enabled: !!date,
  });
};

/**
 * Hook pour récupérer les consommations quotidiennes sur une plage
 */
export const useDailyByDateRange = (startDate: string, endDate: string) => {
  return useQuery<DailyConsumption[]>({
    queryKey: ['dailyByDateRange', startDate, endDate],
    queryFn: () => API.getDailyByDateRange(startDate, endDate),
    staleTime: 60000,
    gcTime: 300000,
    retry: 2,
    enabled: !!startDate && !!endDate,
  });
};

// ==================== MONTHLY CONSUMPTION HOOKS ====================

/**
 * Hook pour créer une consommation mensuelle
 */
export const useCreateMonthlyConsumption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.createMonthlyConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyData'] });
    },
  });
};

/**
 * Hook pour récupérer la consommation d'un mois spécifique
 */
export const useMonthlyConsumption = (year: number, month: number) => {
  return useQuery<MonthlyConsumption>({
    queryKey: ['monthlyConsumption', year, month],
    queryFn: () => API.getMonthlyConsumption(year, month),
    staleTime: 300000,
    gcTime: 600000,
    retry: 2,
    enabled: !!year && !!month,
  });
};

/**
 * Hook pour récupérer la consommation d'une année complète
 */
export const useMonthlyConsumptionByYear = (year: number) => {
  return useQuery<MonthlyConsumption[]>({
    queryKey: ['monthlyConsumptionByYear', year],
    queryFn: () => API.getMonthlyConsumptionByYear(year),
    staleTime: 300000,
    gcTime: 600000,
    retry: 2,
    enabled: !!year,
  });
};

// ==================== ALERTS HOOKS ====================

/**
 * Hook pour créer une alerte
 */
export const useCreateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.createAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
};

/**
 * Hook pour mettre à jour une alerte
 */
export const useUpdateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      API.updateAlert(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
};

/**
 * Hook pour supprimer une alerte
 */
export const useDeleteAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.deleteAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
};

/**
 * Hook pour récupérer les alertes par type
 */
export const useAlertsByType = (type: 'DANGER' | 'WARNING' | 'SUCCESS') => {
  return useQuery<Alert[]>({
    queryKey: ['alertsByType', type],
    queryFn: () => API.getAlertsByType(type),
    staleTime: 30000,
    gcTime: 120000,
    retry: 1,
    enabled: !!type,
  });
};

// ==================== DASHBOARD HOOK COMBINÉ ====================

/**
 * Hook pour récupérer toutes les données du dashboard
 * Utilise React Query pour paralléliser les requêtes
 */
export const useDashboardData = () => {
  const currentConsumption = useCurrentConsumption();
  const monthlyData = useMonthlyData();
  const weeklyData = useWeeklyData();
  const alerts = useAlerts();

  const isLoading =
    currentConsumption.isLoading ||
    monthlyData.isLoading ||
    weeklyData.isLoading ||
    alerts.isLoading;

  const isError =
    currentConsumption.isError ||
    monthlyData.isError ||
    weeklyData.isError ||
    alerts.isError;

  return {
    currentConsumption: currentConsumption.data,
    monthlyData: monthlyData.data,
    weeklyData: weeklyData.data,
    alerts: alerts.data,
    isLoading,
    isError,
    isFetching:
      currentConsumption.isFetching ||
      monthlyData.isFetching ||
      weeklyData.isFetching ||
      alerts.isFetching,
  };
};
