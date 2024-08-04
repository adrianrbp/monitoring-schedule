import { VueWrapper, mount } from "@vue/test-utils";
import CompanyServiceSelector from "@/components/ShiftManagement/CompanyServiceSelector.vue";
// import { nextTick } from "vue";
import { CompanyService } from "@/api/types";

export class CompanyServiceSelectorPage {
  private wrapper: VueWrapper;
  //make fetchServices method from provided mixin public
  public providerFetchServicesMock: jest.Mock;

  constructor(
    services: CompanyService[] = [],
    selectedService = { value: null as number | null }
  ) {
    const providerFetchServicesMock = jest.fn();
    this.wrapper = mount(CompanyServiceSelector, {
      global: {
        provide: {
          shiftManagement: {
            services,
            selectedService,
            fetchServices: providerFetchServicesMock,
          },
        },
      },
    });
    this.providerFetchServicesMock = providerFetchServicesMock;
  }

  get selectElement() {
    return this.wrapper.find("select");
  }

  get options() {
    return this.wrapper.findAll("option");
  }

  async selectService(serviceId: number | string) {
    await this.selectElement.setValue(serviceId);
  }

  get wrapperElement() {
    return this.wrapper;
  }
}
