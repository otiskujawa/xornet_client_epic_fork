import Base from "./Base";

export default class User extends Base {
  constructor() {
    super();
    super.log("Initialized user class");
  }

  /**
   * Post login credentials into backend and returns the login token on successful login
   * @param {object} json Json object, which contains login credentials
   * @returns {number} of the response's status, e.g. 200 if successful
   */
  async login(json) {
    return new Promise(async (resolve, reject) => {
      try {
        const loginForm = { geolocation: await super.getGeolocation(), ...JSON.parse(json) };
        const response = await super.request("post", "login", { "Content-Type": "application/json" }, loginForm);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", loginForm.username);
        super.updateLocalStorage(response.data.me);
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
   * @param {object} json Json object, which contains signup credentials
   * @returns {AxiosResponse} of the request
   */
  async signup(json) {
    const signupForm = { geolocation: await super.getGeolocation(), ...json };

    // This doesn't return just the .data on purpose unlike the others because
    // i needed the status codes to decide wether the frontend will
    // redirect to logging in or not if the request succeeded
    return await super.request("post", "signup", { "Content-Type": "application/json" }, signupForm);
  }

  /**
   * Gets the user object of a user
   * @param {string} username the user's UUID to get
   * @returns {object} of the user's profile
   */
  async fetchProfile(username) {
    return (await super.request("get", `profile/${username}`)).data;
  }

  /**
   * Gets the logged in user's object
   * @returns {object} of the user's profile
   */
  async fetchMe() {
    return (await super.request("get", `profile/${localStorage.getItem("username")}`)).data;
  }

  /**
   * Syncs the localStorage with the database from the backend
   */
  async syncLocalStorage(){
    super.updateLocalStorage(await this.fetchMe());
  }

  /**
   * Returns the users logs, if admin they have access to admin logs for the backend
   * @param {string} machineUUID The uuid of a specific machine you want to get logs for
   * @returns {object} of the logs
   */
  async fetchLogs(machineUUID) {
    return machineUUID ? (await super.request("get", `logs/${machineUUID}`)).data : (await super.request("get", `logs`)).data;
  }

  /**
   * Post signup credentials into backend and returns the result of signup process
   * @param {object} profile profile object, which contains new desired user credentials
   * @param {object} profileImage image object, which contains image class from the refs
   * @param {object} profileBanner image object, which contains image class from the refs
   */
  async save(profile, profileImage, profileBanner) {
    let formData = new FormData();

    const { bio, socials, badges, email } = profile;

    formData.append("json", JSON.stringify({ bio, socials, badges, email }));
    formData.append("image", profileImage);
    formData.append("banner", profileBanner);

    return (await super.request("patch", "profile", { "Content-Type": "multipart/form-data" }, formData)).data;
  }

  /**
   * Puts a new machine to the users database
   * @param {string} machineUUID The machine's uuid that you want to add
   */
  async addMachine(machineUUID) {
    return (await super.request("put", "profile/machine", { "Content-Type": "application/json" }, { machine: machineUUID }))
      .data;
  }

  /**
   * Searches the database for users
   * @param {string} user Either a Username or a UUID of a user
   */
  async search(user) {
    return (await super.request("get", `/search/user/${user}`)).data;
  }

  async setPrimaryDatacenter(datacenter) {
    const response = await super.request("patch", `datacenter/primary/${datacenter}`);
    super.updateLocalStorage(response.data.me);
    return response.data;
  }
}