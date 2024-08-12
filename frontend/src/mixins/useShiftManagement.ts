import { ref, computed } from "vue";

import {
  CompanyService,
  Weeks,
  Week,
  WeeksHash,
  WeekDay,
  Shift,
  Engineer,
} from "@/api/types";
import {
  fetchCompanyServices,
  requestWeeks,
  requestShifts,
  requestEngineers,
} from "@/api/CompanyServiceApi";

export function useShiftManagement() {
  const services = ref<CompanyService[]>([]);
  const selectedService = ref<number | null>(null);
  const errorMessage = ref<string | null>(null);

  const pastWeeks = ref<Week[] | null>(null);
  const futureWeeks = ref<Week[] | null>(null);
  const selectedWeek = ref<string | null>(null);
  const allWeeks = ref<WeeksHash | null>(null);
  const selectedWeekData = ref<WeekDay | null>(null);

  const shifts = ref<Shift[]>([]);
  const engineers = ref<Engineer[]>([]);

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

  const fetchShifts = async () => {
    if (selectedService.value && selectedWeek.value) {
      try {
        const data: Shift[] = await requestShifts(
          selectedService.value,
          selectedWeek.value
        );
        shifts.value = data;
        errorMessage.value = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorMessage.value = error.message;
      }
    }
  };

  const fetchEngineers = async () => {
    if (selectedService.value && selectedWeek.value) {
      try {
        const data: Engineer[] = await requestEngineers(
          selectedService.value,
          selectedWeek.value
        );
        engineers.value = data;
        errorMessage.value = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorMessage.value = error.message;
      }
    }
  };

  const selectService = async (serviceId: string) => {
    selectedWeek.value = null;
    selectedService.value = Number(serviceId);
    await fetchWeeks(Number(serviceId));
  };

  const selectWeek = async (weekId: string) => {
    selectedWeek.value = weekId;
    if (allWeeks.value) {
      selectedWeekData.value = allWeeks.value[weekId];
    }
    await Promise.all([fetchEngineers(), fetchShifts()]);
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

  const getEngineerColor = (engineer: Engineer | null) => {
    return engineer ? engineer.color : "";
  };

  // Utility function to generate time blocks
  function generateTimeBlocks(start: string, end: string) {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const blocks = [];

    while (startTime < endTime) {
      const nextHour = new Date(startTime.getTime() + 60 * 60 * 1000);
      blocks.push({
        start_time: startTime.toTimeString().substring(0, 5),
        end_time: nextHour.toTimeString().substring(0, 5),
      });
      startTime.setHours(startTime.getHours() + 1);
    }

    return blocks;
  }

  const allShiftsTimeBlocks = computed(() => {
    // const allShiftsTimeBlocks = () => {
    if (!shifts.value || !Array.isArray(shifts.value)) {
      return [];
    }
    return shifts.value.map((shift) => ({
      ...shift,
      time_blocks: shift.time_blocks.flatMap((timeBlock) =>
        generateTimeBlocks(timeBlock.start_time, timeBlock.end_time).map(
          (block) => ({
            ...block,
            engineer: timeBlock.engineer,
          })
        )
      ),
    }));
  });

  return {
    services,
    selectedService,
    fetchServices,
    errorMessage,
    pastWeeks,
    futureWeeks,
    selectedWeek,
    selectService,
    selectWeek,
    dateRange,
    shifts,
    allShiftsTimeBlocks,
    engineers,
    getEngineerColor,
  };
}
