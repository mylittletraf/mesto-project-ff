const cohortId = 'wff-cohort-33';
const token = 'cef2ed80-2443-4bbe-a77e-49f842621a4d'
const url = 'https://mesto.nomoreparties.co'


export function makeRequest(endpoint, requestMethod = "GET", body = null) {
    console.log(`${url}/v1/${cohortId}/${endpoint}`);
    console.log(body)
    return fetch(`${url}/v1/${cohortId}/${endpoint}`, {
        method: requestMethod,
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null,
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.status)
            }
        })
        .catch((err) => {
            console.error(err); // выводим ошибку в консоль
        })

}

