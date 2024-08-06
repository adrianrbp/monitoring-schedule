import { VueWrapper, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CompanyServiceSelector from "@/components/ShiftManagement/CompanyServiceSelector.vue";
import { CompanyService } from "@/api/types";

export class CompanyServiceSelectorPage {
  private wrapper: VueWrapper;
  public providerFetchServicesMock: jest.Mock;
  public providerFetchWeeksMock: jest.Mock;
  public providerSelectServiceMock: jest.Mock;

  constructor(services: CompanyService[] = []) {
    this.providerFetchServicesMock = jest.fn();
    this.providerFetchWeeksMock = jest.fn();
    this.providerSelectServiceMock = jest.fn();

    this.wrapper = mount(CompanyServiceSelector, {
      global: {
        provide: {
          shiftManagement: {
            services,
            fetchServices: this.providerFetchServicesMock,
            selectService: this.providerSelectServiceMock,
            selectedService: { value: null },
            fetchWeeks: this.providerFetchWeeksMock,
          },
        },
      },
    });
  }
  // async wait() {
  //   // await this.wrapper.vm.$nextTick();
  //   await nextTick();
  // }

  get selectElement() {
    return this.wrapper.find("select");
  }

  get options() {
    return this.wrapper.findAll("option");
  }

  async selectService(serviceId: number | string) {
    await this.selectElement.setValue(serviceId);
    await nextTick();
  }

  get wrapperElement() {
    return this.wrapper;
  }
}
