import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick, ref, Ref } from "vue";
import ShiftTable from "@/components/ShiftManagement/ShiftTable.vue";
import { Shift, Engineer } from "@/api/types"; // Assume Shift is the type of the shifts data

export class ShiftTablePage {
  private wrapper: VueWrapper;
  public shifts: Ref<Shift[]>;
  public engineers: Ref<Engineer[]>;
  public showAvailabilityTable: Ref<boolean>;

  constructor(
    shifts: Shift[],
    engineers: Engineer[],
    showAvailabilityTable: boolean
  ) {
    this.shifts = ref(shifts);
    this.engineers = ref(engineers);
    this.showAvailabilityTable = ref(showAvailabilityTable);

    this.wrapper = mount(ShiftTable, {
      global: {
        provide: {
          shiftManagement: {
            shifts,
            engineers: this.engineers,
            getEngineerColor: jest.fn(),
            // getEngineerColor: (engineer: Engineer) => engineer.color,
          },
          availabilityManagement: {
            showAvailabilityTable: this.showAvailabilityTable,
          },
        },
      },
    });
  }

  get dayHeaders() {
    return this.wrapper.findAll('[aria-label^="Header"]');
  }

  getEngineerHeaders() {
    return this.wrapper.findAll('[aria-label^="Header Engineer"]');
  }
  getDayHeaderText(index: number): string {
    return this.dayHeaders[index].text();
  }

  get weekTimeRows() {
    return this.wrapper.findAll('tbody [aria-label^="Time block"]');
  }
  getTimeRows(dayLabel: string) {
    return this.wrapper.findAll(`tbody [aria-label^="Time block ${dayLabel}"]`);
  }

  getTimeRowText(index: number): string {
    return this.weekTimeRows[index].find('[aria-label^="Hour"]').text();
  }
  getTimeClasses(index: number): string[] {
    return this.weekTimeRows[index].find('[aria-label^="Hour"]').classes();
  }

  getEngineerText(index: number): string {
    return this.weekTimeRows[index]
      .find('[aria-label^="Assigned Engineer"]')
      .text();
  }

  getEngineerBackgroundStyle(index: number): string {
    const engineerColor = this.weekTimeRows[index]
      .find('[aria-label^="Assigned Engineer"]')
      .attributes("style");
    return engineerColor ?? "";
  }

  async toggleAvailabilityTable() {
    this.showAvailabilityTable.value = !this.showAvailabilityTable.value;
    await nextTick();
  }
}
