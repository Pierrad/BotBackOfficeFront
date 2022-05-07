const api = import.meta.env.VITE_API_URL

export const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

function setCookie(name, value, expiration) {
  document.cookie = `${name}=${value};max-age=${expiration};path=/`
}

export const callAPI = async (url, method, body) => {
  const authCookie = getCookie('authToken')
  return await fetch(`${api}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": authCookie ? `${authCookie}` : ''
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.success === false) {
        alert(data.data.message)
        throw new Error('API call failed')
      } else {
        if (data.data.user) {
          const { token, expiration } = data.data.user.token
          setCookie('authToken', token, expiration)
        }
        return data
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
