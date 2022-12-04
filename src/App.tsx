import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import UsersContainer from './Components/Users/UsersContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { withRouter } from './Components/HOC/withRouter';
import { compose } from 'redux';
import Preloader from './Components/Common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import { Provider } from 'react-redux';
import { withSuspense } from './Components/HOC/withSuspense';
import { actionsApp } from './redux/app-reducer';

const DialogsContainer = withSuspense(React.lazy(() => import('./Components/Dialogs/DialogsContainer')))
const ProfileContainer = withSuspense(React.lazy(() => import('./Components/Profile/ProfileContainer')));
class App extends React.Component<MapStateToPropsType & MapDispatchToProps> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/' element={<Navigate to={'/profile'} />} />
            <Route path='/profile' element={<ProfileContainer />}>
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<div style={{ 'display': 'flex', "justifyContent": 'center', 'alignItems': 'center', 'height': '100%', 'fontWeight': '700' }}>404 NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
    )
  }
}

type MapStateToPropsType = { initialized: boolean }
type MapDispatchToProps = { initializeApp: () => void }
type OwnProps = {}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    initialized: state.app.initialized,
  }
}

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect<MapStateToPropsType, MapDispatchToProps, OwnProps, AppStateType>(mapStateToProps, { initializeApp: actionsApp.initializeApp })
)(App)

export const MainApp: React.FC = () => {
  return (
    <BrowserRouter >
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}