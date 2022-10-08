<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共{{ total }}条记录</span>
          <el-button icon="el-icon-plus" size="small" type="primary" round @click="openDrawer('add')">
            添加面经
          </el-button>
        </div>
      </template>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column prop="stem" label="标题" width="400"></el-table-column>
        <el-table-column prop="creator" label="作者"></el-table-column>
        <el-table-column prop="likeCount" label="点赞"></el-table-column>
        <el-table-column prop="views" label="浏览数"></el-table-column>
        <el-table-column prop="createdAt" label="更新时间" width="200"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-view" @click="openDrawer('preview', row.id)"></i>
              <i class="el-icon-edit-outline" @click="openDrawer('edit', row.id)"></i>
              <i class="el-icon-delete" @click="del(row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @current-change="handleCurrentChange" :current-page="current" :page-size="pageSize" layout="prev, pager, next" :total="total">
      </el-pagination>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer direction="rtl" size="50%" :title="drawerTitle" :visible.sync="isShowDrawer" :before-close="handleClose">
      <!-- 预览 -->
      <div v-if="drawerType === 'preview'" class="article-preview">
        <h5>{{ form.stem }}</h5>
        <!-- 富文本编辑器是带标签的 不能{{form.content}} -->
        <div v-html="form.content"></div>
      </div>
      <el-form v-else ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem" placeholder="输入面经标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- 富文本编辑器 -->
          <quill-editor v-model="form.content" @blur="handleBlur"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  getArticleList,
  createArticle,
  removeArticle,
  getArticleDetail,
  updateArticle
} from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data () {
    return {
      list: [],
      current: 1, // 当前页
      pageSize: 10, // 每页多少条
      total: 0, // 总条数
      isShowDrawer: false, // 抽屉
      drawerType: 'add', // 抽屉类型
      form: {
        stem: '', // 名称
        content: '' // 富文本编辑器内容
      },
      rules: {
        stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  async created () {
    this.initData()
  },
  computed: {
    drawerTitle () {
      let title = '默认标题'
      if (this.drawerType === 'add') title = '添加面经'
      if (this.drawerType === 'preview') title = '面经预览'
      if (this.drawerType === 'edit') title = '修改面经'
      return title
    }
  },
  methods: {
    // 获取数据
    async initData () {
      const { data } = await getArticleList({
        current: this.current,
        pageSize: this.pageSize
      })
      this.list = data.rows
      this.total = data.total
    },
    // val可以获取到最新的当前页
    handleCurrentChange (val) {
      this.current = val
      this.initData()
    },
    // 操作
    async openDrawer (type, id) {
      this.isShowDrawer = true
      this.drawerType = type
      // 修改或预览
      if (type !== 'add') {
        const res = await getArticleDetail(id)
        this.form = {
          // stem:res.data.stem,
          // content.res.data.content
          ...res.data
        }
      }
    },
    // 关闭抽屉
    handleClose () {
      this.isShowDrawer = false
      // 只要是添加 ｜ 修改 都需要校验表单(预览不需要)
      if (this.drawerType !== 'preview') {
        this.$refs.form.resetFields()
      }
      // 关闭抽屉式,清空内容
      this.form = { stem: '', content: '' }
    },
    // 富文本编辑器失去焦点
    handleBlur () {
      // 只对富文本编辑器进行校验
      this.$refs.form.validateField()
    },
    // 添加抽屉的表单检验
    async submit () {
      try {
        await this.$refs.form.validate()
        if (this.drawerType === 'add') {
          await createArticle(this.form)
          this.$message.success('添加成功')
        }
        if (this.drawerType === 'edit') {
          const { id, stem, content } = this.form
          await updateArticle({ id, stem, content })
          this.$message.success('修改成功')
        }
        this.current = 1
        this.handleClose()
        this.initData()
      } catch (error) {
        console.log(error)
      }
    },
    // 删除
    async del (id) {
      await removeArticle(id)
      this.$message.success('删除成功')
      this.initData()
    },
    // 抽屉取消按钮
    close () {
      this.isShowDrawer = false
      this.form = { stem: '', content: '' }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
