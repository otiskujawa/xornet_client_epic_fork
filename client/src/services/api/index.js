import User from "./User.js";
import Machine from "./Machine.js";
import Datacenter from "./Datacenter.js";

const api = {
  user: new User(),
  machine: new Machine(),
  datacenter: new Datacenter()
};

console.log(
  `%c[API]` + `%c [Class Loaded]`,
  "color: black; background-color: #aa66ff; padding: 2px; border-radius: 4px; font-weight: bold;",
  "color: #cba1ff;"
);

export default api;