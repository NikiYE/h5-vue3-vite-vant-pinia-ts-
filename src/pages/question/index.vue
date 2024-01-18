<template>
  <div class="header">
    <p class="question-title">《{{ bookName }}》问卷调查</p>
    <p class="question-tip">
      为了巴拉巴拉，什么巴拉巴拉~更好的扒拉吧啦，请怎么样巴拉拉，巴啦啦啦~
    </p>
  </div>
  <van-form ref="formRef" :model="answerForm">
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <div class="topic"><span class="red">*</span> 1.您的姓氏</div>
      <van-field v-model="answerForm.familyName" placeholder="在此输入" :rules="[{ required: true, message: '请填写您的姓氏' }]" />

      <div class="topic"><span class="red">*</span>2.您的名字</div>
      <van-field v-model="answerForm.firstName" placeholder="在此输入" :rules="[{ required: true, message: '请填写您的名字' }]" />

      <div class="topic"><span class="red">*</span>3.您的出生年月</div>
      <van-field v-model="answerForm.birthDate" :rules="[{ required: true, message: '请选择您的出生年月' }]" is-link readonly
        placeholder="选择出生年月" @click="showBirth = true" />
      <van-popup v-model:show="showBirth" round position="bottom">
        <van-date-picker @cancel="showBirth = false" @confirm="onBirthConfirm" v-model="currentBirthDate" title="选择日期"
          :columns-type="columnsType" :min-date="minDate" :max-date="maxDate" />
      </van-popup>

      <div class="topic">
        <span class="red">*</span>4.您户籍是否为{{ addressName }}
      </div>
      <van-field name="radio" v-model="answerForm.isLocal" :rules="[{ required: true, message: '请确认您的户籍' }]">
        <template #input>
          <van-radio-group v-model="answerForm.isLocal" direction="horizontal">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div class="topic">
        <span class="red">*</span>5.您祖籍是否为{{ addressName }}
      </div>
      <van-field name="radio" v-model="answerForm.alwaysLocal" :rules="[{ required: true, message: '请确认您的祖籍' }]">
        <template #input>
          <van-radio-group v-model="answerForm.alwaysLocal" direction="horizontal">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div class="topic"><span class="red">*</span>6.您的性别</div>
      <van-field name="radio" v-model="answerForm.gender" :rules="[{ required: true, message: '请选择您的性别' }]">
        <template #input>
          <van-radio-group v-model="answerForm.gender" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div class="topic"><span class="red">*</span>7.您的民族为</div>
      <van-field v-model="answerForm.nation" placeholder="在此输入" :rules="[{ required: true, message: '请输入你的民族如：汉族' }]" />

      <div class="topic"><span class="red">*</span>8.您的政治面貌为</div>
      <van-field v-model="answerForm.political" :rules="[{ required: true, message: '请选择您的政治面貌' }]" readonly is-link
        placeholder="请选择" @click="showPolitical = true" />
      <van-popup v-model:show="showPolitical" round position="bottom">
        <van-picker title="政治面貌" :columns="columnsPolitical" @confirm="onPoliticalConfirm"
          @cancel="showPolitical = false" />
      </van-popup>
      <van-field v-if="showOtherGroup" v-model="answerForm.otherGroup" placeholder="在此输入您的党派"
        :rules="[{ required: showOtherGroup, message: '请填写您的党派' }]" />

      <div v-if="age >= 16">
        <div class="topic"><span class="red">*</span>9.您的最高文化程度为</div>
        <van-field v-model="answerForm.literacy" :rules="[{ required: true, message: '请选择您的最高文化程度' }]" readonly is-link
          placeholder="请选择" @click="showLiteracy = true" />
        <van-popup v-model:show="showLiteracy" round position="bottom">
          <van-picker title="文化程度" :columns="columnsLiteracy" @confirm="onLiteracyConfirm"
            @cancel="showLiteracy = false" />
        </van-popup>
      </div>
      <div v-if="showQ10 && age >= 16">
        <div class="topic"><span class="red">*</span>10.您的最高毕业院校</div>
        <van-field v-model="answerForm.school" placeholder="在此输入"
          :rules="[{ required: true, message: '在此输入您的最高毕业院校' }]" />
      </div>

      <div v-if="showQ11 && age >= 16">
        <div class="topic">
          <span class="red">*</span>11.您最高学历的毕业时间为
        </div>
        <van-field name="radio" v-model="answerForm.graduationStatus"
          :rules="[{ required: true, message: '请选择您的最高毕业时间' }]">
          <template #input>
            <van-radio-group v-model="answerForm.graduationStatus" direction="horizontal">
              <van-radio name="已毕业">已毕业</van-radio>
              <van-radio name="在读">在读</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 根据选择显示不同的日期选择器 -->
        <van-field v-if="answerForm.graduationStatus === '已毕业'" @click="showGraduationTime = true" is-link readonly
          placeholder="请选择您的最高毕业时间" v-model="answerForm.graduationTime" label="毕业时间"
          :rules="[{ required: true, message: '请选择您的最高毕业时间' }]">
        </van-field>
        <van-popup v-model:show="showGraduationTime" round position="bottom">
          <van-date-picker @confirm="onGraduationTimeConfirm" v-model="graduationDate"
            @cancel="showGraduationTime = false" title="选择毕业时间" :columns-type="columnsType" :min-date="minDate"
            :max-date="maxDate" />
        </van-popup>

        <van-field v-if="answerForm.graduationStatus === '在读'" @click="showEnrollmentTime = true" is-link readonly
          placeholder="请选择您的入学时间" v-model="answerForm.enrollmentTime" label="入学时间"
          :rules="[{ required: true, message: '请选择您的入学时间' }]">
        </van-field>
        <van-popup v-model:show="showEnrollmentTime" round position="bottom">
          <van-date-picker @confirm="onEnrollmentTimeConfirm" v-model="enrollmentDate"
            @cancel="showEnrollmentTime = false" title="选择入学时间" :columns-type="columnsType" :min-date="minDate"
            :max-date="maxDate" />
        </van-popup>
      </div>

      <div v-if="age >= 18">
        <div class="topic"><span class="red">*</span>12.您的婚姻状况</div>
        <van-field name="radio" v-model="answerForm.maritalStatus" :rules="[{ required: true, message: '请选择您的婚姻状况' }]">
          <template #input>
            <van-radio-group v-model="answerForm.maritalStatus" direction="horizontal">
              <van-radio name="已婚">已婚</van-radio>
              <van-radio name="未婚">未婚</van-radio>
              <van-radio name="离异">离异</van-radio>
              <van-radio name="丧偶">丧偶</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="topic"><span class="red">*</span>13.您是否服兵役？</div>
      <van-field name="radio" v-model="answerForm.armyServe" :rules="[{ required: true, message: '请选择是否服兵役' }]">
        <template #input>
          <van-radio-group v-model="answerForm.armyServe" direction="horizontal">
            <van-radio name="未服役">未服役</van-radio>
            <van-radio name="现役">现役</van-radio>
            <van-radio name="退伍">退伍</van-radio>
            <van-radio name="转业">转业</van-radio>
            <van-radio name="复员">复员</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div v-if="age >= 16">
        <div class="topic"><span class="red">*</span>14.您的职业是？</div>
        <van-field v-model="answerForm.occupation" :rules="[{ required: true, message: '请选择您的职业' }]" readonly is-link
          placeholder="请选择" @click="showOccupation = true" />
        <van-popup v-model:show="showOccupation" round position="bottom">
          <van-picker title="职业" :columns="columnsOccupation" @confirm="onOccupationConfirm"
            @cancel="onOccupationCancel" />
        </van-popup>
      </div>

      <div v-if="showQ15 && age >= 16">
        <div class="topic"><span class="red">*</span>15.您的职称/级别是</div>
        <van-field v-model="answerForm.rank" placeholder="在此输入您的职称/级别" :rules="[{ required: true, message: '在此输入' }]" />
      </div>
      <div class="topic">16.您曾经获奖项情况（镇级以上）</div>
      <div v-for="(prize, index) in answerForm.prize" :key="index">
        <div class="topic flex space-between">
          <div>奖项 {{ index + 1 }}</div>
          <van-button type="primary" plain icon="delete" size="mini" @click="removePrize(index)">
            删除
          </van-button>
        </div>
        <van-field v-model="prize.name" placeholder="在此输入奖项名称" :rules="[
          { required: true, message: '请输入奖项名称，没有获奖请删除此奖项' },
        ]" />
        <van-field v-model="prize.time" :rules="[
          { required: true, message: '请选择获奖时间，没有获奖请删除此奖项' },
        ]" is-link readonly placeholder="选择颁奖时间" @click="showDatePicker(index)" />
        <van-field v-model="prize.employer" :rules="[
          { required: true, message: '请输入颁奖单位，没有获奖请删除此奖项' },
        ]" placeholder="在此输入颁奖单位" />
      </div>
      <van-popup v-model:show="showPrizeTime" round position="bottom">
        <van-date-picker @cancel="showPrizeTime = false" @confirm="onPrizeTimeConfirm" v-model="currentPrizeDate"
          title="选择获奖日期" :columns-type="columnsType" :min-date="minDate" :max-date="maxDate" />
      </van-popup>
      <div class="van-cell">
        <van-button plain icon="plus" type="primary" block @click="addPrize">新增奖项</van-button>
      </div>
    </van-cell-group>

    <div style="margin: 16px">
      <van-button round block type="primary" @click="onSubmit">
        提交
      </van-button>
    </div>
  </van-form>

  <van-cell title="分享" @click="showShare = true" />
  <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
