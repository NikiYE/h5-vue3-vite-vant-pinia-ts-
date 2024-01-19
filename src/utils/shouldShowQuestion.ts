// 是否展示问题函数
import { Option } from "@/hooks/formType";
export default function shouldShowQuestion(
  selectedOptions: Option[],
  questionCode: string
) {
  return !(
    selectedOptions[0] &&
    selectedOptions[0].skip &&
    selectedOptions[0].skip.includes(questionCode)
  );
}
