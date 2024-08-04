import { ref } from "vue";
import { useShiftManagement } from "@/mixins/useShiftManagement";
import { fetchCompanyServices } from "@/api/CompanyServiceApi";
import { CompanyService } from "@/api/types";

jest.mock("@/api/CompanyServiceApi");

describe("useShiftManagement", () => {
  let services: { value: CompanyService[] };
  let selectedService: { value: number | null };
  let errorMessage: { value: string | null };

  beforeEach(() => {
    services = ref<CompanyService[]>([]);
    selectedService = ref<number | null>(null);
    errorMessage = ref<string | null>(null);

    // Reset the mock implementation before each test
    (fetchCompanyServices as jest.Mock).mockClear();
  });

  it("initializes with empty company services and null selectedService", () => {
    const { services, selectedService, errorMessage } = useShiftManagement();
    expect(services.value).toEqual([]);
    expect(selectedService.value).toBe(null);
    expect(errorMessage.value).toBe(null);
  });

  it("fetches services and updates the state", async () => {
    (fetchCompanyServices as jest.Mock).mockResolvedValue([
      { id: 1, name: "Service A" },
      { id: 2, name: "Service B" },
    ]);

    const { services, fetchServices } = useShiftManagement();
    await fetchServices();

    expect(services.value).toEqual([
      { id: 1, name: "Service A" },
      { id: 2, name: "Service B" },
    ]);
  });

  it("handles error when fetching services", async () => {
    const errorMessageText = "Failed to connect to the backend";
    (fetchCompanyServices as jest.Mock).mockRejectedValue(
      new Error(errorMessageText)
    );

    const { services, fetchServices, errorMessage } = useShiftManagement();
    await fetchServices();

    expect(services.value).toEqual([]);
    expect(errorMessage.value).toBe(errorMessageText);
  });
});
