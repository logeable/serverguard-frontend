import { Avatar, Breadcrumb, Dropdown, Layout, Menu, MenuProps } from "antd";
import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import Icon, {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";

const { Header, Content, Sider } = Layout;

export const AppLayout: React.FC = (): JSX.Element => {
  const outlet = useOutlet();
  const { user, logout } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

  const userMenu: MenuProps["items"] = [
    {
      label: "个人设置",
      key: "个人设置",
      icon: <EditOutlined />,
    },
    {
      label: "系统设置",
      key: "系统设置",
      icon: <SettingOutlined />,
    },
    {
      label: "登出",
      key: "登出",
      icon: <LogoutOutlined />,
    },
  ];

  const userMenuOnClick: MenuProps["onClick"] = ({ key }) => {
    if (key == "登出") {
      logout();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          style={{ display: "inline-block" }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
        <div
          style={{
            display: "inline-block",
            position: "absolute",
            right: "1rem",
          }}
        >
          <Dropdown
            overlay={<Menu onClick={userMenuOnClick} items={userMenu} />}
          >
            <Avatar
              icon={<UserOutlined />}
              alt="avatar"
              style={{ cursor: "pointer" }}
            ></Avatar>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "white",
            }}
          >
            {outlet}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
