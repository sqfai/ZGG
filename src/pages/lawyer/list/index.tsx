import { useState } from 'react'
import { Card, Row, Col, Avatar, Tag, Button, Modal, Descriptions, message, Input, Select, Space } from 'antd'
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import type { LawyerInfo } from '../../../types/lawyer'
import { LawyerStatus, LawyerSpecialty } from '../../../types/lawyer'

const { Option } = Select

const LawyerList = () => {
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerInfo | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<LawyerSpecialty | ''>('')
  const [selectedLocation, setSelectedLocation] = useState('')

  // 从后端获取律师列表数据
  const [lawyers] = useState<LawyerInfo[]>([
    {
      id: '1',
      name: '沈权峰',
      avatar: '', // 头像URL
      gender: '男',
      phone: '025-12345678',
      email: 'sqf@example.com',
      licenseNumber: 'JS20080123',
      firm: '江苏沈权峰律师事务所',
      location: '江苏省南京市',
      experience: 15,
      specialties: [LawyerSpecialty.DEBT_COLLECTION],
      description: '沈权峰律师从业15年，专注于债权债务、合同纠纷等领域的法律服务。曾成功办理多起重大债权纠纷案件，具有丰富的诉讼经验和债权处理能力。',
      status: LawyerStatus.APPROVED,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  // 显示律师详情
  const showLawyerDetail = (lawyer: LawyerInfo) => {
    setSelectedLawyer(lawyer)
    setIsModalVisible(true)
  }

  // 联系律师
  const handleContact = (lawyer: LawyerInfo) => {
    message.success(`正在为您联系${lawyer.name}律师`)
  }

  // 筛选律师列表
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchSearch = lawyer.name.includes(searchText) ||
      lawyer.firm.includes(searchText) ||
      lawyer.description.includes(searchText)
    const matchSpecialty = !selectedSpecialty || lawyer.specialties.includes(selectedSpecialty)
    const matchLocation = !selectedLocation || lawyer.location.includes(selectedLocation)
    return matchSearch && matchSpecialty && matchLocation
  })

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="找律师"
        extra={
          <Space size="large">
            <Input
              placeholder="搜索律师姓名/律所"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              onChange={e => setSearchText(e.target.value)}
            />
            <Select
              placeholder="专业领域"
              style={{ width: 150 }}
              allowClear
              onChange={value => setSelectedSpecialty(value)}
            >
              {Object.entries(LawyerSpecialty).map(([key, value]) => (
                <Option key={key} value={value}>{value}</Option>
              ))}
            </Select>
            <Select
              placeholder="执业地区"
              style={{ width: 150 }}
              allowClear
              onChange={value => setSelectedLocation(value)}
            >
              <Option value="江苏省南京市">南京市</Option>
              <Option value="浙江省杭州市">杭州市</Option>
              <Option value="上海市">上海市</Option>
            </Select>
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          {filteredLawyers.map(lawyer => (
            <Col key={lawyer.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ height: '100%' }}
                cover={
                  <div style={{ padding: 24, textAlign: 'center', background: '#f0f7ff' }}>
                    <Avatar
                      size={100}
                      src={lawyer.avatar}
                      icon={<UserOutlined />}
                    />
                  </div>
                }
                actions={[
                  <Button key="detail" type="link" onClick={() => showLawyerDetail(lawyer)}>
                    查看详情
                  </Button>,
                  <Button key="contact" type="link" onClick={() => handleContact(lawyer)}>
                    联系律师
                  </Button>
                ]}
              >
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{lawyer.name}</span>
                      <Tag color={lawyer.status === LawyerStatus.APPROVED ? 'success' : 'warning'}>
                        {lawyer.status}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <p>{lawyer.firm}</p>
                      <p>执业年限：{lawyer.experience}年</p>
                      <div style={{ marginTop: 8 }}>
                        {lawyer.specialties.map(specialty => (
                          <Tag key={specialty} style={{ marginBottom: 4 }}>{specialty}</Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* 律师详情模态框 */}
        <Modal
          title="律师详细信息"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="contact" type="primary" onClick={() => selectedLawyer && handleContact(selectedLawyer)}>
              联系律师
            </Button>
          ]}
          width={700}
        >
          {selectedLawyer && (
            <Descriptions column={2}>
              <Descriptions.Item label="姓名">{selectedLawyer.name}</Descriptions.Item>
              <Descriptions.Item label="性别">{selectedLawyer.gender}</Descriptions.Item>
              <Descriptions.Item label="执业证号">{selectedLawyer.licenseNumber}</Descriptions.Item>
              <Descriptions.Item label="所属律所">{selectedLawyer.firm}</Descriptions.Item>
              <Descriptions.Item label="执业地区">
                <EnvironmentOutlined /> {selectedLawyer.location}
              </Descriptions.Item>
              <Descriptions.Item label="联系电话">
                <PhoneOutlined /> {selectedLawyer.phone}
              </Descriptions.Item>
              <Descriptions.Item label="电子邮箱">
                <MailOutlined /> {selectedLawyer.email}
              </Descriptions.Item>
              <Descriptions.Item label="执业年限">{selectedLawyer.experience}年</Descriptions.Item>
              <Descriptions.Item label="专业领域" span={2}>
                {selectedLawyer.specialties.map(specialty => (
                  <Tag key={specialty} style={{ marginBottom: 4 }}>{specialty}</Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="个人简介" span={2}>
                {selectedLawyer.description}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  )
}

export default LawyerList