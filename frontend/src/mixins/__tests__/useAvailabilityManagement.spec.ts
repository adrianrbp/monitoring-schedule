import { ref, type Ref } from "vue";
import { useAvailabilityManagement } from "@/mixins/useAvailabilityManagement";
import {
  requestAvailabilities,
  storeAvailabilities,
} from "@/api/AvailabilityApi";
import { EngineerAvailability } from "@/api/types";

jest.mock("@/api/AvailabilityApi");

describe("useAvailabilityManagement", () => {
  let selectedService: Ref<number | null>;
  let selectedWeek: Ref<string | null>;
  let mixin: ReturnType<typeof useAvailabilityManagement>;

  beforeEach(() => {
    selectedService = ref(null);
    selectedWeek = ref(null);
    mixin = useAvailabilityManagement(selectedService, selectedWeek);
    jest.clearAllMocks();
  });

  it("initializes correctly", () => {
    expect(mixin.showAvailabilityTable.value).toBe(false);
    expect(mixin.availabilities.value).toEqual([]);
    expect(mixin.statusMessage.value).toBe(null);
  });

  it("should set statusMessage if service and week are not selected", async () => {
    await mixin.fetchAvailability();
    expect(mixin.statusMessage.value).toBe("Service and week must be selected");
  });

  it("fetches availabilities when service and week are selected", async () => {
    const mockData: EngineerAvailability[] = [
      {
        engineer: 1,
        availability: [{ day: "Monday", availableTimes: [9] }],
      },
    ];
    (requestAvailabilities as jest.Mock).mockResolvedValue(mockData);

    selectedService.value = 1;
    selectedWeek.value = "2024-W32";

    await mixin.fetchAvailability();
    expect(mixin.availabilities.value).toEqual(mockData);
    expect(mixin.statusMessage.value).toBe(null);
  });

  it("sets error message on fetch failure", async () => {
    const mockError = new Error("Failed to fetch availabilities");
    (requestAvailabilities as jest.Mock).mockRejectedValue(mockError);

    selectedService.value = 1;
    selectedWeek.value = "Monday";

    await mixin.fetchAvailability();
    expect(mixin.statusMessage.value).toBe(mockError.message);
  });

  it("saves availabilities successfully", async () => {
    (storeAvailabilities as jest.Mock).mockResolvedValue(null);

    selectedService.value = 1;
    selectedWeek.value = "2024-W32";

    const mockData: EngineerAvailability[] = [
      {
        engineer: 1,
        availability: [{ day: "Monday", availableTimes: [9] }],
      },
    ];
    mixin.availabilities.value = mockData;

    await mixin.saveAvailability();
    expect(storeAvailabilities).toHaveBeenCalledWith(1, {
      week: "2024-W32",
      availability: mockData,
    });
    expect(mixin.statusMessage.value).toBe("Failed to fetch availabilities");
  });

  it("sets error message on save failure", async () => {
    const mockError = new Error("Failed to fetch availabilities");
    (storeAvailabilities as jest.Mock).mockRejectedValue(mockError);

    selectedService.value = 1;
    selectedWeek.value = "2024-W32";

    const mockData: EngineerAvailability[] = [
      {
        engineer: 1,
        availability: [{ day: "Monday", availableTimes: [9] }],
      },
    ];
    mixin.availabilities.value = mockData;

    await mixin.saveAvailability();
    expect(mixin.statusMessage.value).toBe(mockError.message);
  });

  it("toggles availability view correctly", () => {
    expect(mixin.showAvailabilityTable.value).toBe(false);
    mixin.toggleAvailabilityView();
    expect(mixin.showAvailabilityTable.value).toBe(true);
    mixin.toggleAvailabilityView();
    expect(mixin.showAvailabilityTable.value).toBe(false);
  });

  it("fetches and saves availability on toggle", async () => {
    const mockData: EngineerAvailability[] = [
      {
        engineer: 1,
        availability: [{ day: "Monday", availableTimes: [9] }],
      },
    ];
    (requestAvailabilities as jest.Mock).mockResolvedValue(mockData);
    (storeAvailabilities as jest.Mock).mockResolvedValue(null);

    selectedService.value = 1;
    selectedWeek.value = "2024-W32";

    await mixin.fetchAvailability();
    expect(mixin.availabilities.value).toEqual(mockData);

    mixin.toggleAvailabilityView();
    expect(mixin.showAvailabilityTable.value).toBe(true);

    mixin.availabilities.value = mockData;
    mixin.toggleAvailabilityView();
    expect(storeAvailabilities).toHaveBeenCalledWith(1, {
      week: "2024-W32",
      availability: mockData,
    });
  });
});
