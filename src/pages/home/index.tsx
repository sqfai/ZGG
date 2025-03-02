import { Card, Row, Col, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Home = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 48, fontSize: '2.5em', fontWeight: 600 }}>
            债光光 - 专业的债权管理平台
          </Title>
        </Col>
    
        {/* 债权管理服务 */}
        <Col xs={24} md={12}>
          <Card
            hoverable
            className="service-card"
            style={{
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div style={{ padding: 32, background: '#f5f5f5', textAlign: 'center', marginBottom: 24 }}>
              <img
                src="/images/debt-management.svg"
                alt="债权管理"
                style={{ width: '200px', height: '200px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: '0 24px' }}>
              <Title level={3} style={{ marginBottom: 16, fontSize: '1.5em', textAlign: 'center' }}>债权管理服务</Title>
              <Paragraph style={{ fontSize: '1.1em', marginBottom: 16, textAlign: 'center' }}>
                提供专业的债权登记、管理和追讨服务，帮助您高效处理债权事务。
              </Paragraph>
              <ul style={{ fontSize: '1.1em', marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>便捷的债权登记系统</li>
                <li style={{ marginBottom: 8 }}>多样化的追讨方案</li>
                <li style={{ marginBottom: 8 }}>实时状态跟踪</li>
                <li style={{ marginBottom: 8 }}>专业的法律支持</li>
              </ul>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate('/debt/register')}
                style={{ height: 48, fontSize: '1.1em', marginTop: 'auto' }}
              >
                立即登记债权
              </Button>
            </div>
          </Card>
        </Col>
    
        {/* 法律服务 */}
        <Col xs={24} md={12}>
          <Card
            hoverable
            className="service-card"
            style={{
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div style={{ padding: 32, background: '#f5f5f5', textAlign: 'center', marginBottom: 24 }}>
              <img
                src="/images/legal-service.svg"
                alt="法律服务"
                style={{ width: '200px', height: '200px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: '0 24px' }}>
              <Title level={3} style={{ marginBottom: 16, fontSize: '1.5em', textAlign: 'center' }}>专业法律服务</Title>
              <Paragraph style={{ fontSize: '1.1em', marginBottom: 16, textAlign: 'center' }}>
                汇聚优秀律师资源，为您提供专业的法律咨询和服务。
              </Paragraph>
              <ul style={{ fontSize: '1.1em', marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>经验丰富的律师团队</li>
                <li style={{ marginBottom: 8 }}>一对一法律咨询</li>
                <li style={{ marginBottom: 8 }}>全程法律支持</li>
                <li style={{ marginBottom: 8 }}>高效解决方案</li>
              </ul>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate('/lawyer/register')}
                style={{ height: 48, fontSize: '1.1em', marginTop: 'auto' }}
              >
                律师入驻
              </Button>
            </div>
          </Card>
        </Col>
    
        {/* 平台优势 */}
        <Col span={24}>
          <Card style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 48, fontSize: '2em' }}>
              平台优势
            </Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={<div style={{ fontSize: '1.3em', fontWeight: 600 }}>专业可靠</div>}
                  style={{ height: '100%', textAlign: 'center' }}
                  className="feature-card"
                >
                  <Paragraph style={{ fontSize: '1.1em' }}>
                    拥有专业的法律团队和完善的服务体系，确保您的债权得到有效保护。
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={<div style={{ fontSize: '1.3em', fontWeight: 600 }}>高效便捷</div>}
                  style={{ height: '100%', textAlign: 'center' }}
                  className="feature-card"
                >
                  <Paragraph style={{ fontSize: '1.1em' }}>
                    智能化的管理系统，让债权登记、追讨流程更加简单高效。
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  title={<div style={{ fontSize: '1.3em', fontWeight: 600 }}>安全合规</div>}
                  style={{ height: '100%', textAlign: 'center' }}
                  className="feature-card"
                >
                  <Paragraph style={{ fontSize: '1.1em' }}>
                    严格遵守相关法律法规，保护您的合法权益和隐私安全。
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home