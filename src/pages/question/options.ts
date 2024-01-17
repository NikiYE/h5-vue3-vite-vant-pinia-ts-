// 政治面貌
export const columnsPolitical = [
  { text: "群众", id: "1", value: "1" },
  { text: "中国共产党员", id: "2", value: "2" },
  { text: "共青团团员", id: "3", value: "3" },
  { text: "其他党派人士", id: "4", value: "4", needFilling: true }, // 需要填空
];
// 文化程度
export const columnsLiteracy = [
  { text: "识字", id: "1", value: "1", skip: ["10", "11"] },
  { text: "小学", id: "2", value: "2", skip: ["10", "11"] },
  { text: "初中", id: "3", value: "3", skip: ["10", "11"] },
  { text: "普高/职高", id: "4", value: "4", skip: ["10", "11"] },
  { text: "大专", id: "5", value: "5", skip: [] },
  { text: "本科", id: "5", value: "5", skip: [] },
  { text: "研究生", id: "6", value: "6", skip: [] },
];
// 职业
export const columnsOccupation = [
  { text: "公职人员", id: "1", value: "1", skip: [] },
  { text: "教师", id: "2", value: "2", skip: [] },
  { text: "外出干部", id: "3", value: "3", skip: [] },
  { text: "科技人员", id: "4", value: "4", skip: ["15"] },
  { text: "企业负责人", id: "5", value: "5", skip: ["15"] },
  { text: "其他", id: "6", value: "6", skip: ["15"] },
];
