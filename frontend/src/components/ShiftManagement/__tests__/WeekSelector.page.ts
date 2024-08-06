import { VueWrapper, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import WeekSelector from "@/components/ShiftManagement/WeekSelector.vue";
import { Weeks } from "@/api/types";

jest.mock("@/mixins/useShiftManagement");

export class WeekSelectorPage {
  private wrapper: VueWrapper;
  public providerFetchWeeksMock: jest.Mock;
  public providerSelectWeekMock: jest.Mock;

  constructor(weeks: Weeks) {
    this.providerFetchWeeksMock = jest.fn();
    this.providerSelectWeekMock = jest.fn();

    this.wrapper = mount(WeekSelector, {
      global: {
        provide: {
          shiftManagement: {
            pastWeeks: weeks.past,
            futureWeeks: weeks.future,
            selectWeek: this.providerSelectWeekMock,
            fetchWeeks: this.providerFetchWeeksMock,
          },
        },
      },
    });
  }

  get selectElement() {
    return this.wrapper.find("select");
  }

  get options() {
    return this.wrapper.findAll("option");
  }

  async selectWeek(weekId: string) {
    await this.selectElement.setValue(weekId);
    await nextTick();
  }
}
