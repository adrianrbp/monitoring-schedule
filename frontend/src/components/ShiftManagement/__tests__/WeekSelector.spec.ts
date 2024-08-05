import { WeekSelectorPage } from "./WeekSelector.page";
import { Weeks } from "@/api/types";

describe("WeekSelector.vue", () => {
  let page: WeekSelectorPage;
  let providerWeeksMock: Weeks;

  beforeEach(() => {
    providerWeeksMock = {
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
      past: [
        {
          id: "2024-30",
          label: "Semana 30 del 2024",
          start_date: "22/07/2024",
          end_date: "28/07/2024",
        },
        {
          id: "2024-31",
          label: "Semana 31 del 2024",
          start_date: "29/07/2024",
          end_date: "04/08/2024",
        },
      ],
    };

    page = new WeekSelectorPage(providerWeeksMock);
  });

  it("renders the select element with available weeks", () => {
    const options = page.options;
    expect(options.length).toBe(5); // Includes the default option
    expect(options[0].text()).toBe("Semana");
    expect(options[1].text()).toBe("Semana 32 del 2024");
    expect(options[2].text()).toBe("Semana 33 del 2024");
    expect(options[3].text()).toBe("Semana 30 del 2024");
    expect(options[4].text()).toBe("Semana 31 del 2024");
    expect(options[3].classes()).toContain("bg-gray-400");
    expect(options[4].classes()).toContain("bg-gray-400");
  });

  it("selects a week and updates the selected week value", async () => {
    await page.selectWeek("2024-32");
    expect(page.providerSelectWeekMock).toHaveBeenCalledWith("2024-32");
  });
});