</template>
<script lang="ts" setup>
import { showToast } from "vant";
import type { FormInstance, ToastOptions } from "vant";
import type { DatePickerColumnType } from "vant";
import { createAnswerForm, Option, PrizeDetail } from "./form";
import {
  columnsOccupation,
  columnsPolitical,
  columnsLiteracy,
} from "./options";

const formRef = ref<FormInstance>();
const answerForm = createAnswerForm();
const route = useRoute();
const bookName = route.params.name.toString();
const bookId = route.params.id.toString();
const addressName = bookName.toString().replace("志", "");

console.log(bookId, bookName, addressName);
//毕业时间&入学时间
const showGraduationTime = ref(false); // 控制毕业时间选择器的显示
const showEnrollmentTime = ref(false); // 控制入学时间选择器的显示
const graduationDate = ref(["2010", "01"]);
const enrollmentDate = ref(["2020", "01"]);
const onGraduationTimeConfirm = () => {
  // 设置毕业时间
  answerForm.enrollmentTime = "";
  answerForm.graduationTime = graduationDate.value.toString();
  showGraduationTime.value = false;
};

const onEnrollmentTimeConfirm = () => {
  // 设置入学时间
  answerForm.graduationTime = "";
  answerForm.enrollmentTime = enrollmentDate.value.toString();
  showEnrollmentTime.value = false;
};
// 当用户改变毕业状态时，显示相应的日期选择器
watch(
  () => answerForm.graduationStatus,
  (newStatus) => {
    if (newStatus === "已毕业") {
      // 已毕业
      showGraduationTime.value = true;
      showEnrollmentTime.value = false;
    } else if (newStatus === "在读") {
      // 在读
      showEnrollmentTime.value = true;
      showGraduationTime.value = false;
    }
  },
);

