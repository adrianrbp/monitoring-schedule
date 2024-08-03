import { CompanyService } from "./types";

export async function fetchCompanyServices(): Promise<CompanyService[]> {
  const response = await import("@/mock/company_services.json");
  return response.default.data;
}
