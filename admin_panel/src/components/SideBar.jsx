import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const navigationItems = [
  { key: '1', path: '/', label: 'Stores' },
 
  
];

// eslint-disable-next-line react/prop-types
const   SideBar = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark" collapsed={collapsed} collapsible trigger={null}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', padding: '0 24px' }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggleSidebar} style={{ fontSize: '1.5rem', color: '#fff' }} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggleSidebar} style={{ fontSize: '1.5rem', color: '#fff' }} />
          )}
          
        </div> 
        <div style={{ padding: '10px' }}>
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
            {navigationItems.map((item,id) => (
                <Menu.Item key={id}>
                  <Link to={item.path} style={{ display: 'block', padding: '5px 0' }}>
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0,marginLeft:10 }}>LEZZO Task</Header>
        <Content style={{ margin: '16px', minHeight: 0 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 48px)' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
