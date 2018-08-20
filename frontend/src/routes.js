import React from 'react';
import Raven from 'react-raven';
import { Route, IndexRoute } from 'react-router';

import {
  Login,
  Logout,
  PasswordReset,
  PasswordResetConfirm,
  CreateAccount,
  requireAuth
} from './common';

import {
  WebsiteWrapper,
  ContactPage,
  CurriculumPage,
  DonatePage,
  Error404Page,
  FrontPage,
  NewsletterPage,
  PageContainer,
  PostsContainer,
  PostDetail,
  VisitForm,
  VisitEnvironmentalForm,
  EventCalendar,
  EventListContainer,
  EventDetail,
  BaseMontessori,
  FacultyStaffMontessori,
  History,
  MontessoriHomepage,
  MontessoriEnrollment,
  Tuition,
  ThisWeekAtNci,
  EEFacultyStaff,
  LocationsContainer,
  LocationsIndex,
  LocationDetail,
  PrepareForNci,
  DayInTheLife,
  NciDashboard
} from './website';

import {
  NciApp,
  NciAppFieldTripDetail,
  NciAppFieldTripMedLog,
  NciAppFieldTripDietary,
  NciAppFieldTripMedLogTable,
  NciAppStudentDetail,
  NciAppGuardianDetail,
  NciAppStudentWaiver,
  NciAppAddMedication,
  ApproveAccountProfile
} from './portal';

export default (
  <div>
    <Raven dsn={process.env.REACT_APP_SENTRY_DSN_URL} />

    <Route path="/" component={WebsiteWrapper}>
      <IndexRoute component={FrontPage} />

      <Route path="/dashboard" component={NciDashboard} onEnter={requireAuth} />

      <Route path="/environmental" component={LocationsContainer}>
        <IndexRoute component={LocationsIndex} />
        <Route path="/environmental/a-day-in-the-life" component={DayInTheLife} />
        <Route path="/environmental/faculty-staff" component={EEFacultyStaff} />
        <Route path="/environmental/prepare" component={PrepareForNci} />
        <Route path="/environmental/visit" component={VisitEnvironmentalForm} />
        <Route path="/environmental/:location/faculty-staff" component={EEFacultyStaff} />
        <Route path="/environmental/:location" component={LocationDetail} />
      </Route>

      <Route path="/curriculum" component={CurriculumPage} />

      <Route path="/montessori/history" component={History} />
      <Route path="/montessori/calendar" component={EventCalendar} />
      <Route path="/montessori/enrollment" component={MontessoriEnrollment} />
      <Route path="/montessori/faculty-staff" component={FacultyStaffMontessori} />
      <Route path="/montessori/tuition" component={Tuition} />
      <Route path="/montessori/parents" component={PostsContainer} />
      <Route path="/montessori/this-week" component={ThisWeekAtNci} />
      <Route path="/montessori/parents/:year/:month/:slug" component={PostDetail} />
      <Route path="/montessori/visit" component={VisitForm} />
      <Route path="/montessori" component={BaseMontessori}>
        <IndexRoute component={MontessoriHomepage} />
        <Route path="/montessori/:slug" component={PageContainer} />
      </Route>

      <Route path="/events" component={EventListContainer} />
      <Route path="/events/:year/:month/:slug" component={EventDetail} />

      <Route path="/donate" component={DonatePage} />

      <Route path="/contact" component={ContactPage} />

      <Route path="/newsletters" component={NewsletterPage} />

      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={CreateAccount} />
      <Route path="/reset" component={PasswordReset} />
      <Route path="/reset/:uidb64/:token" component={PasswordResetConfirm} />
      <Route path="/approve/:token/:school" component={ApproveAccountProfile} />

    </Route>

    <Route path="/app" component={NciApp} onEnter={requireAuth} />
    <Route path="/app/fieldtrip/:id" component={NciAppFieldTripDetail} onEnter={requireAuth} />
    <Route path="/app/fieldtrip/:id/medlog" component={NciAppFieldTripMedLog} onEnter={requireAuth} />
    <Route path="/app/fieldtrip/:id/dietary" component={NciAppFieldTripDietary} onEnter={requireAuth} />
    <Route path="/app/fieldtrip/:id/medlog/table" component={NciAppFieldTripMedLogTable} onEnter={requireAuth} />
    <Route path="/app/student/:id" component={NciAppStudentDetail} onEnter={requireAuth} />
    <Route path="/app/student/:id/add-medication" component={NciAppAddMedication} onEnter={requireAuth} />
    <Route path="/app/student/:id/waiver" component={NciAppStudentWaiver} onEnter={requireAuth} />
    <Route path="/app/guardian/:id" component={NciAppGuardianDetail} onEnter={requireAuth} />

    <Route path="*" component={Error404Page} />

  </div>
);
