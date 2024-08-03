import { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";

export class CompanyServiceDropdownPage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private wrapper: VueWrapper<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(wrapper: VueWrapper<any>) {
    this.wrapper = wrapper;
  }

  async wait() {
    // await this.wrapper.vm.$nextTick();
    await nextTick();
  }

  get serviceDropdown() {
    return this.wrapper.find("select#companyService");
  }

  get serviceOptions() {
    return this.serviceDropdown.findAll("option");
  }
}
