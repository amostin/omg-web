import store from "../redux/store";

//
// Service file that contains all the requests for the OMG server API.
//

const hostUrl = "http://51.255.48.210/api"  // Url of the OMG server
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
 * @param sensorModel
 * @param importName
 * @return {Promise<(Response|any)[]|*>} : results of the importation
 */
export async function postUpload(file, sensorModel, importName) {
    try {
        let url = hostUrl + "/data/file";
        let formData = new FormData();
        formData.append('file', file.files[0]);
        formData.append('sensorModel', sensorModel);
        formData.append('importName', importName);
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
    } catch (e) {
        return e;
    }
}

/**
 * retrieves the user's data according to the tag in parameter
 *
 * @param tagName
 * @param datetimeRange
 * @param timeSelected
 * @param weekDaysSelected
 * @return {Promise<any>} : all the data or an error.
 */
export async function getChartDataFromTagName(tagName, datetimeRange, timeSelected, weekDaysSelected) {
    let url = hostUrl + "/data/chart?tagName=" + tagName + "&fromTime=" + timeSelected[0] + "&toTime=" + timeSelected[1];
    if (datetimeRange) {
        url += "&startDate=" + datetimeRange[0].toISOString() + "&endDate=" + datetimeRange[1].toISOString();
    }
    if (weekDaysSelected.length > 0) {
        url += "&weekDays=" + weekDaysSelected.join('-');
    }
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
    console.log(res);
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

/**
 * Get all the days that contain data
 *
 * @return Array of date {Promise<any>}
 */
export async function getDataDays() {
    let url = hostUrl + "/data/datadays";
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

export async function getImportNames() {
    let url = hostUrl + "/data/importnames";
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

export async function deleteFile(importName) {
    let url = hostUrl + "/data/file";
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': "Bearer " + store.getState().storeApiKey.apiKey
        },
        body: '{"importName": "' + importName + '"}'
    });
    return [res, await res.json()];
}

export async function deleteAll() {
    try {
        let url = hostUrl + "/data/all";
        let res = await fetch(url, {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Authorization': "Bearer " + store.getState().storeApiKey.apiKey
            }
        });
        return [res, await res.json()];
    } catch (e) {
        console.log(e);
    }
}

/**
 * verify token request
 *
 * @return {Promise<Response>}
 */
export async function verifyToken() {
    let url = hostUrl + '/users/verify';
    return await fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
        },
    });
}

/**
 * recent tags request
 *
 * @return {Promise<null|any>} : 8 most recent tags or error
 */
export async function getRecentTags() {
    let url = hostUrl + '/tags/recent';
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
        },
    });
    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
}

/**
 * request for insert activation tag in the database
 *
 * @param tag
 * @param date
 * @return {Promise<any>} : return result request
 */
export async function postBasicTag(tag, date) {
    try {
        const url = hostUrl + '/tags/one';
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tag: tag,
                startDatetime: date,
                endDatetime: date,
            }),
        });
        if (res.ok) {
            return await res.json();
        } else {
            return null;
        }
    } catch (e) {
        return e;
    }
}

/**
 * Retrieves the 10 most recent tags based on the creation date passed in parameters
 *
 * @param datetimeBegin
 * @return {Promise<null|any>} : 10 most recent tags or error
 */
export async function getTagsHistory(datetimeBegin) {
    let url = hostUrl + '/tags/recentHistory?datetimeBegin=' + datetimeBegin ;
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
        },
    });
    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
}

/**
 * Retrieves the count of all activated tag
 *
 * @return {Promise<null|any>} count or error
 */
export async function getCountAllActivations() {
    let url = hostUrl + '/tags/countAllActivations';
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
        },
    });
    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
}

export async function putOneTag(tagName, tagId, tagDatetime) {
    let url = hostUrl + '/tags/one';
    let res = await fetch(url, {
        credentials: 'same-origin',
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + store.getState().storeApiKey.apiKey,
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tagId: tagId,
            tagDatetime: tagDatetime,
            tagName: tagName,
        })
    });
    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
}
