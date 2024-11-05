import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const baseURL = "http://localhost:5001"

const getHeaders = () => {
    return {
      Authorization: `Bearer ${cookies.get('token')}`
    };
  }

export class protectedAPI{
    public get = async <T>(url : string, params? : T) => {
        const headers = getHeaders()
        return await axios.get(`${baseURL}${url}`, {headers, params} )
    }

    public post = async <T>(url : string, body? : T) => {
        const headers = getHeaders()
        return await axios.post(`${baseURL}${url}`, body, {headers} )
    }
}

export class unprotectedAPI{
    public get = async <T>(url : string, params? : T) => {
        return await axios.get(`${baseURL}${url}`, {params} )
    }

    public post = async <T>(url : string, body? : T) => {
        return await axios.post(`${baseURL}${url}`, body )
    }
}