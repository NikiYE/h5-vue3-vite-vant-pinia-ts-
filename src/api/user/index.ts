import http, { Response } from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  mobile: number;
  email: string;
}

export default {
  async login(params: LoginParams) {
    return await http.post<Response<UserInfo>>("/user/login", params);
  },
};

// 调用api
/**
 * 
 * 
 
import Api from '@/api/user';

const login = async () => {
    const { code, result, message } = await Api.login(loginInfo);
    // do something
};


 * 
 */
