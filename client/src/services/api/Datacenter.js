import API from "./Base";

/**
 * Contains functions for the datacenter routes in the backends
 * @author Geoxor
 */
export default class Datacenter extends API {
  constructor() {
    super();
    super.log("Initialized datacenter class");
  }

  /**
   * Get all of the user's datacenters
   * @returns {object}
   */
  async fetchAll() {
    return (await super.request("get", `datacenter/all`)).data;
  }

  /**
   * Get the total amount of machines in a given datacenter
   * @param {string} datacenter the datacenter's UUID
   * @returns {object} containing the data
   */
  async fetchMachineCount(datacenter) {
    if (datacenter) return (await super.request("get", `datacenter/${datacenter}/machine/count`)).data;
  }

  /**
   * Gets all details of a datacenter
   * @param {string} datacenter the datacenter's UUID
   * @returns {object} containing the data
   */
  async fetch(datacenter) {
    return (await super.request("get", `datacenter/${datacenter}`)).data;
  }

  /**
   * Removes a user from a datacenter
   * @param {string} datacenter the datacenter's UUID
   * @param {string} user the user's UUID
   * @returns {object} the updated datacenter without the user
   */
  async revokeMember(datacenter, user) {
    return (await super.request("delete", `datacenter/${datacenter}/user/${user.toLowerCase()}`)).data;
  }

  /**
   * Adds a user to a datacenter
   * @param {string} datacenter the datacenter's UUID
   * @param {string} user the user's UUID
   * @returns {object} the updated datacenter with the added user
   */
  async addMember(datacenter, user) {
    return (await super.request("put", `datacenter/${datacenter}/user/${user.toLowerCase()}`)).data;
  }

  /**
   * Adds a machine to a datacenter
   * @param {string} datacenter the datacenter's UUID
   * @param {string} machine the machine's UUID
   * @returns {object} the updated datacenter with the added machine
   */
  async addMachine(datacenter, machine) {
    return (await super.request("put", `datacenter/${datacenter}/machine/${machine.toLowerCase()}`)).data;
  }

  /**
   * Creates a new datacenter
   * @param {object} form a form containing the name of the datacenter
   * @returns {object} the new datacenter
   */
  async add(form) {
    return await super.request("post", `datacenter/new`, { "Content-Type": "application/json" }, form);
  }

  
  /**
   * Creates a new datacenter
   * @param {string} datacenter the name or uuid of the datacenter to remove
   */
  async remove(datacenter) {
    return await super.request("delete", `datacenter/${datacenter}`);
  }

  /**
   * Post signup credentials into backend and returns the result of signup process
   * @param {string} datacenter The name of the datacenter
   * @param {Blob} logo image Blob, which contains image class from the refs
   * @param {Blob} banner image Blob, which contains image class from the refs
   */
  async save(datacenter, logo, banner) {
    let formData = new FormData();
    formData.append("logo", logo);
    formData.append("banner", banner);

    datacenter = datacenter.trim();

    return super.request("patch", `datacenter/${datacenter}`, { "Content-Type": "multipart/form-data" }, formData);
  }
}