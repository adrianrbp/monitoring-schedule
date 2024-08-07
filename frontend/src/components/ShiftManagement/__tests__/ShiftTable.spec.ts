import { ShiftTablePage } from "./ShiftTable.page";
import { Shift, Engineer } from "@/api/types"; // Assume Shift is the type of the shifts data

describe("ShiftTable.vue", () => {
  let page: ShiftTablePage;
  const mockEngineers: Engineer[] = [
    { id: 1, name: "Engineer 1", color: "#a5b4fc" },
    { id: 2, name: "Engineer 2", color: "#5eead4" },
    { id: 3, name: "Engineer 3", color: "#bef264" },
  ];
  const mockShifts: Shift[] = [
    {
      day: "Monday",
      dayLabel: "Lunes 05 de Agosto",
      time_blocks: [
        {
          start_time: "09:00",
          end_time: "10:00",
          amount_of_hours: 1,
          engineer: { id: 1, name: "Engineer 1", color: "#a5b4fc" },
        },
        {
          start_time: "10:00",
          end_time: "11:00",
          amount_of_hours: 1,
          engineer: { id: 2, name: "Engineer 2", color: "#5eead4" },
        },
      ],
    },
    {
      day: "Tuesday",
      dayLabel: "Martes 06 de Agosto",
      time_blocks: [
        {
          start_time: "09:00",
          end_time: "10:00",
          amount_of_hours: 1,
          engineer: { id: 3, name: "Engineer 3", color: "#bef264" },
        },
        {
          start_time: "10:00",
          end_time: "11:00",
          amount_of_hours: 1,
          engineer: null,
        },
      ],
    },
  ];

  beforeEach(() => {
    page = new ShiftTablePage(mockShifts, mockEngineers, false);
  });

  it("renders the correct number of days", () => {
    expect(page.dayHeaders.length).toBe(2);
    expect(page.getDayHeaderText(0)).toBe("Lunes 05 de Agosto");
    expect(page.getDayHeaderText(1)).toBe("Martes 06 de Agosto");
  });

  it("should render time blocks correctly", () => {
    expect(page.weekTimeRows.length).toBe(4);
    const timeRows = page.getTimeRows("Lunes 05 de Agosto");
    expect(timeRows.length).toBe(2);
  });

  it("renders the correct time blocks and engineer names", () => {
    expect(page.weekTimeRows.length).toBe(4); // 2 days * 2 time blocks each

    expect(page.getTimeRowText(0)).toBe("09:00 - 10:00");
    expect(page.getEngineerText(0)).toBe("Engineer 1");

    expect(page.getTimeRowText(1)).toBe("10:00 - 11:00");
    expect(page.getEngineerText(1)).toBe("Engineer 2");

    expect(page.getTimeRowText(2)).toBe("09:00 - 10:00");
    expect(page.getEngineerText(2)).toBe("Engineer 3");

    expect(page.getTimeRowText(3)).toBe("10:00 - 11:00");
    expect(page.getEngineerText(3)).toBe("⚠");
  });

  it("applies correct Tailwind classes based on engineer assignment", () => {
    expect(page.getTimeClasses(0)).toContain("bg-green-200"); // Engineer assigned
    expect(page.getTimeClasses(1)).toContain("bg-green-200"); // No engineer assigned
    expect(page.getTimeClasses(2)).toContain("bg-green-200"); // Engineer assigned
    expect(page.getTimeClasses(3)).toContain("bg-red-200"); // No engineer assigned
  });

  // it("applies correct color based on engineer assignment", () => {
  //   expect(page.getEngineerBackgroundStyle(0)).toContain("a5b4fc"); // Engineer assigned
  //   expect(page.getEngineerBackgroundStyle(1)).toContain("5eead4"); // No engineer assigned
  //   expect(page.getEngineerBackgroundStyle(2)).toContain("bef264"); // Engineer assigned
  //   expect(page.getEngineerBackgroundStyle(3)).toContain(""); // No engineer assigned
  // });

  // it("toggles availability table visibility", async () => {
  //   await page.toggleAvailabilityTable();
  //   const availableEngineers = page.getEngineerHeaders();

  //   expect(availableEngineers.length).toBe(
  //     mockEngineers.length * mockShifts.length
  //   );
  //   // check engineer name
  //   // check engineer Background Color
  // });
});
