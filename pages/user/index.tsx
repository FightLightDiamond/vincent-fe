import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import {Divider} from "antd";


const User: NextPage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Divider orientation="left">User</Divider>

    </div>
)
}

export default User
