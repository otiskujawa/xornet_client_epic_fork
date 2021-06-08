import axios from "axios";

let ROOT_PATH = "https://backend.xornet.cloud";

class API {
  /**
   * Custom log function with API suffix
   * @param {String} method The API endpoint
   * @param {String} messages Optional messages
   * @private
   */
  log(method, ...messages) {
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
   * @param {String} method The API endpoint
   * @param {String} messages Optional messages
   * @private
   */
  error(method, ...messages) {
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
   * @param {String} method The API endpoint
   * @param {String} messages Optional messages
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
   * @param {String} method The API endpoint
   * @param {String} messages Optional messages
   * @private
   */
  logError(method, response) {
    if (!response) return;
    if (response.data?.message) this.error(method, response.data?.message);
    else if (response?.data) this.error(method, response?.data);
    else this.error(method, response);
  }

  /**
   * Creates a backend URL with the provided paramaters
   * @private
   */
  constructEndpoint(route, params) {
    let endpoint = `${ROOT_PATH}/${route}`;
    if (params) endpoint = endpoint + `/${params}`;

    return endpoint;
  }

  /**
   * Gets the geolocation of the client
   * @private
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
   * Creates a new request to the backend
   * @param {String} method The type of HTTP method e.g. GET, POST, PATCH etc
   * @param {String} route The route you wanna make a request to e.g. channels/pin
   * @param {Object} headers An optional headers object to send to the route
   * @param {Object} body An optional body object to send to the route
   * @param {String} params Any optional params the url should have e.g. channels/pin/:channel_uuid
   * @example const response = super.request('post', 'channels/group', undefined, body);
   */
  async request(method, route, headers, body, params) {
    const response = await axios
      [method](this.constructEndpoint(route, params), body || {
        withCredentials: true,
        headers
      })
      .catch(error => this.logError(`${method.toUpperCas()} ${route}`, error));

    this.logResponse(`${method.toUpperCas()} ${route}`, response);
    return response;
  }
}

/**
 * Handles all the endpoint functions for User
 */
class User extends API {
  constructor() {
    super();
    super.log("Initialized user class");
  }

  /**
   * Post login credentials into backend and returns the login token on successful login
   * @param {Object} json Json object, which contains login credentials
   */
  async login(json) {
    return new Promise(async (resolve, reject) => {
      try {
        const loginForm = { geolocation: await this.getGeolocation(), ...JSON.parse(json) };
        const response = await super.request("post", "login", { "Content-Type": "application/json" }, loginForm);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", loginForm.username);
        super.log("Logged in successfully");
        resolve(response.status);
      } catch (error) {
        super.log(error);
        reject(error.status);
      }
    });
  }

  /**
   * Post signup credentials into backend and returns the result of signup process
   * @param {Object} json Json object, which contains signup credentials
   */
  async signup(json) {
    const signupForm = { geolocation: await this.getGeolocation(), ...json };
    return super.request("post", "signup", { "Content-Type": "application/json" }, signupForm);
  }

  /**
   * Returns the user object of a user
   * @param {String} the user to get
   */
  async fetchProfile(username) {
    return (await super.request("get", `profile/${username}`)).data;
  }

  /**
   * Returns the user object of the logged in user, takes no input parameters
   */
  async fetchMe() {
    return (await super.request("get", `profile/${localStorage.getItem("username")}`)).data;
  }

  /**
   * Returns the users logs, if admin they have access to admin logs for the backend
   * @param {String} [machineUUID] The uuid of a specific machine you want to get logs for
   */
  async fetchLogs(machineUUID) {
    return machineUUID ? (await super.request("get", `logs/${machineUUID}`)).data : (await super.request("get", `logs`)).data;
  }

  /**
   * Post signup credentials into backend and returns the result of signup process
   * @param {Object} profile profile object, which contains new desired user credentials
   * @param {Object} profileImage image object, which contains image class from the refs
   * @param {Object} profileBanner image object, which contains image class from the refs
   */
  async save(profile, profileImage, profileBanner) {
    let formData = new FormData();
    formData.append("json", JSON.stringify(profile));
    formData.append("image", profileImage);
    formData.append("banner", profileBanner);

    return super.request("patch", "profile", { "Content-Type": "multipart/form-data" }, formData);
  }

  /**
   * Puts a new machine to the users database
   * @param {String} machineUUID The machine's uuid that you want to add
   */
  async addMachine(machineUUID) {
    return super.request("put", "profile/machine", { "Content-Type": "application/json" }, { machine: machineUUID });
  }

  /**
   * Searches the database for users
   * @param {String} user Either a Username or a UUID of a user
   */
  async search(user) {
    return (await super.request("get", `/search/user/${user}`)).data;
  }
}

/**
 * Handles all the endpoint functions for User
 */
class Machine extends API {
  constructor() {
    super();
    super.log("Initialized machine class");
  }

  async getNetwork(machineUUID) {
    return (await super.request("get", `stats/network/${machineUUID}`)).data;
  }
}

console.log(`%c[API]` + `%c [Class Loaded]`, "color: black; background-color: #aa66ff; padding: 2px; border-radius: 4px; font-weight: bold;", "color: #cba1ff;");

const api = {
  user: new User(),
  machine: new Machine()
};

export default api;
