import { useShiftManagement } from "@/mixins/useShiftManagement";
import { fetchCompanyServices, requestWeeks } from "@/api/CompanyServiceApi";
import { CompanyService, Weeks } from "@/api/types";

jest.mock("@/api/CompanyServiceApi");

const mockServices: CompanyService[] = [
  { id: 1, name: "Service A" },
  { id: 2, name: "Service B" },
];

const mockWeeks: Weeks = {
  past: [
    {
      week: "2024-W31",
      start_date: "2024-07-29",
      end_date: "2024-08-04",
    },
  ],
  future: [
    {
      week: "2024-W32",
      start_date: "2024-08-05",
      end_date: "2024-08-11",
    },
    {
      week: "2024-W33",
      start_date: "2024-08-12",
      end_date: "2024-08-18",
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

  it("fetchWeeks successfully fetches and loads weeks for a given service", async () => {
    (requestWeeks as jest.Mock).mockResolvedValue(mockWeeks);

    const serviceId = 1;
    const { weeks, fetchWeeks, errorMessage } = useShiftManagement();

    await fetchWeeks(serviceId);

    expect(requestWeeks).toHaveBeenCalledWith(serviceId);
    expect(weeks.value).toEqual(mockWeeks);
    expect(errorMessage.value).toBeNull();
  });

  it("fetchWeeks handles errors correctly", async () => {
    const mockError = new Error("Failed to fetch weeks");
    (requestWeeks as jest.Mock).mockRejectedValue(mockError);

    const { weeks, fetchWeeks, errorMessage } = useShiftManagement();

    await fetchWeeks(1);

    expect(requestWeeks).toHaveBeenCalledWith(1);
    expect(weeks.value).toBeNull();
    expect(errorMessage.value).toEqual(mockError.message);
  });
});
