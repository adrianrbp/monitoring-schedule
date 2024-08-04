import { CompanyServiceSelectorPage } from "./CompanyServiceSelector.page";
import { CompanyService } from "@/api/types";

describe("CompanyServiceSelector.vue", () => {
  let page: CompanyServiceSelectorPage;
  let providerServicesMock: CompanyService[];
  let providerSelectedServiceMock: { value: number | null };

  beforeEach(() => {
    // Mock Provided Mixin services
    providerServicesMock = [
      { id: 1, name: "Service A" },
      { id: 2, name: "Service B" },
    ];

    // Mock Provided Mixin selectedService
    providerSelectedServiceMock = { value: null };

    // Initialize the page object
    page = new CompanyServiceSelectorPage(
      providerServicesMock,
      providerSelectedServiceMock
    );
  });

  it("renders the select element with available services", () => {
    const options = page.options;
    expect(options.length).toBe(3);
    expect(options[0].text()).toBe("Select a service");
    expect(options[1].text()).toBe("Service A");
    expect(options[2].text()).toBe("Service B");
  });

  it("selects a service and updates value", async () => {
    await page.selectService(1);
    expect(providerSelectedServiceMock.value).toBe(1);
  });

  it("calls fetchServices on mount", async () => {
    const fetchServicesMock = page.providerFetchServicesMock;
    // fetchServicesMock.mockImplementation(jest.fn());
    expect(fetchServicesMock).toHaveBeenCalled();
  });
});
