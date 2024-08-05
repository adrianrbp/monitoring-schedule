import { useShiftManagement } from "@/mixins/useShiftManagement";
import { fetchCompanyServices, requestWeeks } from "@/api/CompanyServiceApi";
import { CompanyService, Weeks, Week } from "@/api/types";

import WeeksServiceA from "@/mock/weeks_service_a.json";
import WeeksServiceB from "@/mock/weeks_service_b.json";

// import { nextTick } from "vue";
jest.mock("@/api/CompanyServiceApi");

const mockServices: CompanyService[] = [
  { id: 1, name: "Service A" },
  { id: 2, name: "Service B" },
];

const mockWeeks: Weeks = {
  past: [
    {
      id: "2024-31",
      label: "Semana 31 del 2024",
      start_date: "29/07/2024",
      end_date: "04/08/2024",
    },
  ],
  future: [
    {
      id: "2024-32",
      label: "Semana 32 del 2024",
      start_date: "05/08/2024",
      end_date: "11/08/2024",
    },
    {
      id: "2024-33",
      label: "Semana 33 del 2024",
      start_date: "12/08/2024",
      end_date: "18/08/2024",
    },
  ],
};

describe("useShiftManagement", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    // (fetchCompanyServices as jest.Mock).mockClear();
    // (requestWeeks as jest.Mock).mockClear();
    jest.clearAllMocks();
  });

  describe("Company Services", () => {
    it("initializes with empty company services and null selectedService", () => {
      const { services, selectedService, errorMessage } = useShiftManagement();
      expect(services.value).toEqual([]);
      expect(selectedService.value).toBe(null);
      expect(errorMessage.value).toBe(null);
    });

    it("fetchServices successfully fetches and loads services", async () => {
      (fetchCompanyServices as jest.Mock).mockResolvedValue(mockServices);

      const { services, fetchServices, errorMessage } = useShiftManagement();
      await fetchServices();

      expect(fetchCompanyServices).toHaveBeenCalled();
      expect(services.value).toEqual(mockServices);
      expect(errorMessage.value).toBeNull();
    });
    it("fetchServices handles errors correctly", async () => {
      const mockError = new Error("Failed to fetch Company Services");
      (fetchCompanyServices as jest.Mock).mockRejectedValue(mockError);

      const { services, fetchServices, errorMessage } = useShiftManagement();
      await fetchServices();

      expect(fetchCompanyServices).toHaveBeenCalled();
      expect(services.value).toEqual([]);
      expect(errorMessage.value).toEqual(mockError.message);
    });
  });

  describe("Fetch Weeks", () => {
    it("fetchWeeks successfully fetches and loads weeks for a given service", async () => {
      (requestWeeks as jest.Mock).mockResolvedValue(mockWeeks);

      const serviceId = 1;
      const { pastWeeks, futureWeeks, fetchWeeks, errorMessage } =
        useShiftManagement();

      await fetchWeeks(serviceId);

      expect(requestWeeks).toHaveBeenCalledWith(serviceId);
      expect(pastWeeks.value).toEqual(mockWeeks.past);
      expect(futureWeeks.value).toEqual(mockWeeks.future);
      expect(errorMessage.value).toBeNull();
    });

    it("fetchWeeks handles errors correctly", async () => {
      const mockError = new Error("Failed to fetch weeks");
      (requestWeeks as jest.Mock).mockRejectedValue(mockError);

      const serviceId = 1;
      const { pastWeeks, futureWeeks, fetchWeeks, errorMessage } =
        useShiftManagement();

      await fetchWeeks(serviceId);

      expect(requestWeeks).toHaveBeenCalledWith(serviceId);
      expect(pastWeeks.value).toBeNull();
      expect(futureWeeks.value).toBeNull();
      expect(errorMessage.value).toEqual(mockError.message);
    });
  });
  describe("Select Service and week", () => {
    it("selectService sets the selectedService and triggers fetchWeeks", async () => {
      (requestWeeks as jest.Mock).mockResolvedValue(mockWeeks);

      const { selectedService, selectService } = useShiftManagement();

      await selectService("1");

      expect(selectedService.value).toEqual(1);
      expect(requestWeeks).toHaveBeenCalledWith(1);
    });

    it("selectWeek sets the selectedWeek", async () => {
      (fetchCompanyServices as jest.Mock).mockResolvedValue(mockServices);

      (requestWeeks as jest.Mock).mockImplementation(
        async (serviceId: number) => {
          if (serviceId === 1) {
            return WeeksServiceA;
          } else {
            return WeeksServiceB;
          }
        }
      );

      const {
        selectedService,
        selectedWeek,
        selectService,
        selectWeek,
        fetchWeeks,
      } = useShiftManagement();

      await selectService("1");

      await selectWeek("2024-32");

      expect(selectedService.value).toEqual(1);

      expect(selectedWeek.value).toEqual("2024-32");
      expect(requestWeeks).toHaveBeenCalledWith(1);
    });

    // Test computed value
    // it("dateRange returns the correct formatted date range when a week is selected", async () => {
    //   (fetchCompanyServices as jest.Mock).mockResolvedValue(mockServices);

    //   (requestWeeks as jest.Mock).mockImplementation(
    //     async (serviceId: number) => {
    //       if (serviceId === 1) {
    //         return WeeksServiceA;
    //       } else {
    //         return WeeksServiceB;
    //       }
    //     }
    //   );

    //   const { selectService, selectWeek, dateRange } = useShiftManagement();

    //   await selectService("1");
    //   await selectWeek("2024-32");
    //   await nextTick();
    //   expect(dateRange.value).toEqual("Del 05/08/2024 al 11/08/2024");
    // });

    it("dateRange returns an empty string when no week is selected", () => {
      const { dateRange } = useShiftManagement();

      expect(dateRange.value).toEqual("");
    });
  });
});
