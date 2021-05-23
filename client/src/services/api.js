import axios from 'axios'
axios.defaults.withCredentials = true;

let ROOT_PATH = 'https://backend.xornet.cloud';

class API {

    /**
     * Custom log function with API suffix
     * @private
     */
    log(...messages) {
        console.log("%c[API]", 'color: #ff0066; font-weight: bold;', ...messages);
    }

    /**
     * Creates a pretty log for the API responses
     * @private
     */
    logResponse(response){
        if(response.data?.message) this.log(response.data?.message);
        else if(response?.data) this.log(response?.data);
        else this.log(response)
    }

    /**
     * Creates a backend URL with the provided paramaters
     * @private
     */
    constructEndpoint(route, params){
        let endpoint = `${ROOT_PATH}/${route}`;
        if (params) endpoint = endpoint + `/${params}`;

        return endpoint 
    }

    /**
     * Creates a new POST request to the backend
     * @param {String} route The route you wanna make a request to e.g. channels/pin
     * @param {String} params Any optional params the url should have e.g. channels/pin/:channel_uuid
     * @param {Object} body An optional body object to send to the route
     * @example const response = super.post('channels/group', undefined, body);
     */
    async post(route, params, body, headers){
        return new Promise (async (resolve, reject) => {
            console.log(headers);
            if(headers) {
                const response = await axios.post(this.constructEndpoint(route, params), body || undefined, {
                    withCredentials: true,
                    headers,
                });

                this.logResponse(response);
                resolve(response);
            } else {
                const response = await axios.post(this.constructEndpoint(route, params), body || undefined, {
                    withCredentials: true
                });

                this.logResponse(response);
                resolve(response);
            }
        });
    }

    /**
     * Creates a new GET request to the backend
     * @param {String} route The route you wanna make a request to e.g. channels/pin
     * @param {String} params Any optional params the url should have e.g. channels/pin/:channel_uuid
     * @example const response = super.get('user');
     */
    async get(route, params, headers){
        if(headers) {
            const response = await axios.get(this.constructEndpoint(route, params), {
                withCredentials: true,
                headers: headers
            });

            this.logResponse(response);
            return response;
        } else {
            const response = await axios.get(this.constructEndpoint(route, params), {
                withCredentials: true
            });

            this.logResponse(response);
            return response;
        }
    }

    /**
     * Creates a new DELETE request to the backend
     * @param {String} route The route you wanna make a request to e.g. channels/group
     * @param {String} params Any optional params the url should have e.g. channels/group/:channel_uuid
     * @example const response = super.delete('channels/group', channelUuid);
     */
    async delete(route, params){
        const response = await axios.delete(this.constructEndpoint(route, params), {
            withCredentials: true
        });

        this.logResponse(response);
        return response;
    }
};


/**
 * Handles all the endpoint functions for User
 */
class User extends API {
    constructor() {
        super();
        super.log('Initialized user class');
    }

    /**
     * Post login credentials into backend and returns the login token on successful login
     * @param {Object} json Json object, which contains login credentials
     */
    async login(json){
        return new Promise(async (resolve, reject) => {
            try {
                const response = await super.post('login', undefined, json, {'Content-Type': 'application/json'});
                localStorage.setItem('token', response.data.token);
                super.log('Logged in successfully');
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
     async signup(json){ 
        return super.post('signup', undefined, json, {'Content-Type': 'application/json'});
    }
}


console.log("[API] Class Loaded");
const api = {
    user: new User,
}; 

console.log(api);

export default api;