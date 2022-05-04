import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {find} from '../../app/http/store/reducers/tutorial.slice'
import { Divider, Table} from "antd";
import Link from 'next/link'

const TutorialShow: NextPage = () => {
  const router = useRouter()
  const {id} = router.query
  const dispatch = useDispatch();

  const tutorial = useSelector((state: any) => state.tutorial);
  const {item, loading} = tutorial

  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(function () {
    let data = []
    let key = 1;

    item?.sections?.map((section) => {
      data.push({
        key: key++,
        section: section,
        lesson: ''
      })
      section?.lessons?.map((lesson) => {
        data.push({
          key: key++,
          section: '',
          lesson: lesson
        })
      })
    })
    console.log({item, data})

    setDataSource(data)
  }, [item])

  const columns = [
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      render: (text) => <Link href={`/lesson/${text.id}`}><a>{text.name}</a></Link>
    },
    {
      title: 'Lesson',
      dataIndex: 'lesson',
      key: 'lesson',
      render: (text) => <Link href={`/lesson/${text.id}`}><a>{text.title}</a></Link>
    },
  ];

  useEffect(() => {
    if (typeof id === "string") {
      const pid = parseInt(id)
      dispatch(find(pid));
    }
  }, [id]);

  return (
    <>
      <Divider orientation="left">{item.name}</Divider>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default TutorialShow
