import { useEffect, useState } from 'react'
import { Card, Table, Tag, Button, Modal, Form, Input, message } from 'antd'
import { useLocation } from 'react-router-dom'
import type { DebtInfo } from '../../types/debt'
import { DebtProcessingMethod } from '../../types/debt'

// 处理详情表单接口
interface ProcessForm {
  comment: string
  solution: string
}

const LegalForce = () => {
  const location = useLocation()
  const [debtList, setDebtList] = useState<DebtInfo[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<DebtInfo | null>(null)
  const [form] = Form.useForm<ProcessForm>()

  // 处理新增的债权信息
  useEffect(() => {
    if (location.state?.debtInfo) {
      const newDebt: DebtInfo = {
        ...location.state.debtInfo,
        processingMethod: DebtProcessingMethod.LEGAL_FORCE,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setDebtList(prev => [...prev, newDebt])
    }
  }, [location.state])

  // 处理债权
  const handleProcess = async (values: ProcessForm) => {
    try {
      // TODO: 实现处理债权的逻辑，例如调用API保存处理结果
      message.success('处理成功')
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('处理失败')
    }
  }

  // 打开处理对话框
  const showProcessModal = (debt: DebtInfo) => {
    setSelectedDebt(debt)
    setIsModalVisible(true)
  }

  // 表格列配置
  const columns = [
    {
      title: '债务人',
      dataIndex: 'debtorName',
      key: 'debtorName'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '到期日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: Date) => new Date(date).toLocaleDateString()
    },
    {
      title: '状态',
      key: 'status',
      render: () => <Tag color="processing">处理中</Tag>
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DebtInfo) => (
        <Button type="primary" onClick={() => showProcessModal(record)}>
          处理
        </Button>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <Card title="法律服务">
        <p>这里将展示专业的法律服务资源，帮助您更好地处理债权纠纷。</p>
        <Table
          dataSource={debtList}
          columns={columns}
          rowKey={record => `${record.debtorName}-${record.amount}-${record.createdAt.getTime()}`}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 400 }}
          sticky
        />

        {/* 处理详情对话框 */}
        <Modal
          title="债权处理"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleProcess}
            layout="vertical"
          >
            <Form.Item
              name="comment"
              label="处理意见"
              rules={[{ required: true, message: '请输入处理意见' }]}
            >
              <Input.TextArea rows={4} placeholder="请输入您的处理意见" />
            </Form.Item>

            <Form.Item
              name="solution"
              label="解决方案"
              rules={[{ required: true, message: '请输入解决方案' }]}
            >
              <Input.TextArea rows={4} placeholder="请输入具体的解决方案" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  )
}

export default LegalForce