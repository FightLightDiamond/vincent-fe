import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import {Button, Divider, Table} from "antd";
import {useEffect, useState} from "react";
import {
  getTasks, updateTask
} from '../../app/http/store/reducers/task.slice'

const Task: NextPage = () => {
  const dispatch = useDispatch();
  const task = useSelector((state: any) => state.task )
  const {items} = task
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  useEffect(() => {
    const dataSource = items?.map((item) => ({...item, active: {id: item.id, active: item.active}}))
    setDataSource(dataSource)
  }, [task])

  const handleChangeActive = (active) => {
    const ok = confirm('Are you sure change status?')
    if(ok) {
      dispatch(updateTask({
        id: active.id,
        body: {active: !active.active}
      }))
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active) => <Button onClick={() => handleChangeActive(active)}>{active.active ? 'Active' : 'Inactive'}</Button>
    },
    {
      title: 'Assign',
      dataIndex: 'assign',
      key: 'assign',
    },
  ];

  return (
    <div>
      <Divider orientation="left">Task</Divider>
      {
        JSON.stringify(items)
      }
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Task
