import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import AppLayout from './layouts/AppLayout'

// 懒加载路由组件
const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const DebtRegister = lazy(() => import('./pages/debt/register'))
const DebtList = lazy(() => import('./pages/debt/list'))
const LegalForce = lazy(() => import('./pages/legal-force'))
const LawyerRegister = lazy(() => import('./pages/lawyer/register'))
const LawyerList = lazy(() => import('./pages/lawyer/list'))
const Bounty = lazy(() => import('./pages/bounty'))
const Auction = lazy(() => import('./pages/auction'))
const UserProfile = lazy(() => import('./pages/user/profile'))
const Admin = lazy(() => import('./pages/admin'))

// 应用程序根组件
const App = () => {
  return (
    // 使用Layout组件作为应用程序的根布局
    <Layout style={{ minHeight: '100vh' }}>
      {/* Suspense组件用于处理懒加载组件的加载状态 */}
      <Suspense fallback={<Spin size="large" style={{ margin: '20px auto', width: '100%' }} />}>
        <Routes>
          {/* 主布局路由配置 */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            {/* 债权管理相关路由 */}
            <Route path="debt">
              <Route path="register" element={<DebtRegister />} />
              <Route path="list" element={<DebtList />} />
            </Route>
            {/* 其他功能模块路由 */}
            <Route path="legal-force" element={<LegalForce />} />
            <Route path="lawyer">
              <Route path="register" element={<LawyerRegister />} />
              <Route path="list" element={<LawyerList />} />
            </Route>
            <Route path="bounty" element={<Bounty />} />
            <Route path="auction" element={<Auction />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          {/* 登录注册路由 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 404路由重定向 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App