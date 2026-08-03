import axios from "axios"

export const API_BASE_URL = 'http://localhost:8000/api'

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login/',
    register: '/auth/register/',
    logout: '/auth/logout/',
    me: '/auth/me/'
  },
  template:{
    template: "/template/",
  },
  audience:{
    audiences:"/audiences/",
    upload:"/audiences/upload/",
    audienceById:"/audiences/"
  },
  jobs:{
    status:"/jobs/"
  },
  campaign:{
    campaign: "/campaign",
    create: "/campaign/create"
  }
}


export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default api
