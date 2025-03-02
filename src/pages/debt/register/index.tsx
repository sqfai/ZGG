import { Card, Form, Input, InputNumber, DatePicker, Button, message, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

// 债权登记表单接口定义
interface DebtRegisterForm {
  debtorName: string
  amount: number
  dueDate: Date
  description: string
}

// 债权登记组件
const DebtRegister = () => {
  const navigate = useNavigate()

  // 处理债权登记表单提交
  const handleSubmit = async (values: DebtRegisterForm) => {
    try {
      // TODO: 实现债权登记逻辑
      message.success('债权登记成功')
      // 显示处理方式选择模态框
      Modal.confirm({
        title: '选择处理方式',
        content: '请选择您希望的债权处理方式',
        okText: '法律服务处理',
        cancelText: '悬赏令处理',
        onOk: () => {
          // 跳转到法律力量页面
          navigate('/legal-force', { state: { debtInfo: values } })
        },
        onCancel: () => {
          // 跳转到悬赏令页面
          navigate('/bounty', { state: { debtInfo: values } })
        }
      })
    } catch (error) {
      message.error('债权登记失败')
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title="债权登记">
        {/* 债权登记表单 */}
        <Form
          name="debtRegister"
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          {/* 债务人姓名输入框 */}
          <Form.Item
            label="债务人姓名"
            name="debtorName"
            rules={[{ required: true, message: '请输入债务人姓名' }]}
          >
            <Input placeholder="请输入债务人姓名" />
          </Form.Item>

          {/* 债权金额输入框，支持千分位格式化 */}
          <Form.Item
            label="债权金额"
            name="amount"
            rules={[{ required: true, message: '请输入债权金额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入债权金额"
              min={0}
              precision={2}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\¥\s?|(,*)/g, '')}
            />
          </Form.Item>

          {/* 到期日期选择器 */}
          <Form.Item
            label="到期日期"
            name="dueDate"
            rules={[{ required: true, message: '请选择到期日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* 债权描述文本框 */}
          <Form.Item
            label="债权描述"
            name="description"
            rules={[{ required: true, message: '请输入债权描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请详细描述债权情况" />
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default DebtRegister