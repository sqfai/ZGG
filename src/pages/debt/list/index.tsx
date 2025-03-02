import { Card, Table, Tag, Button, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DebtRecord {
  id: string
  debtorName: string
  amount: number
  dueDate: string
  status: 'pending' | 'overdue' | 'completed'
  description: string
}

const DebtList = () => {
  // TODO: 从后端获取债权列表数据
  const debtList: DebtRecord[] = []

  const columns: ColumnsType<DebtRecord> = [
    {
      title: '债务人',
      dataIndex: 'debtorName',
      key: 'debtorName'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span>¥ {amount.toLocaleString()}</span>
      )
    },
    {
      title: '到期日期',
      dataIndex: 'dueDate',
      key: 'dueDate'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: DebtRecord['status']) => {
        const statusConfig = {
          pending: { color: 'blue', text: '进行中' },
          overdue: { color: 'red', text: '已逾期' },
          completed: { color: 'green', text: '已完成' }
        }
        return (
          <Tag color={statusConfig[status].color}>
            {statusConfig[status].text}
          </Tag>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            message.info('功能开发中')
          }}
        >
          查看详情
        </Button>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <Card title="我的债权">
        <Table
          columns={columns}
          dataSource={debtList}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>
    </div>
  )
}

export default DebtList