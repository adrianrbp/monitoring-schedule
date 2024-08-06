import { EngineerListPage } from "./EngineerList.page";
import { Engineer } from "@/api/types";

describe("EngineerList", () => {
  let page: EngineerListPage;
  let providerEngineersMock: Engineer[];

  beforeEach(() => {
    providerEngineersMock = [
      { id: 1, name: "Engineer 1", hours_assigned: 10, color: "#a5b4fc" },
      { id: 2, name: "Engineer 2", hours_assigned: 5, color: "#5eead4" },
      { id: 3, name: "Engineer 3", hours_assigned: 8, color: "#bef264" },
    ];
    page = new EngineerListPage(providerEngineersMock);
  });
  it("renders correctly", () => {
    expect(page.table.exists()).toBe(true);

    expect(page.rows.length).toBe(providerEngineersMock.length);
  });

  it("displays engineers names and hours assigned correctly", () => {
    page.rows.forEach((_, index) => {
      expect(page.getCellText(index, 0)).toBe(
        providerEngineersMock[index].name
      );
      expect(page.getCellText(index, 1)).toBe(
        String(providerEngineersMock[index].hours_assigned)
      );
    });
  });

  // it("applies correct background color to engineer cells", () => {
  //   page.rows.forEach((_, index) => {
  //     expect(page.getCellStyle(index, 0)).toContain(
  //       `background-color: ${providerEngineersMock[index].color}`
  //     );
  //   });
  // });
});
