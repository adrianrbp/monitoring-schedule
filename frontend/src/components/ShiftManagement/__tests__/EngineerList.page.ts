import { VueWrapper, mount } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";
import EngineerList from "@/components/ShiftManagement/EngineerList.vue";

import { Engineer } from "@/api/types";

export class EngineerListPage {
  // https://vuejs.org/api/component-instance.html
  wrapper: VueWrapper<ComponentPublicInstance>;

  constructor(engineers: Engineer[]) {
    this.wrapper = mount(EngineerList, {
      global: {
        provide: {
          shiftManagement: {
            engineers,
            getEngineerColor: jest.fn(),
          },
        },
      },
    });
  }

  get table() {
    return this.wrapper.find("table");
  }

  get rows() {
    return this.wrapper.findAll("tbody tr");
  }

  getRow(index: number) {
    return this.rows[index];
  }

  getCell(row: number, cell: number) {
    return this.getRow(row).findAll("td")[cell];
  }

  getCellText(row: number, cell: number) {
    return this.getCell(row, cell).text();
  }

  getCellStyle(row: number, cell: number) {
    return this.getCell(row, cell).attributes("style");
  }
}
