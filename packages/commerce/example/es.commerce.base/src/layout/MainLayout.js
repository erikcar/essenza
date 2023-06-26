import { Outlet } from "react-router-dom";
import { Avatar, Col, Layout, Row, Tooltip } from "antd";
import React from 'react';
import { UserOutlined, HomeFilled, SettingOutlined } from '@ant-design/icons';
import { Logo } from "./logo";

const { Header, Content } = Layout;

export function MainLayout({ token }) {
  const control = token.current?.control;
  return (
    <Layout className="min-h-screen bg-white">
        <Header className="layout-header">
          <Row>
          <Col flex="none">
              <Logo style={{ height: "36px" }} />
            </Col>
            <Col flex="auto">

            </Col>
            <Col flex="none">
              <HomeFilled onClick={() => control.navigate("/home")} style={{ color: 'white', fontSize: '24px' }} />
            </Col>
            <Col flex="auto">

            </Col>
            <Col flex="60px" className="avatar-column">
              <Tooltip placement="bottom" title="Impostazioni" color="#2db7f5">
                <SettingOutlined style={{ color: 'white', fontSize: '32px', verticalAlign: 'middle' }} className="pointer" onClick={() => control.navigate("/settings")} />
              </Tooltip>
            </Col>
            <Col flex="none">
              <Tooltip placement="bottom" title="Profilo" color="#264395">
                <Avatar className="pointer avatar-pri" onClick={() => control.navigate("/user")} size={36} icon={<UserOutlined />} />
              </Tooltip>
            </Col>
          </Row>
        </Header>
        <Content
          className=" w-full "
          style={{
            padding: 0,
            minHeight: 280,
          }}
        >
          <Outlet></Outlet>
        </Content>
    </Layout>
  );
}