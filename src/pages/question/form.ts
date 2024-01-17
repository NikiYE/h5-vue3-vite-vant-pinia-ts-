export type PrizeDetail = {
  time: string;
  name: string;
  employer: string;
};
interface AnswerForm {
  familyName: string; // 姓氏
  firstName: string; //名字
  birthDate: string; // 出生年月      格式'1988,01'    ,隔开
  isLocal: string; // 户籍          "1"是"2"否
  alwaysLocal: string; // 祖籍          "1"是"2"否
  gender: string; //性别           "1"男"2"女
  nation: string; //民族
  political: string; //政治面貌
  armyServe: string; //是否服兵役      "1"未服役"2"现役"3"退伍"4"专业"5"复员
  otherGroup?: string; //其他党派名填空
  literacy?: string; //文化程度
  school?: string; //最高毕业学校
  graduationStatus?: string; // 毕业状态       "1"已毕业   "2"在读
  graduationTime?: string; //毕业时间        格式'1988,01'
  enrollmentTime?: string; //入学时间        格式'1988,01'
  maritalStatus?: string; //婚姻状况        "1"已婚2未婚3离异4丧偶
  occupation?: string; //职业
  rank?: string; //职称
  prize?: Array<PrizeDetail>; //获奖情况
  //   prize: [
  //  { name: "牛逼奖", time: "2021,01", employer: "牛逼的单位" }   //name奖项名称  // time颁奖时间  //employer颁奖单位
  //  { name: "苦逼奖", time: "2021,01", employer: "苦逼的单位" }
  // ]
}
export interface Option {
  text: string;
  id: string;
  value: string;
  skip?: string;
  needFilling?: boolean;
}
export const createAnswerForm = () => {
  return reactive<AnswerForm>({
    familyName: "",
    firstName: "",
    birthDate: "",
    isLocal: "",
    alwaysLocal: "",
    gender: "",
    nation: "",
    political: "",
    literacy: "",
    school: "",
    graduationStatus: "",
    graduationTime: "",
    enrollmentTime: "",
    maritalStatus: "",
    armyServe: "",
    occupation: "",
    rank: "",
    prize: [],
    otherGroup: "",
  });
};
