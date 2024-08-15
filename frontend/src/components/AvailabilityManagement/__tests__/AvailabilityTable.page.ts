import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick, Ref, ref } from "vue";
import AvailabilityTable from "../AvailabilityTable.vue";
import { EngineerAvailability, Engineer } from "@/api/types";

export class AvailabilityTablePage {
  private wrapper: VueWrapper;
  public shiftManagementEngineers: Ref<Engineer[]>;
  public availabilities: Ref<EngineerAvailability[]>;

  constructor(engineers: Engineer[], availabilities: EngineerAvailability[]) {
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
