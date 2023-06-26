import { Outlet } from "react-router-dom";
import { Avatar, Col, Layout, Row, Tooltip } from "antd";
import React from 'react';
import { UserOutlined, HomeFilled } from '@ant-design/icons';

const { Header, Content } = Layout;

export function MobileLayout({ token }) {
  const control = token.current?.control;
  return (
    <Layout className="layout">
      <Layout className="layout">
        <Header className="layout-header">
          <Row>
            <Col flex="none">
              <HomeFilled onClick={() => control.navigate("/")} style={{ color: 'white', fontSize: '24px' }} />
            </Col>
            <Col flex="auto" className="avatar-column">
              <Tooltip placement="bottom" title="Profilo" color="#264395">
                <Avatar className="pointer" onClick={() => control.navigate("/profile")} size={36} icon={<UserOutlined />} />
              </Tooltip>
            </Col>
          </Row>
        </Header>
        <Content
          className="layout-bg layout-content"
          style={{
            padding: 0,
            minHeight: 280,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}