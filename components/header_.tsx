import {Menu, Layout} from "antd";
import React from "react";
import Link from "next/link";

const {Header: Header} = Layout
const menus = [
  {
    link: '/task',
    label: 'Task',
  },
  // {
  //   link: '/tutorial',
  //   label: 'Tutorial',
  // },
  {
    link: '/user',
    label: 'User',
  },
]

const Header_: React.FC = () => {
  return <Header
    style={{
      position: 'fixed',
      zIndex: 1,
      width: '100%',
    }}
  >
    <div className="logo"/>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
    >
      {
        menus.map((_, index) => <Menu.Item key={index} >
          <Link href={_.link}>{_.label}</Link>
        </Menu.Item>)
      }
    </Menu>
  </Header>
}

export default Header_
