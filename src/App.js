import Layout from './components/layout/index'
import './global.scss'
import 'antd/dist/antd.css';  //引入antd样式
import { BrowserRouter } from 'react-router-dom'
import Router from './routers';
import store, { persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
