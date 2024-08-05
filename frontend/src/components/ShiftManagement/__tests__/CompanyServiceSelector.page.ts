import { VueWrapper, mount } from "@vue/test-utils";
import CompanyServiceSelector from "@/components/ShiftManagement/CompanyServiceSelector.vue";
import { nextTick } from "vue";
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
            selectedService: { value: null },
            fetchServices: this.providerFetchServicesMock,
            fetchWeeks: this.providerFetchWeeksMock,
            selectService: this.providerSelectServiceMock,
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
