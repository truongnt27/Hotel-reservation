import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  RoomList as RoomListView,
  RoomDetail as RoomDetailView,
  NotFound as NotFoundView,
  BookingList as BookingListView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/rooms"
      />
      <RouteWithLayout
        component={RoomListView}
        exact
        layout={MainLayout}
        path="/rooms"
      />
      <RouteWithLayout
        component={BookingListView}
        exact
        layout={MainLayout}
        path="/bookings"
      />
      <RouteWithLayout
        component={RoomDetailView}
        exact
        layout={MainLayout}
        path="/rooms/:id"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
