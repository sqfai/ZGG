import { Card, Form, Input, Select, InputNumber, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import type { LawyerInfo } from '../../../types/lawyer'
import { LawyerSpecialty, LawyerStatus } from '../../../types/lawyer'

const { Option } = Select

// 律师注册组件
const LawyerRegister = () => {
  // 处理表单提交
  const handleSubmit = async (values: Omit<LawyerInfo, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/lawyer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('注册申请提交失败')
      }

      message.success('注册申请提交成功，请等待审核')
    } catch (error) {
      message.error('注册申请提交失败：' + (error instanceof Error ? error.message : '未知错误'))
    }
  }

  // 头像上传前的校验
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片！')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB！')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title="律师入驻">
        <Form
          name="lawyerRegister"
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            gender: '男',
            specialties: [LawyerSpecialty.DEBT_COLLECTION]
          }}
        >
          {/* 基本信息 */}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="头像"
            name="avatar"
            valuePropName="fileList"
          >
            <Upload
              maxCount={1}
              listType="picture-card"
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>上传头像</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>

          {/* 联系方式 */}
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[{ required: true, message: '请输入手机号码' }]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          {/* 执业信息 */}
          <Form.Item
            label="执业证号"
            name="licenseNumber"
            rules={[{ required: true, message: '请输入执业证号' }]}
          >
            <Input placeholder="请输入执业证号" />
          </Form.Item>

          <Form.Item
            label="所属律所"
            name="firm"
            rules={[{ required: true, message: '请输入所属律所' }]}
          >
            <Input placeholder="请输入所属律所" />
          </Form.Item>

          <Form.Item
            label="执业地区"
            name="location"
            rules={[{ required: true, message: '请输入执业地区' }]}
          >
            <Input placeholder="请输入执业地区" />
          </Form.Item>

          <Form.Item
            label="专业领域"
            name="specialties"
            rules={[{ required: true, message: '请选择专业领域' }]}
          >
            <Select mode="multiple" placeholder="请选择专业领域">
              {Object.entries(LawyerSpecialty).map(([key, value]) => (
                <Option key={key} value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="执业年限"
            name="experience"
            rules={[{ required: true, message: '请输入执业年限' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="个人简介"
            name="description"
            rules={[{ required: true, message: '请输入个人简介' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入个人简介" />
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交申请
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LawyerRegister