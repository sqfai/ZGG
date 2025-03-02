import { useEffect, useState } from 'react'
import { Card, Table, Tag, Button, Modal, Form, Input, message, Alert, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import type { DebtInfo } from '../../types/debt'
import { DebtProcessingMethod } from '../../types/debt'

// 处理详情表单接口
interface ProcessForm {
  comment: string
  solution: string
}

// 法律法规内容
const legalGuidelines = [
  '催收人员应当遵守法律法规，不得采取暴力、恐吓、侮辱、诽谤、骚扰等方式进行催收。',
  '催收人员应当明确告知借款人本人其身份、所代表的机构和催收依据。',
  '催收人员不得对借款人以外的第三人实施催收行为。',
  '催收时间应当在早8时至晚20时之间，法律法规另有规定的除外。',
  '催收过程中应当尊重借款人的隐私权，不得泄露借款人的个人信息。',
  '催收人员应当客观真实地表达催收事项，不得夸大事实或者虚构后果。',
  '催收人员不得以虚假信息或者其他欺骗手段误导借款人。',
  '催收人员应当保存催收过程中的通话记录、信息记录等资料。'
]

const Bounty = () => {
  const location = useLocation()
  const [debtList, setDebtList] = useState<DebtInfo[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<DebtInfo | null>(null)
  const [form] = Form.useForm<ProcessForm>()
  const [currentGuidelineIndex, setCurrentGuidelineIndex] = useState(0)

  // 处理新增的债权信息
  useEffect(() => {
    if (location.state?.debtInfo) {
      const newDebt: DebtInfo = {
        ...location.state.debtInfo,
        processingMethod: DebtProcessingMethod.BOUNTY,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setDebtList(prev => [...prev, newDebt])
    }
  }, [location.state])

  // 滚动展示法律法规
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGuidelineIndex(prev => (prev + 1) % legalGuidelines.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
      render: () => <Tag color="warning">悬赏中</Tag>
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
    <div style={{ padding: 24, maxWidth: 1600, margin: '0 auto' }}>
      <Alert
        message="合规悬赏提示"
        description={
          <div>
            <p>请遵守以下合规要求：</p>
            <ol>
              <li>严禁发布任何涉及暴力、威胁、骚扰等违法内容</li>
              <li>不得泄露债务人或相关人员的个人隐私信息</li>
              <li>悬赏金额必须合理，不得超出法律规定范围</li>
              <li>催收行为必须在法律允许的时间和方式内进行</li>
            </ol>
          </div>
        }
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Card title="悬赏令" style={{ flex: '1 1 800px', minWidth: 0, height: 'calc(100vh - 200px)' }}>
          <p>这里将展示债权相关的悬赏信息，帮助您更快地找到债务人。</p>
          <Table
            dataSource={debtList}
            columns={columns}
            rowKey={record => `${record.debtorName}-${record.amount}-${record.createdAt.getTime()}`}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 'calc(100vh - 350px)' }}
            sticky
          />
        </Card>

        <div style={{ flex: '0 0 300px' }}>
          <Card
            title="法律法规公告"
            extra={<Typography.Text type="secondary">自动滚动</Typography.Text>}
            style={{ marginBottom: 24 }}
          >
            <div style={{ height: 200, overflow: 'hidden' }}>
              <div
                style={{
                  transition: 'opacity 0.5s',
                  padding: '16px 0'
                }}
              >
                {legalGuidelines[currentGuidelineIndex]}
              </div>
            </div>
          </Card>

          <Card
            title="悬赏奖励政策"
            extra={<Typography.Text type="secondary">奖励规则</Typography.Text>}
          >
            <ul style={{ paddingLeft: 16, marginBottom: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <strong>初级悬赏</strong>
                <div>奖励金额：¥100-1000</div>
                <div>适用于小额债务的线索提供</div>
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>中级悬赏</strong>
                <div>奖励金额：¥1000-5000</div>
                <div>适用于有效债务人信息提供</div>
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>高级悬赏</strong>
                <div>奖励金额：¥5000以上</div>
                <div>适用于成功协助追回债务</div>
              </li>
              <li>
                <strong>特别奖励</strong>
                <div>额外奖金：回收金额的1-5%</div>
                <div>适用于大额债务成功追回</div>
              </li>
            </ul>
          </Card>
        </div>
      </div>

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
    </div>
  )
}

export default Bounty