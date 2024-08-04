import { ref } from "vue";

import { CompanyService } from "@/api/types";
import { fetchCompanyServices } from "@/api/CompanyServiceApi";

export function useShiftManagement() {
  const services = ref<CompanyService[]>([]);
  const selectedService = ref<number | null>(null);
  const errorMessage = ref<string | null>(null);

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

  return {
    services,
    selectedService,
    fetchServices,
    errorMessage,
  };
}
