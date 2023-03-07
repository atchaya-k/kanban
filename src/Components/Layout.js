import React from 'react';
import {  Layout, Menu, theme } from 'antd';
import Kanban from './Kanban';
import {DashboardOutlined} from '@ant-design/icons'

const { Header, Content, Footer } = Layout;

const Layouts= () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>      
         <DashboardOutlined className='logo-img'/>
         TO DO 
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{margin: '16px 0' , background: colorBgContainer }}>
          <Kanban/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Kanban Boards</Footer>
    </Layout>
  );
};

export default Layouts;