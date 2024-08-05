import { ref, computed } from "vue";

import { CompanyService, Weeks, Week, WeeksHash, WeekDay } from "@/api/types";
import { fetchCompanyServices, requestWeeks } from "@/api/CompanyServiceApi";

export function useShiftManagement() {
  const services = ref<CompanyService[]>([]);
  const selectedService = ref<number | null>(null);
  const errorMessage = ref<string | null>(null);

  const pastWeeks = ref<Week[] | null>(null);
  const futureWeeks = ref<Week[] | null>(null);
  const selectedWeek = ref<string | null>(null);
  const allWeeks = ref<WeeksHash | null>(null);
  const selectedWeekData = ref<WeekDay | null>(null);

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
      allWeeks.value = createWeekHash(data);
      pastWeeks.value = data.past;
      futureWeeks.value = data.future;
      errorMessage.value = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      errorMessage.value = error.message;
    }
  };
  const selectService = (serviceId: string) => {
    selectedService.value = Number(serviceId);
    fetchWeeks(Number(serviceId));
  };

  const selectWeek = (weekId: string) => {
    selectedWeek.value = weekId;
    if (allWeeks.value) {
      selectedWeekData.value = allWeeks.value[weekId];
    }
  };

  const dateRange = computed(() => {
    if (!selectedWeek.value) return "";
    if (!allWeeks.value) return "";
    const { start_date, end_date } = allWeeks.value[selectedWeek.value];
    return `Del ${start_date} al ${end_date}`;
  });

  const createWeekHash = (weeks: Weeks): WeeksHash => {
    const hash: WeeksHash = {};

    const addToHash = (weekData: Week[]) => {
      weekData.forEach(({ id, start_date, end_date }) => {
        hash[id] = { start_date, end_date };
      });
    };

    addToHash(weeks.past);
    addToHash(weeks.future);

    return hash;
  };

  return {
    services,
    selectedService,
    fetchServices,
    errorMessage,
    pastWeeks,
    futureWeeks,
    selectedWeek,
    fetchWeeks,
    selectService,
    selectWeek,
    dateRange,
  };
}
