const API_ROOT = process.env.REACT_APP_API_ROOT
const POST_JSON_HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

export function login(pass) {
  let passJson = {}
  passJson.password = pass;

  const url = `${API_ROOT}/login`
  const opts = {
    headers: POST_JSON_HEADERS,
    method: 'post',
    body: JSON.stringify(passJson)
  }

  return fetch(url, opts)
  .then(res => res)
}

export function getEncodedEthTran(jwt) {
  const url = `${API_ROOT}/dropboxQR`
  let POST_WITH_AUTH_HEADERS = Object.assign(
    {Authorization: 'Bearer ' + jwt}, 
    POST_JSON_HEADERS
  )
  
  return fetch(url, {headers: POST_WITH_AUTH_HEADERS})
  .then(res => res)
}
