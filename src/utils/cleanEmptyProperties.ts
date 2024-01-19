import { PrizeDetail } from "@/hooks/formType";
export default function cleanEmptyProperties(obj: { [key: string]: any }) {
  for (const key in obj) {
    if (
      obj[key] === "" ||
      obj[key] === null ||
      obj[key] === undefined ||
      (Array.isArray(obj[key]) && obj[key].length === 0)
    ) {
      delete obj[key];
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item: PrizeDetail) => ({ ...item }));
    }
  }
}
// 清除数组里值为空字段  PrizeDetail 为[]也清理掉
