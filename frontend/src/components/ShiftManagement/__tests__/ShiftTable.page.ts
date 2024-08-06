import { mount, VueWrapper } from "@vue/test-utils";
import ShiftTable from "@/components/ShiftManagement/ShiftTable.vue";
import { Shift } from "@/api/types"; // Assume Shift is the type of the shifts data

export class ShiftTablePage {
  private wrapper: VueWrapper;

  constructor(shifts: Shift[]) {
    this.wrapper = mount(ShiftTable, {
      global: {
        provide: {
          shiftManagement: {
            shifts,
            getEngineerColor: jest.fn(),
          },
        },
      },
    });
  }

  get dayHeaders() {
    return this.wrapper.findAll('th[colspan="2"]');
  }

  get timeRows() {
    return this.wrapper.findAll("tbody tr");
  }

  getDayHeaderText(index: number): string {
    return this.dayHeaders[index].text();
  }

  getTimeRowText(index: number): string {
    return this.timeRows[index].find("td").text();
  }

  getEngineerText(index: number): string {
    return this.timeRows[index].find("td:nth-child(2)").text();
  }

  getTimeClasses(index: number): string[] {
    return this.timeRows[index].find("td:nth-child(1)").classes();
  }
}
