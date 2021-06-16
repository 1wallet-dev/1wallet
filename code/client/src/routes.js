import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import Paths from './constants/paths'
import { Layout, Row, Spin } from 'antd'
import SiderMenu from './components/SiderMenu'
import WalletHeader from './components/WalletHeader'
import CreatePage from './pages/Create'
import ListPage from './pages/List'
import RecoverPage from './pages/Recover'
import TransferPage from './pages/Transfer'
import RestorePage from './pages/Restore'
import ShowPage from './pages/Show'
import Welcome from './pages/Welcome'

const LocalRoutes = () => {
  // eslint-disable-next-line no-unused-vars
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu collapsed={collapsed} onCollapse={(e) => setCollapsed(e)} />
      <Layout>
        <WalletHeader />
        <Layout.Content style={{ padding: 32 }}>
          <Switch>
            <Route path={Paths.create} component={CreatePage} />
            <Route path={Paths.list} component={ListPage} />
            <Route path={Paths.restore} component={RestorePage} />
            <Route path={Paths.show} component={ShowPage} />
            <Route path={Paths.recover} component={RecoverPage} />
            <Route path={Paths.transfer} component={TransferPage} />
            <Route component={Welcome} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

const Routes = () => {
  const dispatch = useDispatch()
  const [rehydrated, setRehydrated] = useState(false)
  useEffect(() => {
    const store = require('./state/store')
    persistStore(store.default, null, () => {
      setRehydrated(true)
    })
  }, [dispatch])

  if (!rehydrated) {
    return (
      <Layout>
        <Layout.Content>
          <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
            <Spin size='large' />
          </Row>
        </Layout.Content>
      </Layout>
    )
  }

  return (
    <Switch>
      <Route>
        <LocalRoutes />
      </Route>
    </Switch>
  )
}

export default Routes