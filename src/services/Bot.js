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
