<template>
  <div class="login-page">
    <el-card>
      <!-- header插槽 -->
      <template #header>后台管理系统</template>
      <!-- 默认插槽 -->
      <el-form autocomplete="off" :model="form" :rules="rules" ref="myForm">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="primary" @click="clickLogin">登陆</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      form: {
        username: 'admin8',
        password: 'admin'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入账户名称',
            trigger: ['change', 'blur']
          },
          {
            min: 5,
            max: 11,
            message: '长度必须是5-11位',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
          },
          {
            pattern: /^\w{5,11}$/,
            message: '请输入5-11位的字符',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    // 登陆
    async clickLogin () {
      try {
        await this.$refs.myForm.validate() // 返回的是一个Promise
        // 校验通过
        const res = await login(this.form) // 请求登陆
        // 登陆成功
        // 存储Vuex并且本地存储
        this.$store.commit('user/setUserToken', res.data.token)
        this.$router.push('/')
        // 路由跳转
      } catch (error) {
        console.log(error)
      }
    },
    // 重置
    reset () {
      this.$refs.myForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(~@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
