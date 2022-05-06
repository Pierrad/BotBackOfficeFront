import Router from "../router/index"

import { callAPI } from "../helpers/api"
import { getCookie } from "../helpers/api"

export const login = async (email, password) => {
  await callAPI(`/users/login`, "POST", { email, password }).then((data) => {
    if (data) {
      Router.push("/dashboard")
    }
  })
}

export const canUserAccess = async () => {
  const authCookie = getCookie("authToken")
  if (authCookie) {
    return await callAPI(`/users/check`, "GET").then((data) => {
      if (data.success === true) {
        return true
      }
      return false
    })
  }
  return false
}
