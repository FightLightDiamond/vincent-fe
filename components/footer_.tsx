import { Layout, Menu, Breadcrumb } from 'antd';
import React from "react";
const { Header, Content, Footer } = Layout;

const Footer_: React.FC = () => {
  return <Footer
    style={{
      textAlign: 'center',
    }}
  >
    Ant Design ©2018 Created by Ant UED
  </Footer>
}

export default Footer_
