import { uuid } from "../../types/api/index";

export interface IUser {
  uuid: uuid;
  username: string;
  email: string;
  avatar?: string;
  biography?: string;
}
