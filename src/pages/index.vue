<template>
  <router-view />
  <!-- <van-cell-group inset v-for="(question, index) in questionList" :key="index">
      <div v-if="question.type === 'fill-in'">
        <div class="topic">{{ index + 1 }}.{{ question.question }}</div>
        <van-field v-model="question.answer" placeholder="在此输入" :rules="[{ required: true, message: '请填写您的姓氏' }]" />
      </div>

      <div v-else-if="question.type === 'date-select'">
        <div class="topic">{{ index + 1 }}.{{ question.question }}</div>
        <van-field v-model="birthValue" :rules="[{ required: true, message: '请选择您的出生年月' }]" is-link readonly
          placeholder="选择出生年月" @click="showBirth = true" />
        <van-popup v-model:show="showBirth" round position="bottom">
          <van-date-picker @cancel="showBirth = false" @confirm="onBirthConfirm" v-model="currentDate" title="选择日期"
            :columns-type="columnsType" :min-date="minDate" :max-date="maxDate" />
        </van-popup>
      </div>
      <div v-else-if="question.type === 'choice'">
        <div class="topic">{{ index + 1 }}.{{ question.question }}</div>
        <van-field name="radio" :rules="[{ required: true, message: '请确认您的户籍' }]">
          <template #input>
            <van-radio-group v-model="censusChecked" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
    </van-cell-group> -->
</template>
<script setup lang="ts">
// const questionList = [
//   {
//     "id": '1',
//     "type": "fill-in",
//     "keyword": "familyName",
//     "question": "您的姓名",
//     "answer": ""
//   },
//   {
//     "id": '1',
//     "type": "choice",
//     "question": `您的户籍是否为${addressName}`,
//     "options": ["男", "女", "其他"],
//     "answer": ""
//   },
//   {
//     "id": '1',
//     "type": "choice",
//     "question": "您的性别",
//     "options": ["男", "女", "其他"],
//     "answer": ""
//   },
//   {
//     "id": '1',
//     "type": "date-select",
//     "question": "您的出生日期",
//     "answer": ""
//   },
//   {
//     "id": '1',
//     "type": "choice",
//     "question": "您的婚姻状况",
//     "options": ["未婚", "已婚", "离异", "丧偶"],
//     "answer": ""
//   },
//   // ... 其他问题 ...
// ]
</script>
<style scoped></style>
