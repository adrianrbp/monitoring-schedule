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
    console.log("saved");
    if (!selectedService.value || !selectedWeek.value) {
      console.log("not defined values");

      statusMessage.value = "Service and week must be selected";
      return;
    }
    console.log("defined values");

    const availabilityPayload = {
      week: selectedWeek.value,
      availability: availabilities.value,
    };

    console.log(availabilityPayload);

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
      console.log("fetched from toggle");
    } else if (
      !showAvailabilityTable.value &&
      availabilities.value.length > 0
    ) {
      console.log("saved from toggle");
      console.log(availabilities.value);
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
