import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
import Footer_ from './footer_'
import Header_ from "./header_";

export default function Layout_({ children }: any) {
  return (
    <Layout>
      <Header_/>
      <Content
        className="site-layout"
        style={{
          padding: '65px 50px 0 50px',
          marginHeader_: 64,
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <main>{children}</main>
        </div>
      </Content>
      {/*<Navbar />*/}
      <Footer_ />
    </Layout>
  )
}
