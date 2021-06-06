import axios from "axios";

let ROOT_PATH = "https://backend.xornet.cloud";

class API {
  /**
   * Custom log function with API suffix
   * @private
   */
  log(method, ...messages) {
    console.log(`%c[API] [${method}]`, "color: #aa66ff; font-weight: bold;", ...messages);
  }

  /**
   * Creates a pretty log for the API responses
   * @private
   */
  logResponse(method, response) {
    if (response.data?.message) this.log(method, response.data?.message);
    else if (response?.data) this.log(method, response?.data);
    else this.log(method, response);
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
   * Creates a new POST request to the backend
   * @param {String} route The route you wanna make a request to e.g. channels/pin
   * @param {String} params Any optional params the url should have e.g. channels/pin/:channel_uuid
   * @param {Object} body An optional body object to send to the route
   * @param {Object} headers An optional headers object to send to the route
   * @example const response = super.post('channels/group', undefined, body);
   */
  async post(route, params, body, headers) {
    return new Promise(async (resolve, reject) => {
      if (headers) {
        const response = await axios.post(this.constructEndpoint(route, params), body || undefined, {
          withCredentials: true,
          headers
        });

        this.logResponse(`POST ${route}`, response);
        resolve(response);
      } else {
        const response = await axios.post(this.constructEndpoint(route, params), body || undefined, {
          withCredentials: true
        });

        this.logResponse(`POST ${route}`, response);
        resolve(response);
      }
    });
  }

  /**
   * Creates a new PATCH request to the backend
   * @param {String} route The route you wanna make a request to e.g. channels/pin
   * @param {String} params Any optional params the url should have e.g. channels/pin/:channel_uuid
   * @param {Object} body An optional body object to send to the route
   * @param {Object} headers An optional headers object to send to the route
   * @example const response = super.patch('channels/group', undefined, body);
   */
  async patch(route, params, body, headers) {
    return new Promise(async (resolve, reject) => {
      console.log(headers);
      if (headers) {
        const response = await axios.patch(this.constructEndpoint(route, params), body || undefined, {
          withCredentials: true,
          headers
        });

        this.logResponse(`PATCH ${route}`, response.data);
        resolve(response.data);
      } else {
        const response = await axios.patch(this.constructEndpoint(route, params), body || undefined, {
          withCredentials: true
        });

        this.logResponse(`PATCH ${route}`, response.data);
        resolve(response.data);
      }
    });
  }

  /**
   * Creates a new PUT request to the backend
   * @param {String} route The route you wanna make a request to e.g. machine
   * @param {String} params Any optional params the url should have e.g. machine/:machine_uuid
   * @param {Object} body An optional body object to send to the route
   * @param {Object} headers An optional headers object to send to the route
   * @example const response = super.put('machine', undefined, body);
   */
  async put(route, params, body, headers) {
    return new Promise(async (resolve, reject) => {
      console.log(headers);
      if (headers) {
        const response = await axios.put(this.constructEndpoint(route, params), body || undefined, {
          withCredentials: true,
          headers
        });

        this.logResponse(`PUT ${route}`, response.data);
        resolve(response.data);
      } else {
        const response = await axios.put(this.constructEndpoint(route, params), body || undefined, {
          withCredentials: true
        });

        this.logResponse(`PUT ${route}`, response.data);
        resolve(response.data);
      }
    });
  }

  /**
   * Creates a new GET request to the backend
   * @param {String} route The route you wanna make a request to e.g. channels/pin
   * @param {String} params Any optional params the url should have e.g. channels/pin/:channel_uuid
   * @param {Object} headers An optional headers object to send to the route
   * @example const response = super.get('user');
   */
  async get(route, params, headers) {
    if (headers) {
      const response = await axios.get(this.constructEndpoint(route, params), {
        withCredentials: true,
        headers: headers
      });

      this.logResponse(`GET ${route}`, response);
      return response;
    } else {
      const response = await axios.get(this.constructEndpoint(route, params), {
        withCredentials: true
      });

      this.logResponse(`GET ${route}`, response);
      return response;
    }
  }

  /**
   * Creates a new DELETE request to the backend
   * @param {String} route The route you wanna make a request to e.g. channels/group
   * @param {String} params Any optional params the url should have e.g. channels/group/:channel_uuid
   * @example const response = super.delete('channels/group', channelUuid);
   */
  async delete(route, params) {
    const response = await axios.delete(this.constructEndpoint(route, params), {
      withCredentials: true
    });

    this.logResponse(`DELETE ${route}`, response);
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
        const response = await super.post("login", undefined, loginForm, { "Content-Type": "application/json" });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", loginForm.username);
        super.log("Logged in successfully");
        resolve(response.status);
      } catch (error) {
        super.log(error);
        reject(response.status);
      }
    });
  }

  /**
   * Post signup credentials into backend and returns the result of signup process
   * @param {Object} json Json object, which contains signup credentials
   */
  async signup(json) {
    const signupForm = { geolocation: await this.getGeolocation(), ...json };
    return super.post("signup", undefined, signupForm, { "Content-Type": "application/json" });
  }

  /**
   * Returns the user object of a user
   * @param {String} the user to get
   */
  async fetchProfile(username) {
    return (await super.get(`profile/${username}`)).data;
  }

  /**
   * Returns the user object of the logged in user, takes no input parameters
   */
  async fetchMe() {
    return (await super.get(`profile/${localStorage.getItem("username")}`)).data;
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

    return super.patch("profile", undefined, formData, { "Content-Type": "multipart/form-data" });
  }

  /**
   * Puts a new machine to the users database
   * @param {String} machineUUID The machine's uuid that you want to add
   */
  async addMachine(machineUUID) {
    return super.put("profile/machine", undefined, { machine: machineUUID }, { "Content-Type": "application/json" });
  }

  /**
   * Searches the database for users
   * @param {String} user Either a Username or a UUID of a user
   */
  async search(user) {
    return super.get(`/search/user/${user}`);
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
    return (await super.get(`stats/network/${machineUUID}`)).data;
  }
}

console.log(`%c[API] [Class Loaded]`, "color: #aa66ff; font-weight: bold;");

const api = {
  user: new User(),
  machine: new Machine()
};

export default api;
