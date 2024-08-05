import CompanyServices from "@/mock/company_services.json";
import WeeksServiceA from "@/mock/weeks_service_a.json";
import WeeksServiceB from "@/mock/weeks_service_b.json";
import { CompanyService, Weeks } from "@/api/types";

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
      console.error("Failed to fetch Company Services");
      throw new Error("Failed to fetch Company Services");
    }
  }
};

export const requestWeeks = async (serviceId: number): Promise<Weeks> => {
  if (isMock) {
    return new Promise<Weeks>((resolve) => {
      setTimeout(() => {
        if (serviceId === 1) {
          resolve(WeeksServiceA.data);
        } else {
          resolve(WeeksServiceB.data);
        }
      }, 500);
    });
  } else {
    try {
      const response = await fetch(`/api/company_services/${serviceId}/weeks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      console.error("Failed to fetch weeks");
      throw new Error("Failed to fetch weeks");
    }
  }
};
