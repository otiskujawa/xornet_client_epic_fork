import axios from "axios";
import eventHandler from "@/services/eventHandler";
import { appState } from "@/states/appState";
let ROOT_PATH = "https://backend.xornet.cloud";

/**
 * @author Geoxor & Niko Huuskonen

 * Main API class that interfaces with the backend
 * It contains functions and debugging logs to easily
 * handle requests with the backend
 *
 * Note: The data from here can be taken to create API docs in the future
 * @private
 */
export default class Base {
  /**
   * Custom log function with API suffix
   * @param {string} method The API endpoint
   * @param {string} [messages] Optional messages
   * @private
   */
  log(method, ...messages) {
    // eventHandler.emit("show", { method, messages, type: "ok" });

    // prettier-ignore
    console.log(
      `%c[API]` + 
      `%c [${method}]`, 
      "color: black; background-color: #aa66ff; padding: 2px; border-radius: 4px; font-weight: bold;", 
      "color: #cba1ff;", 
      ...messages
    );
  }

  /**
   * Custom log for errors with API suffix
   * @param {string} method The API endpoint
   * @param {string} [messages] Optional messages
   * @private
   */
  error(method, ...messages) {
    eventHandler.emit("show", { method, messages, type: "error" });

    // prettier-ignore
    console.log(
      `%c[API]` + 
      `%c [${method}]` + 
      `%c ${messages}`, 
      "color: black; background-color: #ff2424; padding: 2px; border-radius: 4px; font-weight: bold;", 
      "color: #ff2424;", 
      "color: #ff6363;", 
    );
  }

  /**
   * Creates a pretty log for the API responses
   * @param {string} method The API endpoint
   * @param {string} [messages] Optional messages
   * @private
   */
  logResponse(method, response) {
    if (!response) return;
    if (response.data?.message) this.log(method, response.data?.message);
    else if (response?.data) this.log(method, response?.data);
    else this.log(method, response);
  }

  /**
   * Creates a pretty log for the API errors
   * @param {string} method The API endpoint
   * @param {string} [messages] Optional messages
   * @private
   */
  logError(method, response) {
    if (!response) return;
    if (response.data?.message) this.error(method, response.data?.message);
    else if (response?.data) this.error(method, response?.data);
    else this.error(method, response);
  }

  /**
   * Gets the geolocation of the client
   * @private
   * @returns {object} object
   */
  async getGeolocation() {
    const location = (await axios.get(`https://ipwhois.app/json/`)).data;
    const geolocation = {
      location: location.country,
      countryCode: location.country_code,
      isp: location.isp
    };
    return geolocation;
  }

  /**
   * Creates a backend URL with the provided paramaters
   * @private
   * @param {string} route The main route
   * @returns {string} https://backend.xornet.cloud/profile
   * @example constructEndpoint('profile')
   */
  constructEndpoint(route) {
    return `${ROOT_PATH}/${route}`;
  }

  /**
   * Caches the user's properties in the local storage so the site knows how to style different pages based on who the user is
   * @param {object} userObject the me object u get from a request from the backend
   */
  updateLocalStorage(userObject) {
    localStorage.setItem("me", JSON.stringify(userObject));
    appState.setMe(userObject);
  }

  /**
   * Creates a new request to the backend
   * @param {string} method The type of HTTP method e.g. GET, POST, PATCH etc
   * @param {string} route The route you wanna make a request to e.g. channels/pin
   * @param {object} headers An optional headers object to send to the route
   * @param {object} body An optional body object to send to the route
   * @example
   * const response = await super.request("get", `datacenter/${datacenter}`);
   * const response = await super.request("put", `datacenter/${datacenter}/user/${user.toLowerCase()}`);
   * const response = await super.request("post", `datacenter/new`, { "Content-Type": "application/json" }, form);
   * const response = await super.request("delete", `datacenter/${datacenter}/user/${user.toLowerCase()}`);
   * @returns {Promise<void>} A promise of the response
   * @author Geoxor
   */
  async request(method, route, headers, body) {
    if (method === "get" || method === "delete") {
      var response = await axios[method](
        this.constructEndpoint(route),
        body || {
          withCredentials: true,
          headers
        }
      ).catch(error => this.logError(`${method.toUpperCase()} ${route}`, error));
    } else {
      var response = await axios[method](this.constructEndpoint(route), body || undefined, {
        withCredentials: true,
        headers
      }).catch(error => this.logError(`${method.toUpperCase()} ${route}`, error));
    }

    this.logResponse(`${method.toUpperCase()} ${route}`, response);
    return response;
  }
}
