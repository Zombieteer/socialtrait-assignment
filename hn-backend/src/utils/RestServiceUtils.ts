import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RestServiceUtils {
  constructor() {}
  static async MakePostRequest(variables) {
    try {
      const Options: AxiosRequestConfig = {
        method: 'POST',
        url: variables.url,
        headers: variables.headers
          ? variables.headers
          : { 'Content-Type': 'application/json' },
        data: variables.data,
        auth: variables?.auth
      };
      const response: AxiosResponse = await axios(Options);
      return response.data;
    } catch (error) {
      if (error?.response?.data) return error?.response?.data;
      else return error;
    }
  }
  static async MakeGetRequest(variables) {
    try {
      const url = new URL(variables.url);
      // Construct the URL with parameters
      for (const key in variables.params) {
        if (variables.params.hasOwnProperty(key)) {
          url.searchParams.append(key, variables.params[key]);
        }
      }

      const Options = {
        method: 'GET',
        url: url.toString(),
        headers: variables.headers
        ? variables.headers
        : { 'Content-Type': 'application/json' }
      };
      
      const response = await axios(Options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async MakePutRequest(variables) {
    try {
      const Options: AxiosRequestConfig = {
        method: 'PUT',
        url: variables.url,
        headers: variables.headers
          ? variables.headers
          : { 'Content-Type': 'application/json' },
        data: variables.data,
      };
      const response: AxiosResponse = await axios(Options);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
