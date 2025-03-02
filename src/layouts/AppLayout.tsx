import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd'
import {
  HomeOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  MoneyCollectOutlined,
  GiftOutlined,
  ShoppingOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'

const { Header, Content } = Layout

// 应用程序主布局组件，包含顶部导航栏和用户菜单
const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // 当前选中的菜单项
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  // 根据当前路径更新选中的菜单项
  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    setSelectedKeys([pathSegments[1] || 'home'])
  }, [location.pathname])

  // 主导航菜单配置
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: 'debt',
      icon: <FileAddOutlined />,
      label: '债权管理',
      children: [
        {
          key: 'debt-register',
          label: '债权登记'
        },
        {
          key: 'debt-list',
          label: '我的债权'
        }
      ]
    },
    {
      key: 'legal-force',
      icon: <MoneyCollectOutlined />,
      label: '法律服务'
    },
    {
      key: 'lawyer',
      icon: <FileSearchOutlined />,
      label: '律师入驻',
      children: [
        {
          key: 'lawyer-register',
          label: '律师注册'
        },
        {
          key: 'lawyer-list',
          label: '律师列表'
        }
      ]
    },
    {
      key: 'bounty',
      icon: <GiftOutlined />,
      label: '悬赏令'
    },
    {
      key: 'auction',
      icon: <ShoppingOutlined />,
      label: '债权拍卖'
    }
  ]

  // 用户菜单配置
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心'
    },
    {
      key: 'admin',
      icon: <SettingOutlined />,
      label: '系统管理'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录'
    }
  ]

  // 处理主导航菜单点击事件
  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'home':
        navigate('/')
        break
      case 'debt-register':
        navigate('/debt/register')
        break
      case 'debt-list':
        navigate('/debt/list')
        break
      case 'legal-force':
        navigate('/legal-force')
        break
      case 'lawyer-register':
        navigate('/lawyer/register')
        break
      case 'lawyer-list':
        navigate('/lawyer/list')
        break
      case 'bounty':
        navigate('/bounty')
        break
      case 'auction':
        navigate('/auction')
        break
      default:
        break
    }
  }

  // 处理用户菜单点击事件
  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        navigate('/user/profile')
        break
      case 'admin':
        navigate('/admin')
        break
      case 'logout':
        // TODO: 实现退出登录逻辑
        navigate('/login')
        break
      default:
        break
    }
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: '#1677ff', margin: 0, marginRight: 48 }}>
            <Link to="/" style={{ color: 'inherit' }}>债光光</Link>
          </h1>
          <Menu
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ flex: 1, minWidth: 680 }}
          />
        </div>
        <div>
          <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
            <Button type="text" icon={<Avatar icon={<UserOutlined />} />} />
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 64px)', background: '#f0f2f5' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AppLayout