import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import Layout_ from "../components/layout_";
import '../styles/css/base.scss'
import {PersistGate} from "redux-persist/integration/react";
import store, { persistor } from "../app/http/store";
import {Provider} from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout_>
        <Component {...pageProps} />
      </Layout_>
    </PersistGate>
  </Provider>
}

export default MyApp
