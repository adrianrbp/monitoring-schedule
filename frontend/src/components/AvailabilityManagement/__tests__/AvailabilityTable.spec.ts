import { AvailabilityTablePage } from "./AvailabilityTable.page";
import { Engineer, DayAvailability } from "@/api/types";

describe("AvailabilityTable.vue", () => {
  let page: AvailabilityTablePage;
  let providerEngineersMock: Engineer[];
  let providerAvailabilitiesMock: DayAvailability[];

  beforeEach(() => {
    providerEngineersMock = [
      { id: 1, name: "Engineer 1", hours_assigned: 10, color: "#a5b4fc" },
      { id: 2, name: "Engineer 2", hours_assigned: 5, color: "#5eead4" },
      { id: 3, name: "Engineer 3", hours_assigned: 8, color: "#bef264" },
    ];

    providerAvailabilitiesMock = [
      {
        day: "Monday",
        times: [
          {
            time: "09:00",
            engineers: [
              { id: 1, available: true },
              { id: 2, available: false },
              { id: 3, available: true },
            ],
          },
        ],
      },
    ];

    page = new AvailabilityTablePage(
      providerEngineersMock,
      providerAvailabilitiesMock
    );
  });
  it("renders the correct number of engineers", () => {
    expect(page.checkboxes.length).toBe(providerEngineersMock.length);
  });

  it("checks the availability of engineers correctly", () => {
    expect(page.isCheckboxChecked(0)).toBe(true);
    expect(page.isCheckboxChecked(1)).toBe(false);
    expect(page.isCheckboxChecked(2)).toBe(true);
  });

  it("toggles the availability of an engineer when checkbox is changed", async () => {
    // Initially, the first engineer is available
    expect(page.isCheckboxChecked(0)).toBe(true);

    // Toggle availability
    await page.toggleCheckbox(0);
    expect(page.isCheckboxChecked(0)).toBe(false);
    expect(page.availabilities.value[0].times[0].engineers[0].available).toBe(
      false
    );

    // Toggle back
    await page.toggleCheckbox(0);
    expect(page.isCheckboxChecked(0)).toBe(true);
    expect(page.availabilities.value[0].times[0].engineers[0].available).toBe(
      true
    );
  });
});
