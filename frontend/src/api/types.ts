export interface ApiResponse {
  data: CompanyService[];
}

export interface CompanyService {
  id: number;
  name: string;
  contract_start_date: string;
  contract_end_date: string;
}
