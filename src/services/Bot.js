import { callAPI } from "../helpers/api"
import { getCookie } from "../helpers/api"

export const getBots = async () => {
  const authCookie = getCookie("authToken")
  if (authCookie) {
    return await callAPI(`/bot`, "GET").then((data) => {
      if (data.success === true) {
        return data.data.bots
      }
    })
  }
}

export const getOneBot = async (id) => {
  const authCookie = getCookie("authToken")
  if (authCookie) {
    return await callAPI(`/bot/${id}`, "GET").then((data) => {
      if (data.success === true) {
        return data.data.bot
      }
    })
  }
}

export const editEntries = async (id, entries) => {
  const authCookie = getCookie("authToken")
  if (authCookie) {
    return await callAPI(`/bot/edit/entries`, "POST", { botID: id, entries }).then((data) => {
      if (data.success === true) {
        return true
      }
    })
  }
}

export const addBot = async (name) => {
  const authCookie = getCookie("authToken")
  if (authCookie) {
    return await callAPI(`/bot`, "POST", { name, entries: [] }).then((data) => {
      if (data.success === true) {
        location.reload()
        return true
      }
    })
  }
}

export const deleteBot = async (id) => {
  const authCookie = getCookie("authToken")
  if (authCookie) {
    return await callAPI(`/bot/${id}`, "DELETE").then((data) => {
      if (data.success === true) {
        location.reload()
        return true
      }
    })
  }
}
