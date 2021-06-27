export interface Social {
  name: string;
  url: string;
}

export interface ProfileImage {
  url: string;
  hasAlpha: boolean;
}

export interface Geolocation {
  location: string;
  countryCode: string;
}

export interface Badges {
  selected: number;
  owned: string[];
}

export interface Ping {
  jitter: number;
  latency: number;
}

export interface Download {
  bandwidth: number;
  bytes: number;
  elapsed: number;
}

export interface Upload {
  bandwidth: number;
  bytes: number;
  elapsed: number;
}

export interface Interface {
  internalIp: string;
  name: string;
  macAddr: string;
  isVpn: boolean;
  externalIp: string;
}

export interface Server {
  id: number;
  name: string;
  location: string;
  country: string;
  host: string;
  port: number;
  ip: string;
}

export interface Result {
  id: string;
  url: string;
}

export interface Speedtest {
  timestamp: Date;
  ping: Ping;
  download: Download;
  upload: Upload;
  isp: string;
  interface: Interface;
  server: Server;
  result: Result;
}

export interface ProfileBanner {
  url: string;
}

export interface MeObject {
  created_at: number;
  socials: Social[];
  points: number;
  is_admin: boolean;
  machines: string[];
  datacenters: any[];
  primaryDatacenter: string;
  _id: string;
  username: string;
  email: string;
  profileImage: ProfileImage;
  geolocation: Geolocation;
  isDev: string;
  badges: Badges;
  bio: string;
  speedtest: Speedtest;
  profileBanner: ProfileBanner;
}
