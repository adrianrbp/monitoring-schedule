import { CompanyServiceSelectorPage } from "./CompanyServiceSelector.page";
import { CompanyService } from "@/api/types";

describe("CompanyServiceSelector.vue", () => {
  let page: CompanyServiceSelectorPage;
  let providerServicesMock: CompanyService[];

  beforeEach(() => {
    // Mock Provided Mixin services
    providerServicesMock = [
      { id: 1, name: "Service A" },
      { id: 2, name: "Service B" },
    ];

    // Initialize the page object
    page = new CompanyServiceSelectorPage(providerServicesMock);
  });

  it("renders the select element with available services", () => {
    const options = page.options;
    expect(options.length).toBe(3);
    expect(options[0].text()).toBe("Servicio");
    expect(options[1].text()).toBe("Service A");
    expect(options[2].text()).toBe("Service B");
  });

  it("selects a service and updates value", async () => {
    await page.selectService("1");
    expect(page.providerSelectServiceMock).toHaveBeenCalledWith("1");
  });

  it("calls fetchServices on mount", async () => {
    expect(page.providerFetchServicesMock).toHaveBeenCalled();
  });
});
