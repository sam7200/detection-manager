import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ComponentManagement from './components/ComponentManagement';

const { Header, Sider, Content } = Layout;

function App() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: '仪表盘', link: '/' },
    { key: '2', icon: <BarChartOutlined />, label: '数据分析', link: '/analysis' },
    { key: '3', icon: <AppstoreOutlined />, label: '组件管理', link: '/components' },
    { key: '4', icon: <SettingOutlined />, label: '设置', link: '/settings' },
    { key: '5', icon: <BellOutlined />, label: '通知', link: '/notifications' },
  ];

  return (
    <Router>
      <Layout className="min-h-screen">
        <Sider
          width={200}
          className="bg-gray-800"
          collapsed={!isMenuExpanded}
          collapsible
          trigger={null}
        >
          <div className="flex items-center justify-between p-4 text-white">
            {isMenuExpanded && <span className="text-xl font-bold">环境监测</span>}
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuExpanded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </button>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            className="bg-gray-800"
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={item.link}>{item.label}</Link>
            }))}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-white">
              {isMenuExpanded && (
                <span className="flex items-center">
                  <UserOutlined className="mr-2" />
                  用户名
                </span>
              )}
              <button className="text-white focus:outline-none">
                <LogoutOutlined />
              </button>
            </div>
          </div>
        </Sider>
        <Layout>
          <Content className="m-5 p-5 bg-white rounded-lg shadow">
            <Routes>
              <Route path="/" element={<h1>仪表盘</h1>} />
              <Route path="/analysis" element={<h1>数据分析</h1>} />
              <Route path="/components" element={<ComponentManagement />} />
              <Route path="/settings" element={<h1>设置</h1>} />
              <Route path="/notifications" element={<h1>通知</h1>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;