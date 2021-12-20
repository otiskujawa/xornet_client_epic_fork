import { uuid } from "../../types/api/index";

export const enum IMachineStatus {
  Unknown,
  Offline,
  Online,
}

export interface IMachine {
  uuid: uuid;
  owner_uuid: uuid;
  hardware_uuid: uuid;
  static_data: IMachineStaticData;
  dynamic_data: IMachineDynamicData;
  access_token: string;
  name: string;
  status: IMachineStatus;
  access: string[];
  created_at: number;
  updated_at: number;
}

export interface IMachineStaticData {
  total_mem: number;
  cpu_cores: number;
  cpu_threads: number;
  cpu_model: string;
  hostname: string;
  public_ip: string;
  os_version: string;
}

export interface IMachineDynamicData {
  cpu: ICPU;
  ram: IRAM;
  gpu?: IGPU;
  disks: IDisk[];
  processes: string;
  temps?: ITemp[];
}

export interface ICPU {
  usage: number[];
  freq: number[];
}

export interface IRAM {
  total: number;
  used: number;
}

export interface IGPU {
  brand: string;
  gpu_usage: number;
  mem_total: number;
  mem_used: number;
  power_usage: number;
}

export interface IDisk {
  fs: string;
  mount: string;
  total: number;
  type: string;
  used: number;
}

export interface ITemp {
  label: string;
  value: number;
}
