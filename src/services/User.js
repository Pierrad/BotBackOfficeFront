import Router from '../router/index'

import { callAPI } from '../helpers/api'


export const login = async (email, password) => {
  await callAPI(`/users/login`, 'POST', { email, password })
    .then((data) => {
      if (data) {
        Router.push('/dashboard')
      }
    })
}
