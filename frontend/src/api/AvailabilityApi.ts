import EngineersAvailabilityServiceAWeek1 from "@/mock/eng_availability_a_w1.json";
import { AvailabilityPayload, DayAvailability } from "./types";

const isMock = process.env.VUE_APP_USE_MOCK === "true";

export const requestAvailabilities = async (
  serviceId: number,
  weekId: string
): Promise<DayAvailability[]> => {
  if (isMock) {
    return new Promise<DayAvailability[]>((resolve) => {
      setTimeout(() => {
        if (serviceId === 1) {
          resolve(EngineersAvailabilityServiceAWeek1.data);
        } else {
          resolve(EngineersAvailabilityServiceAWeek1.data);
        }
      }, 500);
    });
  } else {
    try {
      const response = await fetch(
        `/api/company_services/${serviceId}//engineers/availability?week=${weekId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      console.error("Failed to fetch shifts");
      throw new Error("Failed to fetch shifts");
    }
  }
};

export const storeAvailabilities = async (
  serviceId: number,
  availabilityPayload: AvailabilityPayload
): Promise<string> => {
  if (isMock) {
    return "Disponibilidades guardadas con éxito";
  } else {
    try {
      const response = await fetch(
        `/api/company_services/${serviceId}/engineers/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(availabilityPayload),
        }
      );

      if (response.ok) {
        return "Disponibilidades guardadas con éxito";
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData.message}`);
        return "Error al guardar disponibilidades";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      return "Error al guardar disponibilidades";
    }
  }
};
