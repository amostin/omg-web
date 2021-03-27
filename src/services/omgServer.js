const url = "http://localhost:3001"

exports.getAllTagsFromUserId = async function(userId){
    let ovUrl = url + "/tags/all?userId=" + userId;
    let res = await fetch(ovUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (res.status === 200) {
        return res.json();
    } else {
        return res.json();
    }
}
