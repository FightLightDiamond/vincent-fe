import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router'
import React, {useEffect} from "react";
import {find, update} from '../../../app/http/store/reducers/lesson.slice'
import 'react-markdown-editor-lite/lib/index.css';
import FormLesson from "../../../components/lesson/form.lesson";

/**
 * LessonUpdate
 * @constructor
 */
const LessonUpdate: NextPage = () => {
  /**
   * Router
   */
  const router = useRouter()
  const {id} = router.query

  /**
   * Redux
   */
  const dispatch = useDispatch();
  const lesson = useSelector((state: any) => state.lesson);
  const {item, loading} = lesson

  /**
   * useEffect
   */
  useEffect(() => {
    if (typeof id === "string") {
      const pid = parseInt(id)
      dispatch(find(pid));
    }
  }, [id]);

  const onSubmit = (body) => {
    const payload = {
      id: parseInt(id),
      body
    }
    dispatch(update(payload))
  }

  return (
    <>
      <FormLesson item={item} submit={onSubmit}/>
    </>
  )
}

export default LessonUpdate
