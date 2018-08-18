import React from 'react';
import Raven from 'react-raven';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Contact from './Contact';
import Curriculum from './Curriculum';
import Donate from './Donate';
import Error404 from './base/404';
import Home from './Home';
import Newsletter from './Newsletter';
import PageContainer from './PageContainer';
import PostsContainer from './PostsContainer';
import PostDetail from './PostDetail';

import {
  AdditionalPermissionsForm,
  ApplicationForAdmissionForm,
  BeforeAfterCareForm,
  ChildrensHouseMedAuthForm,
  EmergencyInfoMedAuthForm,
  FamilyInfoForm,
  ImmunizationRecordForm,
  MedicalExamForEntranceForm,
  VisitForm,
  VisitEnvironmentalForm,
  VolunteerLogForm
} from './forms';

import {
  NciApp,
  NciAppFieldTripDetail,
  NciAppFieldTripMedLog,
  NciAppFieldTripDietary,
  NciAppFieldTripMedLogTable,
  NciAppStudentDetail,
  NciAppGuardianDetail,
  NciAppStudentWaiver,
  NciAppAddMedication
} from './nciapp';

import {
  Login,
  Logout,
  PasswordReset,
  PasswordResetConfirm,
  CreateAccount
} from './common';

import { loggedIn } from './common/auth';

import {
  EEFacultyStaff,
  RoomAssignment,
  LocationsContainer,
  LocationsIndex,
  LocationDetail,
  PrepareForNci,
  DayInTheLife,
  NciDashboard
} from './environmental';

import {
  BaseMontessori,
  FacultyStaffMontessori,
  History,
  MontessoriEnrollment,
  MontessoriHomepage,
  Tuition,
  ThisWeekAtNci
} from './montessori';

import {
  DinnerWoodsHomepage,
  DitWCheckIn,
  DitWStaff,
  DitWReservation,
  EventCalendar,
  EventDetail,
  EventListContainer
} from './events';

import ApproveAccountProfile from './accounts/ApproveAccountProfile';

const requireAuth = (nextState, replace) => {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
          ? nextState.location.pathname
          : '/dashboard'
      }
    });
  }
};

export default (
  <div>
    <Raven dsn="https://a412ab91fe59481ba09d7dee36810151@sentry.io/1264486" />

    <Route path="/events/dinner-in-the-woods/check-in" component={DitWStaff}>
      <Route path="/events/dinner-in-the-woods/check-in/:rsvpToken" component={DitWReservation} />
    </Route>

    <Route path="/" component={App}>
      <IndexRoute component={Home} />

      <Route path="/dashboard" component={NciDashboard} onEnter={requireAuth} />
      <Route path="/environmental" component={LocationsContainer}>
        <IndexRoute component={LocationsIndex} />
        <Route path="/environmental/a-day-in-the-life" component={DayInTheLife} />
        <Route path="/environmental/faculty-staff" component={EEFacultyStaff} />
        <Route path="/environmental/prepare" component={PrepareForNci} />
        <Route path="/environmental/visit" component={VisitEnvironmentalForm} />
        <Route path="/environmental/:location/faculty-staff" component={EEFacultyStaff} />
        <Route path="/environmental/:location/room-assignment" component={RoomAssignment} />
        <Route path="/environmental/:location" component={LocationDetail} />
      </Route>

      <Route path="/curriculum" component={Curriculum} />

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
      <Route path="/events/dinner-in-the-woods" component={DinnerWoodsHomepage} />
      <Route path="/events/dinner-in-the-woods/:rsvpToken" component={DitWCheckIn} />
      <Route path="/events/:year/:month/:slug" component={EventDetail} />

      <Route path="/donate" component={Donate} />

      <Route path="/contact" component={Contact} />

      <Route path="/newsletters" component={Newsletter} />

      <Route path="/forms/additional-permissions" component={AdditionalPermissionsForm} />
      <Route path="/forms/application-for-admission" component={ApplicationForAdmissionForm} />
      <Route path="/forms/childrens-house-medication-authorization" component={ChildrensHouseMedAuthForm} />
      <Route path="/forms/before-after-care" component={BeforeAfterCareForm} />
      <Route path="/forms/immunization-record" component={ImmunizationRecordForm} />
      <Route path="/forms/medical-exam-for-entrance" component={MedicalExamForEntranceForm} />
      <Route path="/forms/emergency-info-medication-authorization" component={EmergencyInfoMedAuthForm} />
      <Route path="/forms/family-information" component={FamilyInfoForm} />
      <Route path="/forms/volunteer-log" component={VolunteerLogForm} />

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

    <Route path="*" component={Error404} />

  </div>
);
