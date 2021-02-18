import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import styles from '../../views/Report/Report.css';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarForm,
  AppSidebarNav,
  AppSidebarMinimizer,
  AppHeader
} from '@coreui/react';
// routes config
import routes from '../../routes';

const TOKEN = 'access_token';
const jwtDecode = require('jwt-decode');
const token = localStorage.getItem(TOKEN);
const decoded = jwtDecode(token);


const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {
        items: [
        ]
      }
    };
  }

  loading = () => <div id="loading" className="text-center">
    <img id="loading-image" src="http://www.broadwaybalancesamerica.com/images/ajax-loader.gif" alt="Loading..."/>
  </div>

  signOut(e) {
    e.preventDefault()
    localStorage.clear();
    this.props.history.push('/login')
  }

  componentDidMount() {
    let items;
    // console.log(decoded.roles);
    if (decoded.role === '1') {
      items = {
        items: [
          {
            name: 'API Report',
            url: '/history',
            icon: "icon-list"
          },
          {
            name: 'Quản Lý Tài Khoản',
            url: '/account',
            icon: "icon-list"
          },
          
        ]
      };
    } else {
      items = {
        items: [

          {
            name: 'API Report',
            url: '/history',
            icon: "icon-list"
          },
        ]
      };
    }
    this.setState({
      items
    });
  }


  render() {
    return (
      <div className={"app " + styles.back_color_app}>
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className={"app-body " + styles.margin0}>
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={this.state.items} {...this.props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )}/>
                    ) : (null);
                  })}
                  <Redirect from="/" to="/"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside/>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