// 奖项
const showPrizeTime = ref(false);
const currentPrizeDate = ref(["1988", "01"]);
const editingPrizeIndex = ref(0); // 当前编辑的奖项索引
const showDatePicker = (index: number) => {
  // 存储当前编辑的奖项索引
  editingPrizeIndex.value = index;
  // 显示日期选择器
  showPrizeTime.value = true;
};
const addPrize = () => {
  // 向奖项数组添加一个新的空奖项对象
  answerForm.prize!.push({
    name: "",
    time: "",
    employer: "",
  });
};
const removePrize = (index: number) => {
  answerForm.prize?.splice(index, 1);
};

const onPrizeTimeConfirm = () => {
  console.log("第几个奖项", editingPrizeIndex.value);
  console.log("这个奖项选了什么日期", currentPrizeDate.value.toString());
  // 更新当前编辑的奖项的时间
  if (
    answerForm.prize &&
    editingPrizeIndex.value !== null &&
    answerForm.prize[editingPrizeIndex.value]
  ) {
    answerForm.prize[editingPrizeIndex.value].time =
      currentPrizeDate.value.toString();
  }
  // 关闭日期选择器
  showPrizeTime.value = false;
};
// 出生年月
const showBirth = ref(false);
const currentBirthDate = ref(["1988", "01"]);
const columnsType: DatePickerColumnType[] = ["year", "month"];

const minDate = new Date(1900, 1);
const maxDate = new Date(2024, 1);
//计算年龄
const nowDate = new Date();
let age = ref(1);
const onBirthConfirm = () => {
  showBirth.value = false;
  answerForm.birthDate = currentBirthDate.value.toString();
  console.log(answerForm.birthDate);

  const [birthYear, birthMonth] = answerForm.birthDate.split(",");
  const parsedBirthYear = parseInt(birthYear, 10);
  const parsedBirthMonth = parseInt(birthMonth, 10);

  const currentYear = nowDate.getFullYear();
  const currentMonth = nowDate.getMonth() + 1;
  age.value = currentYear - parsedBirthYear;
  if (currentMonth < parsedBirthMonth) {
    age.value--;
  }
  console.log(age.value); // 输出年龄
};

