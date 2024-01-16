<template>
  <div>
    <p class="title">欢迎来到XXX的问卷调查</p>
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="xingshi" label="1.您的姓氏" placeholder="在此输入" />
      <van-field v-model="mingzi" label="2.您的名字" placeholder="在此输入" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        v-model="birthValue"
        is-link
        readonly
        label="3.您的出生年月"
        placeholder="选择出生年月"
        @click="showBirth = true"
      />
      <van-popup v-model:show="showBirth" round position="bottom">
        <van-date-picker
          @cancel="showBirth = false"
          @confirm="onBirthConfirm"
          v-model="currentDate"
          title="选择日期"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>

      <van-field name="radio" label="4.您户籍是否为xx地">
        <template #input>
          <van-radio-group v-model="censusChecked" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="5.您祖籍是否为本地">
        <template #input>
          <van-radio-group v-model="ancestralChecked" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="6.您的性别">
        <template #input>
          <van-radio-group v-model="genderhecked" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field v-model="wenhua" label="9.您的最高文化程度为" />
      <van-field
        v-model="wenhua"
        readonly
        is-link
        label="13.您的职业是？（年龄少于16不显示）"
        @click="showOccupation = true"
      />
      <van-popup v-model:show="showOccupation" round position="bottom">
        <van-picker
          title="职业"
          :columns="columnsOccupation"
          @confirm="onOccupationConfirm"
          @cancel="onOccupationCancel"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>
<script lang="ts" setup>
// import DatePicker from './components/DatePicker';
import { showToast } from "vant";
const wenhua = ref("");
const mingzi = ref("");
const xingshi = ref("");

const showBirth = ref(false);
const birthValue = ref<string>("");
const currentDate = ref(["2021", "01"]);

const minDate = new Date(2000, 0, 1);
const maxDate = new Date("2020 /01 /01");
const onBirthConfirm = () => {
  showBirth.value = false;
  birthValue.value = currentDate.value.toString();
  console.log(birthValue.value);
};

//户籍
const censusValue = ref("");
const censusChecked = ref("1");

// 祖籍
const ancestralChecked = ref("");

// 性别
const genderhecked = ref("");

// 职业
const showOccupation = ref(false);
const columnsOccupation = [
  { text: "公职人员", id: "1", jumpTo: "14" },
  { text: "教师", id: "2", jumpTo: "14" },
  { text: "科技人员", id: "3", jumpTo: "15" },
  { text: "企业负责人", id: "4", jumpTo: "14" },
  { text: "外出干部", id: "5", jumpTo: "14" },
  { text: "其他", id: "6", jumpTo: "15" },
];
const onOccupationConfirm = ({
  selectedValues,
}: {
  selectedValues: string[];
}) => {
  showOccupation.value = false;
  showToast(`当前值: ${selectedValues.join(",")}`);
};
const onOccupationCancel = () => {
  showOccupation.value = false;
  showToast("取消");
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 50px;
  text-align: center;
}
</style>
