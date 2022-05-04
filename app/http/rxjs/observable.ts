/**
 * Producer --> tao san pham, tao data
 * Consumer -->  su dung san pham, nhan ve data -> lam gi tiep thi lam
 * -> khong biet khi nao data dc gui toi de nhan
 *
 * @constructor
 */

interface ISubscription {
  unsubscribe: () => {}
}

/**
 * Subscription
 */
const FSubscription: any = function Subscription(unsubscribe: any) {
  this.unsubscribe = unsubscribe
}


/**
 * Must function, if arrow function can not new Observable
 * @param _subscribe
 * @constructor
 */
const FObservable: any = function Observable (_subscribe: any) {
  this._subscribe = _subscribe
}

FObservable.prototype.subscribe = function (observerOrNext: any, error: any, complete: any) {
  let observer

  if (typeof observerOrNext === 'function') {
    observer = {
      next: observerOrNext,
      error,
      complete,
    }
  } else {
    observer = observerOrNext
  }

  return this._subscribe(observer)
}

FObservable.timeout = (millisecondsInSecond: number) => {
  // wait to ran
  const _subscribe = (observer: any) => {
    const timeoutId = setTimeout(() => {
      observer.next()
      observer.complete()
    }, millisecondsInSecond)

    return new FSubscription(() => {
      clearTimeout(timeoutId)
    })
  }
  console.log('Observable.timeout run', millisecondsInSecond)
  return new FObservable(_subscribe)
}


FObservable.interval = (millisecondsInSecond: number) => {
  const _subscribe = (observer: any) => {
    const intervalId = setInterval(() => {
      observer.next()
    }, millisecondsInSecond)

    return new FSubscription(() => {
      clearInterval(intervalId)
    })
  }
  console.log('Observable.interval run', millisecondsInSecond)
  return new FObservable(_subscribe)
}


export default FObservable
