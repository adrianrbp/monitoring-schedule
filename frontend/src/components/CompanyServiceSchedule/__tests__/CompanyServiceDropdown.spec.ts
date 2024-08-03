import { mount } from "@vue/test-utils";
import { CompanyServiceDropdownPage } from "./CompanyServiceDropdown.page";
import CompanyServiceDropdown from "@/components/CompanyServiceSchedule/CompanyServiceDropdown.vue";
import * as api from "@/api/CompanyServiceApi";

jest.mock("@/api/CompanyServiceApi"); // Mock the API module

describe("CompanyServiceDropdown.vue", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any;
  let page: CompanyServiceDropdownPage;

  const mockFetchCompanyServices = jest.fn();

  beforeEach(async () => {
    // Mocking the return values for the company services
    mockFetchCompanyServices.mockResolvedValue([
      { id: 1, name: "Service A" },
      { id: 2, name: "Service B" },
    ]);

    // Mocking the API functions
    (api.fetchCompanyServices as jest.Mock).mockImplementation(
      mockFetchCompanyServices
    );

    wrapper = mount(CompanyServiceDropdown);
    page = new CompanyServiceDropdownPage(wrapper);
    page.wait();
  });

  it("renders the service dropdown and options", () => {
    expect(page.serviceDropdown.exists()).toBe(true);
    expect(page.serviceOptions.length).toBe(3); // Two services
    expect(page.serviceOptions[0].text()).toBe("-- Select Service --");
    expect(page.serviceOptions[1].text()).toBe("Service A");
  });
});
