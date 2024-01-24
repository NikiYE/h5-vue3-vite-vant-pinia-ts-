import http, { Response } from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
}
type T = any;
interface judgePerson {
  book_name: string;
  book_id: string;
  problem_1: string;
  problem_2: string;
  problem_3: string;
}

export default {
  async judgeQuest(params: judgePerson) {
    return await http.post<Response<T>>("/quest/judge/", params);
  },
  async questAdd(params: T) {
    return await http.post<Response<T>>("/quest/add/", params);
  },
};

// 调用api
/**
 * 
 * 
 
import Api from '@/api/question';

const login = async () => {
    const { code, result, message } = await Api.judgeQuest(loginInfo);
    // do something
};


 * 
 */