const showQ10 = ref(false);
const showQ11 = ref(false);
const showQ15 = ref(false);

// 政治面貌
const showOtherGroup = ref(false);
const showPolitical = ref(false);

const onPoliticalConfirm = ({
  selectedOptions,
}: {
  selectedOptions: Option[];
}) => {
  showPolitical.value = false;
  console.log(selectedOptions);
  answerForm.political = selectedOptions[0].text;
  if (selectedOptions[0].needFilling) {
    showOtherGroup.value = true;
  }
};

// 文化程度
const showLiteracy = ref(false);

const onLiteracyConfirm = ({
  selectedOptions,
  // selectedValues,
}: {
  selectedOptions: Option[];
  // selectedValues: string[];
}) => {
  showLiteracy.value = false;
  console.log(selectedOptions);
  // showToast(`当前值: ${selectedValues.join(",")}`);
  answerForm.literacy = selectedOptions[0].text;

  showQ10.value = shouldShowQuestion(selectedOptions, "10");
  showQ11.value = shouldShowQuestion(selectedOptions, "11");
};

// 职业
const showOccupation = ref(false);

const onOccupationConfirm = ({
  selectedOptions,
  // selectedValues,
}: {
  selectedOptions: Option[];
  // selectedValues: string[];
}) => {
  showOccupation.value = false;
  console.log(selectedOptions);
  // showToast(`当前值: ${selectedValues.join(",")}`);
  answerForm.occupation = selectedOptions[0].text;
  showQ15.value = shouldShowQuestion(selectedOptions, "15");
};
const onOccupationCancel = () => {
  showOccupation.value = false;
  showToast("取消");
};
const onSubmit = () => {
  console.log(answerForm);
  const answerFormCopy = { ...answerForm }; // 创建一个非响应式副本
  console.log(answerFormCopy);
  cleanEmptyProperties(answerFormCopy); // 清理副本
  const transformedResult = transformData(answerFormCopy);

  console.log(transformedResult); // 现在可以安全地发送到后端
  formRef.value
    ?.validate()
    .then(() => {
      // 验证通过的逻辑
      console.log("表单验证通过");
    })
    .catch((errors) => {
      // 验证未通过的逻辑
      console.log("表单验证未通过", errors);
    });
};





// 是否展示问题函数
function shouldShowQuestion(selectedOptions: Option[], questionCode: string) {
  return !(
    selectedOptions[0] &&
    selectedOptions[0].skip &&
    selectedOptions[0].skip.includes(questionCode)
  );
}
// 清除没有答案的字段
function cleanEmptyProperties(obj: { [key: string]: any }) {
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

// 修改发送数据的格式
const transformData = (data) => {
  const transformed = {
    book_name: bookName,
    book_id: bookId,
    questions: []   // 用于存储问题和答案
  };

  // 定义一个映射，将原始数据的键映射到问题 ID
  const keyToQuestionIdMap = {
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

  // 遍历原始数据
  for (const key in data) {
    if (data.hasOwnProperty(key) && !['prize', 'otherGroup', 'graduationTime', 'enrollmentTime'].includes(key)) {
      let questionEntry = {
        question_id: keyToQuestionIdMap[key],
        answer: data[key]
      };
      // 特殊处理政治面貌和毕业情况
      if (key === 'political' && data.otherGroup) {
        questionEntry.answer_info = data.otherGroup;
      } else if (key === 'graduationStatus') {
        if (data.graduationTime) {
          questionEntry.answer_info = data.graduationTime;
        } else if (data.enrollmentTime) {
          questionEntry.answer_info = data.enrollmentTime;
        }
      }

      transformed.questions.push(questionEntry);
    }
  }

  // 特殊处理奖项
  if (data.prize !== undefined && data.prize) {
    const prizeAnswers = data.prize.map(prize => ({
      name: prize.name,
      time: prize.time,
      employer: prize.employer
    }));
    transformed.questions.push({
      question_id: 15,
      answer: prizeAnswers
    });
  }

  return transformed;
};




// 分享
const showShare = ref(false);
const options = [
  { name: "微信", icon: "wechat" },
  { name: "微博", icon: "weibo" },
  { name: "复制链接", icon: "link" },
];

const onSelect = (option: { name: string | ToastOptions | undefined }) => {
  showToast(option.name);
  showShare.value = false;
};
</script>
<style lang="scss" scoped>
.van-cell-group {
  background-color: rgba(255, 255, 255, 0.9);
}

.van-cell {
  background-color: rgba(255, 255, 255, 0);
}
</style>
