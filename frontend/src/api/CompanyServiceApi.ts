import CompanyServices from "@/mock/company_services.json";
import WeeksServiceA from "@/mock/weeks_service_a.json";
import WeeksServiceB from "@/mock/weeks_service_b.json";
import ShiftsServiceAWeek1 from "@/mock/shifts_a_w1.json";
import ShiftsServiceBWeek1 from "@/mock/shifts_b_w1.json";
import EngineersServiceAWeek1 from "@/mock/engineers_a_w1.json";
import EngineersServiceBWeek1 from "@/mock/engineers_b_w1.json";
import { CompanyService, Weeks, Shift, Engineer } from "@/api/types";

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
      // const response = await fetch("/api/company_services");
      const response = await fetch("/api/company_services", {
        headers: {
          Accept: "application/json",
        },
      });
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
      const response = await fetch(`/api/company_services/${serviceId}/weeks`, {
        headers: {
          Accept: "application/json",
        },
      });
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

export const requestShifts = async (
  serviceId: number,
  weekId: string
): Promise<Shift[]> => {
  if (isMock) {
    return new Promise<Shift[]>((resolve) => {
      setTimeout(() => {
        if (serviceId === 1) {
          resolve(ShiftsServiceAWeek1.data);
        } else {
          resolve(ShiftsServiceBWeek1.data);
        }
      }, 500);
    });
  } else {
    try {
      const response = await fetch(
        `/api/company_services/${serviceId}/shifts?week=${weekId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
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

export const requestEngineers = async (
  serviceId: number,
  weekId: string
): Promise<Engineer[]> => {
  if (isMock) {
    return new Promise<Engineer[]>((resolve) => {
      setTimeout(() => {
        if (serviceId === 1) {
          resolve(EngineersServiceAWeek1.data);
        } else {
          resolve(EngineersServiceBWeek1.data);
        }
      }, 500);
    });
  } else {
    try {
      const response = await fetch(
        `/api/company_services/${serviceId}/engineers?week=${weekId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      console.error("Failed to fetch engineers");
      throw new Error("Failed to fetch engineers");
    }
  }
};
