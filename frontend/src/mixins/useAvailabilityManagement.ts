import { Ref, ref, watch } from "vue";
import { DayAvailability } from "@/api/types";
import {
  requestAvailabilities,
  storeAvailabilities,
} from "@/api/AvailabilityApi";

export function useAvailabilityManagement(
  selectedService: Ref<number | null>,
  selectedWeek: Ref<string | null>
) {
  const availabilities = ref<DayAvailability[]>([]);

  const statusMessage = ref<string | null>(null);

  const showAvailabilityTable = ref(false);

  const fetchAvailability = async () => {
    if (!selectedService.value || !selectedWeek.value) {
      statusMessage.value = "Service and week must be selected";
      return;
    }
    try {
      const data: DayAvailability[] = await requestAvailabilities(
        selectedService.value,
        selectedWeek.value
      );
      availabilities.value = data;

      statusMessage.value = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      statusMessage.value = error.message;
    }
  };

  watch([selectedService, selectedWeek], () => {
    if (selectedService.value && selectedWeek.value) {
      fetchAvailability();
    }
  });

  const saveAvailability = async () => {
    if (!selectedService.value || !selectedWeek.value) {
      statusMessage.value = "Service and week must be selected";
      return;
    }

    const availabilityPayload = {
      week: selectedWeek.value,
      availability: availabilities.value,
    };

    try {
      statusMessage.value = await storeAvailabilities(
        selectedService.value,
        availabilityPayload
      );
      statusMessage.value = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      statusMessage.value = error.message;
    }
  };

  const toggleAvailabilityView = (): void => {
    showAvailabilityTable.value = !showAvailabilityTable.value;

    if (showAvailabilityTable.value && availabilities.value.length > 0) {
      // fetchAvailability();
    } else if (
      !showAvailabilityTable.value &&
      availabilities.value.length > 0
    ) {
      saveAvailability();
    }
  };

  return {
    showAvailabilityTable,
    toggleAvailabilityView,
    availabilities,
    fetchAvailability,
    saveAvailability,
    statusMessage,
  };
}
