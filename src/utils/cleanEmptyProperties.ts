import { PrizeDetail } from "@/hooks/formType";
export default function cleanEmptyProperties(obj: { [key: string]: any }) {
  for (const key in obj) {
    const value = obj[key];
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete obj[key];
    } else if (Array.isArray(value)) {
      obj[key] = value.map((item: PrizeDetail) => ({ ...item }));
    }
    // 检查是否是对象并递归清理
    if (typeof value === "object" && value !== null) {
      cleanEmptyProperties(value); // 递归调用以清除嵌套对象的空属性
      if (Object.keys(value).length === 0) {
        // 如果对象为空，则删除
        delete obj[key];
      }
    }
  }
}
// 清除数组里值为空字段  PrizeDetail 为[]也清理掉
