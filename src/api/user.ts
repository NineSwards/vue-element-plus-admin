import { defHttp } from '/@/utils/http';
import { ErrorMessageMode } from '/@/utils/http/types';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoByUserIdParams,
  GetUserInfoByUserIdModel,
} from './models/userModel';

enum Api {
  Login = '/login',
  GetUserInfoById = '/getUserInfoById',
  GetPermCodeByUserId = '/getPermCodeByUserId',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<LoginResultModel>(
    {
      url: Api.Login,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
  return defHttp.request<GetUserInfoByUserIdModel>({
    url: Api.GetUserInfoById,
    method: 'GET',
    params,
  });
}

export function getPermCodeByUserId(params: GetUserInfoByUserIdParams) {
  return defHttp.request<string[]>({
    url: Api.GetPermCodeByUserId,
    method: 'GET',
    params,
  });
}
