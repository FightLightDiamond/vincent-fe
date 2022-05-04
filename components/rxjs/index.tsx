import {filter, fromEvent, interval, map, Observable, scan, Subject, throttleTime} from "rxjs";
import React, {useEffect} from "react";
import Image from 'next/image'
import profilePic from '../../assets/avatar.jpeg'

const observer = {
  next: (value: any) => {
    console.log({value})
  },
  error: (error: any) => {
    console.log('error', error)
  },
  complete: () => {
    console.log('Complete')
  }
}

const RXJS: React.FC = () => {

  // fromEvent(document, 'click')
  //   .pipe(scan((count) => count + 1, 8))
  //   .subscribe((count) => console.log(`Clicked ${count} times`));

  // fromEvent(document, 'click')
  //   .pipe(
  //     // cach nhau bao lau
  //     throttleTime(100000),
  //     // Tạo bien dem
  //     scan((count) => count + 1, 0)
  //   )
  //   .subscribe((count) => console.log(`Clicked ${count} times`));

  // fromEvent(document, 'click')
  //   .pipe(
  //     throttleTime(1000),
  //     // don thuan la lay du luyen hien tai ra xu ly, k luu lai bien nao
  //     map((event) => event.clientX),
  //     scan((count, clientX) => count + clientX, 0)
  //   )
  //   .subscribe(observer);

  useEffect(function () {
    const button = document.querySelector('button')
    // fromEvent(document, 'click')
    //   .pipe(
    //     throttleTime(1000),
    //     // don thuan la lay du luyen hien tai ra xu ly, k luu lai bien nao
    //     map((event) => event.clientX),
    //     scan((count, clientX) => count + clientX, 0)
    //   )
    //   .subscribe(observer);


    // const subscription = Observable.create(function (obs) {
    //   fromEvent(button, 'click')
    //     .pipe(
    //       throttleTime(1000),
    //       // don thuan la lay du luyen hien tai ra xu ly, k luu lai bien nao
    //       map((event) => event.clientX),
    //       scan((count, clientX) => count + clientX, 0)
    //     )
    // }).subscribe(observer)
    //
    // setTimeout(function () {
    //   subscription.unsubscribe()
    // }, 1000)

    // const observable = interval(1000)
    //
    // const un = observable.pipe(
    //   map((value) => value * 2)
    // ).subscribe(observer)
    // un.unsubscribe()

    const subject = new Subject()
    subject.pipe(
      filter(((value: any) => value%2 === 0))
    )
      .subscribe(observer)

    subject.next(80)
    subject.next(181)
    subject.complete()
    subject.next(2180)
  })



  return <>
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
      <button>Button</button>
  </>
}

export default RXJS
