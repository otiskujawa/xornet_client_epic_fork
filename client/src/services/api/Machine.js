import Base from "./Base";

export default class Machine extends Base {
  constructor() {
    super();
    super.log("Initialized machine class");
  }

  async getNetwork(machineUUID) {
    return (await super.request("get", `stats/network/${machineUUID}`)).data;
  }

  async getMachineSpecs(machineUUID) {
    return (await super.request("get", `stats/machine/${machineUUID}`)).data;
  }

  async getProcesses(machineUUID) {
    return (await super.request("get", `stats/processes/${machineUUID}`)).data;
  }

  async shutdown(machineUUID) {
    return (await super.request("post", `machine/${machineUUID}/shutdown`)).data;
  }

  async restart(machineUUID) {
    return (await super.request("post", `machine/${machineUUID}/restart`)).data;
  }

  async delete(machineUUID) {
    return (await super.request("delete", `profile/machine/${machineUUID}`)).data;
  }
}
