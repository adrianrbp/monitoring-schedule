import CompanyServices from "@/mock/company_services.json";
import { CompanyService } from "@/api/types";

const isMock = process.env.VUE_APP_USE_MOCK === "true";

export const fetchCompanyServices = async (): Promise<CompanyService[]> => {
  if (isMock) {
    return new Promise<CompanyService[]>((resolve) => {
      setTimeout(() => {
        resolve(CompanyServices.data);
      }, 500);
    });
  } else {
    try {
      const response = await fetch("/api/company_services");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      console.error("Failed to connect to the backend");
      throw new Error("Failed to connect to the backend");
    }
  }
};
