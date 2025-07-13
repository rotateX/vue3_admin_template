<template>
  <!-- 栅栏 -->
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
          <h1>Hello</h1>
          <h2>欢迎</h2>
          <el-form-item prop="username">
            <el-input v-model.trim="form.username" :maxlength="24" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              :maxlength="24"
              type="password"
              :prefix-icon="Lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="login-btn" @click="handleSub">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import useUserStore from '@/store/modules/user'
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { debounce } from 'lodash-es'
import { getTimeStr } from '@/utils/time'

const router = useRouter()
const useUser = useUserStore()
const loading = ref(false)
// 添加表单实例引用
const formRef = ref<FormInstance>()

const form = reactive<loginForm>({
  username: '',
  password: '',
})

const validateUsername = (rule: any, value: any, callback: any) => {
  /*
  rule 校验规则对象
  value 表单元素文本内容
  callback 如果符合条件callback放行通过
  如果不符合条件 调用callback  注入错误提示信息
  */
  /*
if (/^\d{5,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
    */

  console.log(rule)

  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}

const rules = reactive<FormRules>({
  username: [
    // { required: true, message: '请输入用户名', trigger: 'blur' },
    // { min: 3, max: 24, message: '用户名长度在3-24个字符', trigger: 'blur' },
    { trigger: 'blur', validator: validateUsername },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 24, message: '密码长度在6-24个字符', trigger: 'blur' },
  ],
})

const handleLogin = async () => {
  // 添加表单验证
  if (!formRef.value) return

  await formRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      useUser
        .userLogin(form)
        .then(data => {
          if (data !== 'success') {
            ElNotification({
              type: 'error',
              message: '登录失败',
            })
            return
          }
          ElNotification({
            type: 'success',
            message: '登录成功',
            title: getTimeStr(),
          })
          router.push('/')
        })
        .catch(error => {
          ElNotification({
            type: 'error',
            message: error,
          })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleSub = debounce(handleLogin, 500)
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 24px;
    h1 {
      font-size: 40px;
      color: #fff;
    }
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
