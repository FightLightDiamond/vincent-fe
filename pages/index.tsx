import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import styles from '../styles/Home.module.css'
import {useEffect} from "react";
import {index} from '../app/http/store/reducers/tutorial.slice'
import {Card, Col, Divider, Row, Space} from "antd";

const {Meta} = Card;

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const tutorial = useSelector((state: any) => state.tutorial);
  const {items, loading} = tutorial

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    dispatch(index());
  }, []);

  return (
    <div className={styles.container}>
      <Divider orientation="left">Horizontal</Divider>
      <Row gutter={[35, 35]}>
        {/*<Space size="middle" style={{ display: 'flex' }} wrap>*/}
        {
          items.map((item, key) => {
            return <Col key={key} className="gutter-row" span={6}>
              <Card
                hoverable
              cover={<img alt="example" src={item.thumb}/>}
            >
              <Meta title={item.name} description="www.instagram.com"/>
            </Card>
            </Col>
          })
        }
        {/*</Space>*/}
      </Row>
    </div>
)
}

export default Home
