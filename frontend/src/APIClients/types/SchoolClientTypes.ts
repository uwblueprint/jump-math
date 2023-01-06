import { UserResponse } from "./UserClientTypes";

export interface SchoolRequest {
  /** the name of the school */
  name: string;
  /** the country the school is located in */
  country: string;
  /** the sub-region the school is located in */
  subRegion: string;
  /** the city the school is located in */
  city: string;
  /** the address of the school */
  address: string;
  /** the teachers that teach at the school (reference to the IDs in the User table) */
  teachers: string[];
}

export interface SchoolResponse {
  /** the unique identifier for the school */
  id: string;
  /** the name of the school */
  name: string;
  /** the country the school is located in */
  country: string;
  /** the sub-region the school is located in */
  subRegion: string;
  /** the city the school is located in */
  city: string;
  /** the address of the school */
  address: string;
  /** the teachers that teach at the school */
  teachers: UserResponse[];
}
