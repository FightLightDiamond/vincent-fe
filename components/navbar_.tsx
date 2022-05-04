import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';

function getItem(label: string, key: string, icon?: any, children?: any[], type?: any) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('', 'sub1', <MailOutlined />, []),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, []),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const Sider = () => {
  const onClick = (e: any) => {
    console.log('click ', e);
  };

  return (
    <header>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="horizontal"
        items={items}
      />
    </header>
  );
};

export default Sider;
