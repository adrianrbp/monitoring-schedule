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

export interface ShiftsResponse {
  data: Shift[];
  status: number;
  statusText: string;
}

export interface Shift {
  day: string;
  dayLabel: string;
  time_blocks: Timeblock[];
}

export interface Timeblock {
  start_time: string;
  end_time: string;
  amount_of_hours: number;
  engineer: Engineer | null;
}

export interface Engineer {
  id: number;
  name: string;
  color: string;
  hours_assigned?: number;
}

export interface EngineersResponse {
  data: Engineer[];
  status: number;
  statusText: string;
}

export interface EngineerAvailability {
  id: number;
  available: boolean;
}

export interface TimeBlockAv {
  time: string;
  engineers: EngineerAvailability[];
}

export interface DayAvailability {
  day: string;
  dayLabel?: string;
  times: TimeBlockAv[];
}

export interface AvailabilityResponse {
  availability: DayAvailability[];
  status: number;
  statusText: string;
}

export interface AvailabilityPayload {
  week: string;
  availability: DayAvailability[];
}
