import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick, Ref, ref } from "vue";
import AvailabilityTable from "../AvailabilityTable.vue";
import { DayAvailability, Engineer } from "@/api/types";

export class AvailabilityTablePage {
  private wrapper: VueWrapper;
  public shiftManagementEngineers: Ref<Engineer[]>;
  public availabilities: Ref<DayAvailability[]>;

  constructor(engineers: Engineer[], availabilities: DayAvailability[]) {
    this.shiftManagementEngineers = ref(engineers);
    this.availabilities = ref(availabilities);

    this.wrapper = mount(AvailabilityTable, {
      props: {
        day: "Monday",
        timeBlock: "09:00",
        engineers,
      },
      global: {
        provide: {
          shiftManagement: {
            engineers: this.shiftManagementEngineers,
          },
          availabilityManagement: {
            availabilities: this.availabilities,
          },
        },
      },
    });
  }

  get checkboxes() {
    return this.wrapper.findAll("input[type='checkbox']");
  }

  isCheckboxChecked(index: number): boolean {
    const element = this.checkboxes[index].element as HTMLInputElement;
    return element.checked;
  }

  async toggleCheckbox(index: number): Promise<void> {
    await this.checkboxes[index].trigger("change");
    await nextTick();
  }
}
