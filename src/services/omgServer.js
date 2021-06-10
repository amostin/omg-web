import store from "../redux/store";

const hostUrl = "http://192.168.0.20:3001"
const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'Accept-Encoding': 'gzip, deflate, br'
});

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
