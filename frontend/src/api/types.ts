export interface ApiResponse {
  data: CompanyService[];
}

export interface CompanyService {
  id: number;
  name: string;
}

export interface Week {
  id: string;
  label: string;
  start_date: string;
  end_date: string;
}
export interface Weeks {
  past: Week[];
  future: Week[];
}

export interface WeeksResponse {
  data: {
    past: Week[];
    future: Week[];
  };
  status: number;
  statusText: string;
}

export interface WeekDay {
  start_date: string;
  end_date: string;
}

export type WeeksHash = {
  [key: string]: {
    start_date: string;
    end_date: string;
  };
};
