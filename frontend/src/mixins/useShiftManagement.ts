import { ref, computed } from "vue";

import { CompanyService, Weeks, Week } from "@/api/types";
import { fetchCompanyServices, requestWeeks } from "@/api/CompanyServiceApi";

export function useShiftManagement() {
  const services = ref<CompanyService[]>([]);
  const selectedService = ref<number | null>(null);
  const errorMessage = ref<string | null>(null);

  const weeks = ref<Weeks | null>(null);
  const selectedWeek = ref<Week | null>(null);

  const fetchServices = async () => {
    try {
      const data: CompanyService[] = await fetchCompanyServices();
      services.value = data;
      errorMessage.value = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      errorMessage.value = error.message;
    }
  };

  const fetchWeeks = async (serviceId: number) => {
    try {
      const data: Weeks = await requestWeeks(serviceId);
      weeks.value = data;
      errorMessage.value = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      errorMessage.value = error.message;
    }
  };
  const selectService = (serviceId: number) => {
    selectedService.value = serviceId;
    fetchWeeks(serviceId);
  };

  const selectWeek = (week: Week) => {
    selectedWeek.value = week;
  };

  const dateRange = computed(() => {
    if (selectedWeek.value) {
      return `Del ${selectedWeek.value.start_date} al ${selectedWeek.value.end_date}`;
    }
    return "";
  });

  return {
    services,
    selectedService,
    fetchServices,
    errorMessage,
    weeks,
    selectedWeek,
    fetchWeeks,
    selectService,
    selectWeek,
    dateRange,
  };
}
