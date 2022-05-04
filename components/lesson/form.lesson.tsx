import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Input} from "antd";

import MarkdownIt from 'markdown-it';
import MdEditor from "react-markdown-editor-lite";
import Editor from "react-markdown-editor-lite";
import 'react-markdown-editor-lite/lib/index.css';

/**
 * FormLesson
 * @constructor
 */
const FormLesson: React.FC = ({item, submit}) => {
  /**
   * useRef
   */
  const introRef = useRef<Editor>()
  const contentRef = useRef<Editor>()

  /**
   * Form
   */
  const [form] = Form.useForm();
  const [formLayout] = useState('vertical');

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
      : null;

  /**
   * useEffect
   */
  useEffect(() => {
    form.setFieldsValue({
      title: item?.title
    })
    introRef.current?.insertText(item?.intro)
    contentRef.current?.insertText(item?.content)
  }, [item]);


  /**
   * Markdown
   */
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const onSubmit = (form) => {
    const title = form.title
    const intro = introRef.current?.getMdValue()
    const content = contentRef.current?.getMdValue()

    // if (typeof id === "string"
    //   && typeof title === "string"
    //   && typeof intro === "string"
    //   && typeof content === "string"
    // ) {
      const body = {
        title,
        intro,
        content,
      }
      //
      // console.log({body})
      //
      // const payload = {
      //   id: parseInt(id),
      //   body
      // }
    submit(body)
    // }
  }

  return (
    <>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          title: item?.title,
        }}
        onFinish={onSubmit}
      >
        <Form.Item label="Title" name='title'>
          <Input placeholder="input placeholder"/>
        </Form.Item>
        <Form.Item name='intro' style={{display: "none"}}>
          <Input type='hidden'/>
        </Form.Item>
        <Form.Item label="Intro">
          <MdEditor ref={introRef} style={{height: '200px'}}
                    renderHTML={text => mdParser.render(text)}/>
        </Form.Item>
        <Form.Item name='content' style={{display: "none"}}>
          <Input type='hidden'/>
        </Form.Item>
        <Form.Item label="Content">
          <MdEditor ref={contentRef} style={{height: '500px'}}
                    renderHTML={text => mdParser.render(text)}/>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default FormLesson
