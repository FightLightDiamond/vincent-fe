import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Editor from "react-markdown-editor-lite";

import {  Form, Input, Button, Radio  } from 'antd';

const MarkDown: NextPage = () => {
  const [form] = Form.useForm();
  const [formLayout] = useState('vertical');

  const markdown = `
  # H1
  ## h2
  ### h3
  \`\`\`
  console.log('It works!')
  \`\`\`
  Just a link: https://reactjs.com.
  `

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Finish!
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      content: text
    })
    console.log(form.getFieldsValue())
  }

  const markdownRef = useRef<Editor>()

  useEffect(function () {
    // markdownRef.current?.insertMarkdown(markdown)
    markdownRef.current?.insertText(markdown)
  })

  const onFormLayoutChange = (values) => {
    console.log({values})
  };

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

  return <>
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="Title" name='title'>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item name='intro' style={{display: "none"}}>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item label="Intro">
        <MdEditor ref={markdownRef} style={{ height: '200px' }}
                  renderHTML={text => mdParser.render(text)}
          // defaultValue={markdown}
                  onChange={handleEditorChange} />
      </Form.Item>
      <Form.Item name='content' style={{display: "none"}}>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item label="Content">
        <MdEditor ref={markdownRef} style={{ height: '500px' }}
                  renderHTML={text => mdParser.render(text)}
          // defaultValue={markdown}
                  onChange={handleEditorChange} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>

    <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />


  </>
}

export default MarkDown
