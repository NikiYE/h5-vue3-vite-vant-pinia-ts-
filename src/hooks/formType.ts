export type PrizeDetail = {
  time: string;
  name: string;
  employer: string;
};
export interface AnswerForm {
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

interface Question {
  question_id: number;
  answer: string | PrizeDetail[]; //答案除了文本还有奖项的array
  answer_info?: string;
}
export interface Transformed {
  book_name: string;
  book_id: string;
  answers: Question[];
}
// 定义一个映射，将原始数据的键映射到问题 ID
export const keyToQuestionIdMap = {
  familyName: 1,
  firstName: 2,
  birthDate: 3,
  isLocal: 4,
  alwaysLocal: 5,
  gender: 6,
  nation: 7,
  political: 8,
  // otherGroup: 8,
  literacy: 9,
  school: 10,
  graduationStatus: 11,
  // graduationTime: 11,
  // enrollmentTime: 11,
  maritalStatus: 12,
  armyServe: 13,
  occupation: 14,
  rank: 16,
  prize: 15,
};

const oldData = {
  alwaysLocal: "2",
  armyServe: "1",
  birthDate: "1988,01",
  enrollmentTime: "2024,01",
  familyName: "陶",
  firstName: "知微",
  gender: "2",
  graduationStatus: "2",
  isLocal: "2",
  literacy: "研究生",
  maritalStatus: "1",
  nation: "汉族",
  occupation: "外出干部",
  otherGroup: "意大利黑手党",
  political: "其他党派人士",
  prize: [
    { name: "一级大法师", time: "1988,01", employer: "飞天大学" },
    { name: "二级大法师", time: "1985,01", employer: "拉面大学" },
  ],
};
const sendData = {
  book_name: "第三方",
  book_id: "6",
  questions: [
    {
      question_id: 1,
      answer: "陶",
    },
    {
      question_id: 2,
      answer: "知微",
    },
    {
      question_id: 3,
      answer: "1988,01",
    },
    {
      question_id: 4,
      answer: "是",
    },
    {
      question_id: 5,
      answer: "否",
    },
    {
      question_id: 6,
      answer: "女",
    },
    {
      question_id: 7,
      answer: "汉族",
    },
    {
      question_id: 8,
      answer: "其他党派人士",
      answer_info: "意大利黑手党",
    },
    {
      question_id: 9,
      answer: "研究生",
    },
    {
      question_id: 10,
      answer: "飞天拉面大学",
    },
    {
      question_id: 11,
      answer: "在读",
      answer_info: "2024,01",
    },
    {
      question_id: 12,
      answer: "离异",
    },
    {
      question_id: 13,
      answer: "退伍",
    },
    {
      question_id: 14,
      answer: "外出干部",
    },
    {
      question_id: 16,
      answer: "大法师",
    },
    {
      question_id: 15,
      answer: [
        {
          name: "一级大法师",
          time: "1988,01",
          employer: "飞天大学",
        },
        {
          name: "二级大法师",
          time: "1985,01",
          employer: "拉面大学",
        },
      ],
    },
  ],
};
