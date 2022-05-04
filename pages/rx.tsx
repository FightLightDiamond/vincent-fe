import Observable from "../app/rxjs/observable";
import React, {memo, useEffect} from "react";
import { fromEvent } from 'rxjs';
import dynamic from "next/dynamic";
import {NextPage} from "next";

const RXJS = dynamic(() => import("../components/rxjs/index"), {ssr: false})

export async function getServerSideProps(context: any) {

  return {
    props: {
      a: 123
    }, // will be passed to the page component as props
  }
}

interface ISubscription {
  unsubscribe(): void
}

const observer = {
  next: () => {
    console.log("observer Next")
  },
  complete: () => {
    console.log("observer complete")
  },
  error: () => {

  }
}

const RX: NextPage = (props: any) => {
  // useEffect(function () {
  //   const intervalObs$ = Observable.interval(2000)
  //
  //   console.log({intervalObs$})
  //
  //   const subscription:ISubscription = intervalObs$.subscribe(observer)
  //   console.log(subscription)
  //   subscription.unsubscribe()
  //
  // }, [])

  return <>
    <RXJS/>
  </>
}

export default memo(RX)
