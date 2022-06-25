import {message} from "antd";

export const sendMessage = (error: string) => {
  message(error).then(r => {})
}
