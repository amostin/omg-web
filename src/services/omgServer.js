import store from "../redux/store";

//
// Service file that contains all the requests for the OMG server API.
//

const hostUrl = "http://192.168.0.20:3001"  // Url of the OMG server
const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'Accept-Encoding': 'gzip, deflate, br'
});

/**
 * get all tags of a user
 *
 * @return {Promise<any>} : all tags of a user or an error
 */
export async function getAllTagsFromUserId() {
    let url = hostUrl + "/tags/all";
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': "Bearer " + store.getState().storeApiKey.apiKey
        }
    });
    return res.json();
}

/**
 * post a file data for data importation
 *
 * @param file
 * @return {Promise<(Response|any)[]|*>} : results of the importation
 */
export async function postUpload(file){
    try{
        let url = hostUrl + "/data/file";
        let formData = new FormData();
        formData.append('file', file.files[0])
        let res = await fetch(url, {
            credentials: "same-origin",
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': "Bearer " + store.getState().storeApiKey.apiKey,
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        });
        return [res, await res.json()];
    }catch (e) {
        return e;
    }
}

/**
 * retrieves the user's data according to the tag in parameter
 *
 * @param tagName
 * @return {Promise<any>} : all the data or an error.
 */
export async function getChartDataFromTagName(tagName) {
    let url = hostUrl + "/data/chart?tagName=" + tagName;

    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': "Bearer " + store.getState().storeApiKey.apiKey
        }
    });
    return res.json();
}

/**
 * Signin request
 *
 * @param email
 * @param password
 * @return {Promise<any>} : returns the token if ok or an error if not ok
 */
export async function signin(email, password) {
    let url = hostUrl + "/users/signin";
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    return res.json();
}

/**
 * Signup request
 *
 * @param user : JSON object that contains a user context
 * @return {Promise<any>} : returns the result of the request
 */
export async function signup(user) {
    let url = hostUrl + "/users/signup";
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    });
    return res.json();
}
