import Layout from './components/layout/index'
import './global.scss'
import 'antd/dist/antd.css';  //引入antd样式
import { BrowserRouter } from 'react-router-dom'
import Router from './routers';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
