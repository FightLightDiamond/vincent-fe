import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router'
import React, {useEffect} from "react";
import {find} from '../../app/http/store/reducers/lesson.slice'
import {Col, Divider, List, Row, Button} from "antd";
import Link from 'next/link'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {PoweroffOutlined} from "@ant-design/icons";

const LessonShow: NextPage = () => {
  const router = useRouter()
  const {id} = router.query
  const dispatch = useDispatch();

  const lesson = useSelector((state: any) => state.lesson);
  const {item, loading} = lesson

  useEffect(() => {
    if (typeof id === "string") {
      const pid = parseInt(id)
      dispatch(find(pid));
    }
  }, [id]);

  return (
    <>
      <Row gutter={[50, 50, 50, 50]}>
        {
          loading && <Col className="gutter-row" span={6}>
              <Button type="primary" icon={<PoweroffOutlined />} loading />
          </Col>
        }
        <Col className="gutter-row" span={6}>
          <List
            header={<div>{item?.section?.name}</div>}
            bordered
            dataSource={item?.section?.lessons}
            renderItem={item => (
              <List.Item>
                <Link href={`/lesson/${item.id}`}>
                  <a>{item.title}</a>
                </Link>
              </List.Item>
            )}
          />
        </Col>
        <Col className="gutter-row" span={18}>
          <Divider orientation="left">{item?.title}</Divider>
          <ReactMarkdown children={item?.intro} remarkPlugins={[remarkGfm]} />
          <ReactMarkdown children={item?.content} remarkPlugins={[remarkGfm]} />
        </Col>
      </Row>
    </>
  )
}

export default LessonShow
