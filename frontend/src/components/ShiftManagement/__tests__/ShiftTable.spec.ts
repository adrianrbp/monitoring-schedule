import { ShiftTablePage } from "./ShiftTable.page";
import { Shift } from "@/api/types"; // Assume Shift is the type of the shifts data

describe("ShiftTable.vue", () => {
  let page: ShiftTablePage;
  const shiftsMock: Shift[] = [
    {
      day: "Monday",
      time_blocks: [
        {
          start_time: "09:00",
          end_time: "10:00",
          amount_of_hours: 1,
          engineer: { id: 1, name: "Engineer 1", color: "bg-red-400" },
        },
        {
          start_time: "10:00",
          end_time: "11:00",
          amount_of_hours: 1,
          engineer: null,
        },
      ],
    },
    {
      day: "Tuesday",
      time_blocks: [
        {
          start_time: "09:00",
          end_time: "10:00",
          amount_of_hours: 1,
          engineer: { id: 2, name: "Engineer 2", color: "bg-green-400" },
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
    page = new ShiftTablePage(shiftsMock);
  });

  it("renders the correct number of days", () => {
    expect(page.dayHeaders.length).toBe(shiftsMock.length);
    expect(page.getDayHeaderText(0)).toBe("Monday");
    expect(page.getDayHeaderText(1)).toBe("Tuesday");
  });

  it("renders the correct time blocks and engineer names", () => {
    expect(page.timeRows.length).toBe(4); // 2 days * 2 time blocks each

    expect(page.getTimeRowText(0)).toBe("09:00 - 10:00");
    expect(page.getEngineerText(0)).toBe("Engineer 1");

    expect(page.getTimeRowText(1)).toBe("10:00 - 11:00");
    expect(page.getEngineerText(1)).toBe("⚠");

    expect(page.getTimeRowText(2)).toBe("09:00 - 10:00");
    expect(page.getEngineerText(2)).toBe("Engineer 2");

    expect(page.getTimeRowText(3)).toBe("10:00 - 11:00");
    expect(page.getEngineerText(3)).toBe("⚠");
  });

  it("applies correct Tailwind classes based on engineer assignment", () => {
    expect(page.getTimeClasses(0)).toContain("bg-green-200"); // Engineer assigned
    expect(page.getTimeClasses(1)).toContain("bg-red-200"); // No engineer assigned
    expect(page.getTimeClasses(2)).toContain("bg-green-200"); // Engineer assigned
    expect(page.getTimeClasses(3)).toContain("bg-red-200"); // No engineer assigned
  });
});
