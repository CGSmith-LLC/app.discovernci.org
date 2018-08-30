/* eslint no-eval: 0 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Typeahead } from 'react-bootstrap-typeahead';
import {
  Row, Col, Radio, Button, FormControl, FormGroup, ControlLabel, Checkbox
} from 'react-bootstrap';

import { genRandId } from '../../common/utils/index';
import DateField from '../../common/DateField';
import StudentFormReview from './StudentFormReview';
import MedicationForm from './MedicationForm';
import { schoolClassroomListPublic, schoolClassroomListMontessori, medicationAdminTimeChoices } from './formFieldChoices';

class StudentFormContainer extends React.Component {
  static propTypes = {
    addOrModifyStudentMutation: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    selectedstudentObj: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    schoolList: PropTypes.shape({
      loading: PropTypes.bool,
      schools: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      )
    }).isRequired
  }

  static defaultProps = {
    selectedstudentObj: null
  }

  state = {
    // Form State, Helpers...
    step: 1,
    formSubmitted: false,
    submitDisabled: false,
    medicationSetFormError: false,

    // Basic Information Fields
    name: '',
    dobMonth: null,
    dobDay: null,
    dobYear: null,
    currentSchool: [],
    classroom: 0,

    // Medical Fields
    gender: 0,
    height: '',
    weight: 0,
    lastTetanusMonth: null,
    lastTetanusDay: null,
    lastTetanusYear: null,
    noTetanusVaccine: false,
    recentTrauma: '',
    restrictions: '',

    // Health Insurance Fields
    insId: 0,
    insCompanyName: '',
    insPolicyNum: '',
    insGroupNum: '',
    insHolderName: '',
    // --
    deferIns: false,

    // Medications (Non-Rx) Fields
    nonRxType: 0,
    nonRxNotes: '',

    // Medications (Prescribed)
    medicationSet: [],

    // Allery Fields
    allergies: [],
    foodAllergens: [],
    allergiesExpanded: '',
    // --
    hasFoodAllergy: false,
    hasSkinAllergy: false,
    hasDustAllergy: false,
    hasInsectStingAllergy: false,
    hasAnimalAllergy: false,
    hasEyeAllergy: false,
    hasDrugAllergy: false,
    hasAllergicRhinitis: false,
    hasLatexAllergy: false,
    hasMoldAllergy: false,
    hasPollenAllergy: false,
    hasSinusAllergy: false,
    hasOtherAllergy: false,
    // --
    hasFoodAllergyMilk: false,
    hasFoodAllergyEggs: false,
    hasFoodAllergyPeanuts: false,
    hasFoodAllergySoy: false,
    hasFoodAllergyWheat: false,
    hasFoodAllergyTreeNuts: false,
    hasFoodAllergyFish: false,
    hasFoodAllergyShellfish: false,
    hasFoodAllergyOther: false,

    // Dietary Fields
    dietaryNeeds: '',
    guardianSuppliesFood: false,

    // Opt-ins, Outs
    photoWaiver: true,
    waiverAgreement: false
  }

  componentDidUpdate = () => {
    const nextProps = this.props;
    console.log('StudentForm componentDidUpdate: ', nextProps);
    if (!_.isEmpty(nextProps.selectedstudentObj) && (nextProps.selectedstudentObj.id > 0)) {
      const s = nextProps.selectedstudentObj;
      this.setState({
        name: s.name,
        dobMonth: (parseInt(moment(s.dob).format('M'), 10) - 1),
        dobDay: parseInt(moment(s.dob).format('D'), 10),
        dobYear: parseInt(moment(s.dob).format('YYYY'), 10),
        currentSchool: [
          {
            id: nextProps.selectedstudentObj.currentSchool.id,
            label: nextProps.selectedstudentObj.currentSchool.name
          }
        ],
        classroom: s.classroom,
        photoWaiver: s.photoWaiver,
        gender: s.medicalrecord.gender,
        height: s.medicalrecord.height,
        weight: s.medicalrecord.weight,
        lastTetanusMonth: (parseInt(moment(s.lastTetanus).format('M'), 10) - 1),
        lastTetanusDay: parseInt(moment(s.lastTetanus).format('D'), 10),
        lastTetanusYear: parseInt(moment(s.lastTetanus).format('YYYY'), 10),
        noTetanusVaccine: s.medicalrecord.noTetanusVaccine,
        insId: (s.insuranceDependentsList.length > 0) &&
          s.insuranceDependentsList[0].id,  // FIXME It's an array...
        recentTrauma: s.medicalrecord.recentTrauma,
        restrictions: s.medicalrecord.restrictions,
        nonRxType: s.medicalrecord.nonRxType,
        nonRxNotes: s.medicalrecord.nonRxNotes,
        medicationSet: s.medicalrecord.medicationSet &&
          (s.medicalrecord.medicationSet.length > 0)
            ? _.map(s.medicalrecord.medicationSet, med => {
              console.log(med.administrationTimes);
              console.log(med.administrationTimes);
              return (
                {
                  id: med.id,
                  administrationTimes: med.administrationTimes.toString(),
                  administrationTimesOther: med.administrationTimesOther,
                  medicationName: med.medicationName,
                  amount: med.amount,
                  amountHuman: med.amountHuman,
                  amountUnit: med.amountUnit,
                  getAmountUnitDisplay: med.getAmountUnitDisplay,
                  notes: med.notes
                }
              )
            })
            : [],
        // medicationSet: [
        //   ...s.medicalrecord.medicationSet
        // ],
        allergies: s.medicalrecord.allergies && eval(JSON.parse(s.medicalrecord.allergies)).join(','),

        hasFoodAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 1),
        hasSkinAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 2),
        hasDustAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 3),
        hasInsectStingAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 4),
        hasAnimalAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 5),
        hasEyeAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 6),
        hasDrugAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 7),
        hasAllergicRhinitis: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 8),
        hasLatexAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 9),
        hasMoldAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 10),
        hasPollenAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 11),
        hasSinusAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 12),
        hasOtherAllergy: s.medicalrecord.allergies && _.includes(JSON.parse(s.medicalrecord.allergies), 13),

        hasFoodAllergyMilk: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 1),
        hasFoodAllergyEggs: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 2),
        hasFoodAllergyPeanuts: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 3),
        hasFoodAllergySoy: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 4),
        hasFoodAllergyWheat: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 5),
        hasFoodAllergyTreeNuts: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 6),
        hasFoodAllergyFish: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 7),
        hasFoodAllergyShellfish: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 8),
        hasFoodAllergyOther: s.medicalrecord.foodAllergens && _.includes(JSON.parse(s.medicalrecord.foodAllergens), 9),

        allergiesExpanded: s.medicalrecord.allergiesExpanded,
        dietaryNeeds: s.medicalrecord.dietaryNeeds,
        guardianSuppliesFood: s.medicalrecord.guardianSuppliesFood
      });
    }
  };

  prevFormStep = () => {
    let { step } = this.state;
    this.setState({ step: step -= 1 });
  }

  nextFormStep = () => {
    let { step } = this.state;
    if (step === 5) {
      this.handleGetAllergySelection();
      this.handleGetFoodAllergenSelection();
    }
    if (step === 7) {
      this.handleSubmit();
    } else {
      this.setState({ step: step += 1 });
    }
  }

  gotoStep = step => this.setState({ step });

  // Step 1
  handleInputName = (e) => {
    this.setState({ name: e.target.value });
    // if (e.target.value.split(' ').length >= 2) {
    //   this.setState({ nameValid: 'success' });
    // } else {
    //   this.setState({ nameValid: null });
    // }
  }

  handleDobMonth = e => this.setState({ dobMonth: parseInt(e.target.value, 10) });
  handleDobDay = e => this.setState({ dobDay: parseInt(e.target.value, 10) });
  handleDobYear = e => this.setState({ dobYear: parseInt(e.target.value, 10) });
  handleDobClear = () => this.setState({ dobMonth: null, dobDay: null, dobYear: null });

  handleClassroom = (e) => { this.setState({ classroom: parseInt(e.target.value, 10) }); }

  // Step 2
  handleGender = (e) => { this.setState({ gender: parseInt(e.target.value, 10) }); }
  handleHeight = (e) => { this.setState({ height: e.target.value }); }
  handleWeight = (e) => { this.setState({ weight: e.target.value }); }

  handleLastTetanusMonth = e => this.setState({ lastTetanusMonth: parseInt(e.target.value, 10) });
  handleLastTetanusDay = e => this.setState({ lastTetanusDay: parseInt(e.target.value, 10) });
  handleLastTetanusYear = e => this.setState({ lastTetanusYear: parseInt(e.target.value, 10) });
  handleLastTetanusClear = () => this.setState({ lastTetanusMonth: null, lastTetanusDay: null, lastTetanusYear: null });

  handleNoTetanusVaccine = (e) => { this.setState({ noTetanusVaccine: e.target.checked }); }

  handleSelectedInsOption = (e) => { this.setState({ insId: parseInt(e.target.value, 10) }); }
  handleInsCompanyName = (e) => { this.setState({ insCompanyName: e.target.value }); }
  handleInsPolicyNum = (e) => { this.setState({ insPolicyNum: e.target.value }); }
  handleInsGroupNum = (e) => { this.setState({ insGroupNum: e.target.value }); }
  handleInsHolderName = (e) => { this.setState({ insHolderName: e.target.value }); }
  handleDeferIns = (e) => { this.setState({ deferIns: e.target.checked }); }

  handleRecentTrauma = (e) => { this.setState({ recentTrauma: e.target.value }); }
  handleRestrictions = (e) => { this.setState({ restrictions: e.target.value }); }

  handleNonRxType = (e) => { this.setState({ nonRxType: parseInt(e.target.value, 10) }); }
  handleNonRxNotes = (e) => { this.setState({ nonRxNotes: e.target.value }); }

  // The medicationSet is an empty array by default.
  handleInitMedicationList = () => {
    this.setState(
      state => ({
        medicationSetFormError: false,
        medicationSet: state.medicationSet.concat(
          {
            id: genRandId(),
            medicationName: '',
            amountHuman: '',
            notes: '',
            administrationTimes: [],
            administrationTimesOther: ''
          }
        )
      }),
    );
  }
  handleMedicationAdd = () => {
    this.setState(
      state => ({
        medicationSetFormError: false,
        medicationSet: state.medicationSet.concat(
          {
            id: genRandId(),
            medicationName: '',
            amountHuman: '',
            notes: '',
            administrationTimes: [],
            administrationTimesOther: ''
          }
        )
      })
    );
  }
  handleMedMedicationName = (id, medicationName) => {
    const items = this.state.medicationSet.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], medicationName };
    this.setState({ medicationSetFormError: false, medicationSet: items });
  }
  handleMedAmountHuman = (id, amountHuman) => {
    const items = this.state.medicationSet.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], amountHuman };
    this.setState({ medicationSetFormError: false, medicationSet: items });
  }
  handleMedAdministrationTimes = (id, label, checked) => {
    const items = this.state.medicationSet.slice();
    const index = items.findIndex(x => x.id === id);
    const x = items[index].administrationTimes;
    _.map(medicationAdminTimeChoices, (choice) => {
      if (label === String(choice.label).toLowerCase()) {
        checked
          ? x.push(choice.id)
          : _.pull(x, choice.id);
      }
    });
    items[index] = { ...items[index], administrationTimes: x };
    this.setState({
      medicationSetFormError: false,
      medicationSet: items
    });
  }
  handleMedAdministrationTimesOther = (id, administrationTimesOther) => {
    const items = this.state.medicationSet.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], administrationTimesOther };
    this.setState({ medicationSetFormError: false, medicationSet: items });
  }
  handleMedNotes = (id, notes) => {
    const items = this.state.medicationSet.slice();
    const index = items.findIndex(x => x.id === id);
    items[index] = { ...items[index], notes };
    this.setState({ medicationSetFormError: false, medicationSet: items });
  }
  handleMedicationRemove = (id) => {
    this.setState({
      medicationSetFormError: false,
      medicationSet: this.state.medicationSet.filter(item => item.id !== id)
    });
  }

  handleHasFoodAllergy = (e) => { this.setState({ hasFoodAllergy: e.target.checked }); }
  handleSkinAllergy = (e) => { this.setState({ hasSkinAllergy: e.target.checked }); }
  handleDustAllergy = (e) => { this.setState({ hasDustAllergy: e.target.checked }); }
  handleInsectStingAllergy = (e) => { this.setState({ hasInsectStingAllergy: e.target.checked }); }
  handleAnimalAllergy = (e) => { this.setState({ hasAnimalAllergy: e.target.checked }); }
  handleEyeAllergy = (e) => { this.setState({ hasEyeAllergy: e.target.checked }); }
  handleDrugAllergy = (e) => { this.setState({ hasDrugAllergy: e.target.checked }); }
  handleAllergicRhinitis = (e) => { this.setState({ hasAllergicRhinitis: e.target.checked }); }
  handleLatexAllergy = (e) => { this.setState({ hasLatexAllergy: e.target.checked }); }
  handlePollenAllergy = (e) => { this.setState({ hasPollenAllergy: e.target.checked }); }
  handleMoldAllergy = (e) => { this.setState({ hasMoldAllergy: e.target.checked }); }
  handleSinusAllergy = (e) => { this.setState({ hasSinusAllergy: e.target.checked }); }
  handleOtherAllergy = (e) => { this.setState({ hasOtherAllergy: e.target.checked }); }
  handleAllergiesExpanded = (e) => { this.setState({ allergiesExpanded: e.target.value }); }

  handleHasFoodMilk = (e) => { this.setState({ hasFoodAllergyMilk: e.target.checked }); }
  handleHasFoodEggs = (e) => { this.setState({ hasFoodAllergyEggs: e.target.checked }); }
  handleHasFoodPeanuts = (e) => { this.setState({ hasFoodAllergyPeanuts: e.target.checked }); }
  handleHasFoodSoy = (e) => { this.setState({ hasFoodAllergySoy: e.target.checked }); }
  handleHasFoodWheat = (e) => { this.setState({ hasFoodAllergyWheat: e.target.checked }); }
  handleHasFoodTreeNuts = (e) => { this.setState({ hasFoodAllergyTreeNuts: e.target.checked }); }
  handleHasFoodFish = (e) => { this.setState({ hasFoodAllergyFish: e.target.checked }); }
  handleHasFoodShellfish = (e) => { this.setState({ hasFoodAllergyShellfish: e.target.checked }); }
  handleHasFoodOther = (e) => { this.setState({ hasFoodAllergyOther: e.target.checked }); }

  handleGetAllergySelection = () => {
    const x = [];
    if (this.state.hasFoodAllergy === true) { x.push(1); }
    if (this.state.hasSkinAllergy === true) { x.push(2); }
    if (this.state.hasDustAllergy === true) { x.push(3); }
    if (this.state.hasInsectStingAllergy === true) { x.push(4); }
    if (this.state.hasAnimalAllergy === true) { x.push(5); }
    if (this.state.hasEyeAllergy === true) { x.push(6); }
    if (this.state.hasDrugAllergy === true) { x.push(7); }
    if (this.state.hasAllergicRhinitis === true) { x.push(8); }
    if (this.state.hasLatexAllergy === true) { x.push(9); }
    if (this.state.hasMoldAllergy === true) { x.push(10); }
    if (this.state.hasPollenAllergy === true) { x.push(11); }
    if (this.state.hasSinusAllergy === true) { x.push(12); }
    if (this.state.hasOtherAllergy === true) { x.push(13); }
    this.setState({ allergies: x.join() });
  }

  handleGetFoodAllergenSelection = () => {
    const x = [];
    if (this.state.hasFoodAllergyMilk === true) { x.push(1); }
    if (this.state.hasFoodAllergyEggs === true) { x.push(2); }
    if (this.state.hasFoodAllergyPeanuts === true) { x.push(3); }
    if (this.state.hasFoodAllergySoy === true) { x.push(4); }
    if (this.state.hasFoodAllergyWheat === true) { x.push(5); }
    if (this.state.hasFoodAllergyTreeNuts === true) { x.push(6); }
    if (this.state.hasFoodAllergyFish === true) { x.push(7); }
    if (this.state.hasFoodAllergyShellfish === true) { x.push(8); }
    if (this.state.hasFoodAllergyOther === true) { x.push(9); }
    this.setState({ foodAllergens: x.join() });
  }

  handleGuardianSuppliesFood = (e) => { this.setState({ guardianSuppliesFood: e.target.checked }); }
  handleDietaryNeeds = (e) => { this.setState({ dietaryNeeds: e.target.value }); }

  handlePhotoWaiver = (e) => { this.setState({ photoWaiver: e.target.checked }); }
  handleWaiverAgreement = (e) => { this.setState({ waiverAgreement: e.target.checked }); }

  handleSubmit = () => {
    const i = this;
    this.setState({ submitDisabled: true });
    this.props.addOrModifyStudentMutation({
      variables: {
        id: this.props.selectedstudentObj && this.props.selectedstudentObj.id,
        isParentGuardian: true,

        name: i.state.name,
        dob: moment([this.state.dobYear, this.state.dobMonth, this.state.dobDay]).format('YYYY-MM-DD'),
        currentSchoolId: i.state.currentSchool[0].id,
        classroom: i.state.classroom,

        // Medical Fields
        gender: i.state.gender,
        height: i.state.height,
        weight: i.state.weight,
        lastTetanus: i.state.lastTetanus,
        noTetanusVaccine: i.state.noTetanusVaccine,
        recentTrauma: i.state.recentTrauma,
        restrictions: i.state.restrictions,

        // Health Insurance Fields
        insId: (parseInt(i.state.insId, 10) !== -1) && i.state.insId,
        insCompanyName: i.state.insCompanyName,
        insPolicyNum: i.state.insPolicyNum,
        insGroupNum: i.state.insGroupNum,
        insHolderName: i.state.insHolderName,

        // Medications (Non-Rx) Fields
        nonRxType: i.state.nonRxType,
        nonRxNotes: i.state.nonRxNotes,
        medicationSet: i.state.medicationSet,

        // Allery Fields
        allergies: this.state.allergies,
        foodAllergens: this.state.foodAllergens,
        allergiesExpanded: i.state.allergiesExpanded,

        // Dietary Fields
        dietaryNeeds: i.state.dietaryNeeds,
        guardianSuppliesFood: i.state.guardianSuppliesFood,

        // Opt-ins, Outs
        photoWaiver: i.state.photoWaiver,
        waiverAgreement: i.state.waiverAgreement
      }
    })
      .then(({ data }) => {
        // console.log('RETURNED DATA ', data);
        i.setState({
          step: 8,
          formSubmitted: true,
          submitDisabled: false,
          data
        });
      }).catch((error) => {
        const err = String(error).replace('Error: GraphQL error:', '');
        i.setState({ err: `Error adding student: ${err}` });
      });
  }

  handleDelete = () => {
    const i = this;
    this.props.deleteStudent({
      variables: { id: this.props.selectedstudentObj.id }
    }).then(({ data }) => {
      this.props.closeModal();
    }).catch((error) => {
      i.setState({ err: 'Error removing record' });
    });
  }

  render() {
    const studentObj = this.props.selectedstudentObj && this.props.selectedstudentObj.id && this.props.selectedstudentObj;
    const currentSchoolType = (this.state.currentSchool.length > 0) &&
      _.find(this.props.schoolList.schools, { id: this.state.currentSchool[0].id }).schoolType;

    const schoolTypeClassroomOptions = currentSchoolType === 'MONTESSORI' ? schoolClassroomListMontessori : schoolClassroomListPublic;

    console.log(this.props);

    return (
      <div className="student-form">

        <button onClick={this.props.closeModal} className="close-btn">
          <FontAwesome name="close" />
        </button>

        {this.state.step !== 8 &&
          <span>
            <h3 className="center modal-header" onClick={() => console.log(this.props, this.state)}>
              {studentObj ? this.state.name : 'Add Your Child'}
            </h3>

            <div className="step-bar">
              <ul>
                <li /* onClick={() => this.gotoStep(1)} */ className={this.state.step === 1 ? 'active' : undefined}>Basic</li>
                <li /* onClick={() => this.gotoStep(2)} */ className={(this.state.step === 2 || this.state.step === 3) ? 'active' : undefined}>Medical</li>
                <li /* onClick={() => this.gotoStep(4)} */ className={this.state.step === 4 ? 'active' : undefined}>Allergies</li>
                <li /* onClick={() => this.gotoStep(5)} */ className={this.state.step === 5 ? 'active' : undefined}>Medications</li>
                <li /* onClick={() => this.gotoStep(6)} */ className={this.state.step === 6 ? 'active' : undefined}>Dietary</li>
              </ul>
            </div>
          </span>
        }

        {/* Basic Infomration */}
        {this.state.step === 1 &&
          <div className="form-step">

            <FormGroup controlId="name" validationState={this.state.nameValid}>
              <ControlLabel>Child's name</ControlLabel>
              <FormControl
                type="text"
                placeholder="First and Last name..."
                onChange={this.handleInputName}
                value={this.state.name}
                autoFocus
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="birthdate">
              <DateField
                handleMonth={this.handleDobMonth}
                handleDay={this.handleDobDay}
                handleYear={this.handleDobYear}
                handleClear={this.handleDobClear}
                minYear={2000}
                maxYear={2015}
                month={this.state.dobMonth}
                day={this.state.dobDay}
                year={this.state.dobYear}
                displayBirthdayMessage
                displayAgeCalc
              />
            </FormGroup>

            <FormGroup controlId="currentSchool" validationState={this.state.currentSchoolValid}>
              <ControlLabel>Current School</ControlLabel>
              <Typeahead
                placeholder="Search Schools..."
                onChange={currentSchool => this.setState({ currentSchool })}
                selected={this.state.currentSchool}
                options={_.map(this.props.schoolList.schools, school => (
                  { id: school.id, label: school.name }
                ))}
              />
            </FormGroup>

            <FormGroup controlId="accountTypeSelect">
              <ControlLabel>Classroom/Grade Level</ControlLabel>
              <FormControl
                componentClass="select"
                value={this.state.classroom}
                onChange={this.handleClassroom}
                required
              >
                <option value={0} disabled>Please select a class...</option>
                {_.map(schoolTypeClassroomOptions, classroom => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.label}
                  </option>
                ))}
              </FormControl>
            </FormGroup>

            <FormGroup style={{ marginTop: 30, padding: '10px 10px 0 10px', border: '1px solid #dfdfdf', borderRadius: 4 }}>
              <Checkbox
                inline
                checked={this.state.photoWaiver}
                onChange={this.handlePhotoWaiver}
              >
                <span style={{ paddingLeft: 5, fontWeight: 'bold' }}>Photo waiver</span>
              </Checkbox>{' '}
              <p className="help-block">
                Keep this checked if you are ok with your child being cited in photos we sometimes post to our website or use in presentations. Your child's name and other personal information are never cited.
              </p>
            </FormGroup>

            <div className="step-footer">
              {this.props.selectedstudentObj &&
                <Button bsStyle="link" className="btn-form-step-prev btn-link-delete" onClick={this.handleDelete}>
                  <FontAwesome name="trash" /> Delete
                </Button>
              }
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsSize="lg" bsStyle="success">
                Next
              </Button>
            </div>

          </div>
        }

        {/* General Medical Information */}
        {this.state.step === 2 &&
          <div className="form-step">

            <Row>

              <Col sm={7} md={7}>

                <FormGroup>
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.gender}
                    onChange={this.handleGender}
                    style={{ maxWidth: 290 }}
                    required
                  >
                    <option value={0} disabled>Choose...</option>
                    <option value={1}>Female</option>
                    <option value={2}>Male</option>
                    <option value={3}>Gender fluid</option>
                    <option value={4}>Non-binary / Third gender</option>
                    <option value={5}>Prefer to self-describe</option>
                    <option value={6}>Prefer not to say</option>
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <DateField
                    label="Last Tetanus"
                    minYear={2000}
                    style={{ opacity: this.state.noTetanusVaccine && 0.5 }}
                    handleMonth={this.handleLastTetanusMonth}
                    handleDay={this.handleLastTetanusDay}
                    handleYear={this.handleLastTetanusYear}
                    handleClear={this.handleLastTetanusClear}
                    month={this.state.lastTetanusMonth}
                    day={this.state.lastTetanusDay}
                    year={this.state.lastTetanusYear}
                    disabled={this.state.noTetanusVaccine}
                  />

                  <Checkbox
                    checked={this.state.noTetanusVaccine}
                    onChange={this.handleNoTetanusVaccine}
                  >
                    Not vaccinated for Tetanus
                  </Checkbox>
                </FormGroup>

              </Col>

              <Col sm={5} md={5}>

                <FormGroup controlId="name">
                  <ControlLabel>Height (feet and inches)</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="e.g. 4' 3&quot;"
                    onChange={this.handleHeight}
                    value={this.state.height}
                    style={{ maxWidth: 290 }}
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="name">
                  <ControlLabel>Weight (lbs)</ControlLabel>
                  <FormControl
                    type="number"
                    placeholder="e.g. 65lbs"
                    onChange={this.handleWeight}
                    value={this.state.weight}
                    style={{ maxWidth: 290 }}
                  />
                  <FormControl.Feedback />
                </FormGroup>

              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FormGroup controlId="accountTypeSelect" style={{ marginTop: 15 }}>
                  <ControlLabel style={{ marginBottom: 10 }}>Health Insurance Provider</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.insId}
                    onChange={this.handleSelectedInsOption}
                    required
                  >
                    <option value={0} disabled>New or existing provider...</option>
                    {this.props.myInsuranceListQuery && _.map(this.props.myInsuranceListQuery.me.insuranceSet, ins => (
                      <option key={ins.id} value={ins.id}>{ins.companyName} ({ins.policyNum})</option>
                    ))}
                    <option value={-1}>Add New Provider{this.state.name && ` for ${this.state.name}`}...</option>
                  </FormControl>

                  <p className="help-block top-10" style={{ marginBottom: 0 }}>
                    Having your insurance information on-file will help us communicate with your health provider more effecively. Should we ever have to use this information, all correspondence will be recorded and reported back to you.
                  </p>
                </FormGroup>

                {this.state.insId === -1 &&
                  <span>

                    {this.state.deferIns !== true &&
                      <FormGroup controlId="name" validationState={this.state.nameValid} style={{ marginBottom: 15, padding: '10px 15px 20px 15px', border: '1px solid #dfdfdf', background: '#FFFDF2', borderRadius: 4 }}>
                        <ControlLabel>Name of Insurance Company</ControlLabel>
                        <FormControl type="text" onChange={this.handleInsCompanyName} value={this.state.insCompanyName} />
                        <FormControl.Feedback />

                        <ControlLabel style={{ marginTop: 10 }}>Policy Number</ControlLabel>
                        <FormControl type="text" onChange={this.handleInsPolicyNum} value={this.state.insPolicyNum} />
                        <FormControl.Feedback />

                        <ControlLabel style={{ marginTop: 10 }}>Group Number</ControlLabel>
                        <FormControl type="text" onChange={this.handleInsGroupNum} value={this.state.insGroupNum} />
                        <FormControl.Feedback />

                        <ControlLabel style={{ marginTop: 10 }}>Policy Holder's Name</ControlLabel>
                        <FormControl type="text" onChange={this.handleInsHolderName} value={this.state.insHolderName} />
                        <FormControl.Feedback />
                      </FormGroup>
                    }

                    <Checkbox checked={this.state.deferIns} onChange={this.handleDeferIns}>
                      I'll provide this information at a later time.
                    </Checkbox>

                  </span>
                }
              </Col>
            </Row>


            <div className="step-footer">
              <Button bsStyle="link" className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsSize="lg" bsStyle="success">Next</Button>
            </div>
          </div>
        }

        {/* Medical Text Blobs */}
        {this.state.step === 3 &&
          <div className="form-step">
            <FormGroup controlId="recentTrauma">
              <ControlLabel>Has anything happened recently in your child’s life that may affect him/her emotionally or physically while at Nature’s Classroom Institute? If yes, please explain.</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleRecentTrauma}
                value={this.state.recentTrauma}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="restrictions">
              <ControlLabel>Are there any restrictions on your child’s activities? Please include any special health concerns (i.e. recent hospitalizations, fractured bones, etc.)</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleRestrictions}
                value={this.state.restrictions}
              />
              <FormControl.Feedback />
            </FormGroup>

            <div className="step-footer">
              <Button bsStyle="link" className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsSize="lg" bsStyle="success">Next</Button>
            </div>
          </div>
        }

        {/* Meication */}
        {this.state.step === 4 &&
          <div className="form-step">

            <Row>
              <Col sm={6} md={6}>
                <Checkbox checked={this.state.hasFoodAllergy} onChange={this.handleHasFoodAllergy}>Food Allergy</Checkbox>
                {this.state.hasFoodAllergy &&
                  <span style={{ display: 'block', marginLeft: 20, paddingLeft: 10, borderLeft: '3px solid #c8c8c8' }}>
                    <Checkbox checked={this.state.hasFoodAllergyMilk} onChange={this.handleHasFoodMilk}>Milk</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyEggs} onChange={this.handleHasFoodEggs}>Eggs</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyPeanuts} onChange={this.handleHasFoodPeanuts}>Peanuts</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergySoy} onChange={this.handleHasFoodSoy}>Soy</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyWheat} onChange={this.handleHasFoodWheat}>Wheat</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyTreeNuts} onChange={this.handleHasFoodTreeNuts}>Tree nuts</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyFish} onChange={this.handleHasFoodFish}>Fish</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyShellfish} onChange={this.handleHasFoodShellfish}>Shellfish</Checkbox>
                    <Checkbox checked={this.state.hasFoodAllergyOther} onChange={this.handleHasFoodOther}>Other</Checkbox>
                  </span>
                }
                <Checkbox checked={this.state.hasSkinAllergy} onChange={this.handleSkinAllergy}>Skin Allergy</Checkbox>
                <Checkbox checked={this.state.hasDustAllergy} onChange={this.handleDustAllergy}>Dust Allergy</Checkbox>
                <Checkbox checked={this.state.hasInsectStingAllergy} onChange={this.handleInsectStingAllergy}>Insect Sting Allergy</Checkbox>
                <Checkbox checked={this.state.hasAnimalAllergy} onChange={this.handleAnimalAllergy}>Animal Allergies</Checkbox>
                <Checkbox checked={this.state.hasEyeAllergy} onChange={this.handleEyeAllergy}>Eye Allergy</Checkbox>
                <Checkbox checked={this.state.hasOtherAllergy} onChange={this.handleOtherAllergy}>Other</Checkbox>
              </Col>
              <Col sm={6} md={6}>
                <Checkbox checked={this.state.hasDrugAllergy} onChange={this.handleDrugAllergy}>Drug Allergies</Checkbox>
                <Checkbox checked={this.state.hasAllergicRhinitis} onChange={this.handleAllergicRhinitis}>Allergic Rhinitis (hay fever)</Checkbox>
                <Checkbox checked={this.state.hasLatexAllergy} onChange={this.handleLatexAllergy}>Latex Allergy</Checkbox>
                <Checkbox checked={this.state.hasMoldAllergy} onChange={this.handleMoldAllergy}>Mold Allergy</Checkbox>
                <Checkbox checked={this.state.hasPollenAllergy} onChange={this.handlePollenAllergy}>Pollen Allergy</Checkbox>
                <Checkbox checked={this.state.hasSinusAllergy} onChange={this.handleSinusAllergy}>Sinus Infection</Checkbox>
              </Col>
            </Row>

            <FormGroup style={{ marginTop: 20 }}>
              <ControlLabel>Details / additional comments...</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleAllergiesExpanded}
                value={this.state.allergiesExpanded}
              />
              <FormControl.Feedback />
            </FormGroup>

            <div className="step-footer">
              <Button bsStyle="link" className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsSize="lg" bsStyle="success">Next</Button>
            </div>
          </div>
        }

        {/* Allergies */}
        {this.state.step === 5 &&
          <div className="form-step">

            <FormGroup>
              <ControlLabel>If necessary, NCI can provide over-the-counter pain relief. Which of these pain relief choices do you prefer administered if your child becomes ill, gets a headache, catches a cold or older *minor* medical or dental issues.</ControlLabel>
              <Radio onChange={this.handleNonRxType} value={1} name="nonRxType" checked={this.state.nonRxType === 1}>None</Radio>
              <Radio onChange={this.handleNonRxType} value={2} name="nonRxType" checked={this.state.nonRxType === 2}>Tylenol</Radio>
              <Radio onChange={this.handleNonRxType} value={3} name="nonRxType" checked={this.state.nonRxType === 3}>Ibuprofen</Radio>
              <Radio onChange={this.handleNonRxType} value={4} name="nonRxType" checked={this.state.nonRxType === 4}>Tylenol or Ibuprofen</Radio>
            </FormGroup>


            <FormGroup controlId="nonRxNotes" style={{ marginTop: 25 }}>
              <ControlLabel>Any non-prescrition medical instructions, conditions or comments?</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleNonRxNotes}
                value={this.state.nonRxNotes}
              />
              <FormControl.Feedback />
            </FormGroup>

            {_.isEmpty(this.state.medicationSet)
              ? <Button bsStyle="primary" onClick={this.handleInitMedicationList}>
                <FontAwesome name="plus" fixedWidth /> Add Medication
              </Button>
              : <MedicationForm
                items={this.state.medicationSet}
                handleAdd={this.handleMedicationAdd}
                handleRemove={this.handleMedicationRemove}
                formError={this.state.medicationSetFormError}
                handleMedMedicationName={this.handleMedMedicationName}
                handleMedAmountHuman={this.handleMedAmountHuman}
                handleMedNotes={this.handleMedNotes}
                handleMedAdministrationTimes={this.handleMedAdministrationTimes}
                handleMedAdministrationTimesOther={this.handleMedAdministrationTimesOther}
              />
            }

            <div className="step-footer">
              <Button bsStyle="link" className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsSize="lg" bsStyle="success">Next</Button>
            </div>
          </div>
        }

        {/* Dietary */}
        {this.state.step === 6 &&
          <div className="form-step">

            <FormGroup controlId="dietaryNeeds">
              <ControlLabel>Dietary Needs / Details</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleDietaryNeeds}
                value={this.state.dietaryNeeds}
              />
              <FormControl.Feedback />
            </FormGroup>

            <Checkbox checked={this.state.guardianSuppliesFood} onChange={this.handleGuardianSuppliesFood}>
              We (Parent/Gaurdians) will supply our own food
            </Checkbox>

            <div className="step-footer">
              <Button bsStyle="link" className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsSize="lg" bsStyle="success">Review</Button>
            </div>
          </div>
        }

        {/* Review */}
        {this.state.step === 7 &&
          <div className="form-step">

            <StudentFormReview
              student={this.state}
              myInsuranceListQuery={this.props.myInsuranceListQuery}
            />

            <FormGroup style={{ background: '#fff6b5', padding: '10px 10px 0 10px', border: '1px solid #dfdfdf', borderRadius: 4 }}>
              <Checkbox
                inline
                checked={this.state.waiverAgreement}
                onChange={this.handleWaiverAgreement}
              >
                <span style={{ paddingLeft: 5, fontWeight: 'bold' }}>Medical Authorization, Youth Waiver & Release of Liability</span>
              </Checkbox>{' '}
              <p className="help-block">
                I have read the medical authorization, waiver and release, and understand my rights by signing it and sign it voluntarily. <a href="discovernci_media/waiver.pdf" target="_blank" rel="noopener noreferrer">View Waiver and Release of Liability Agreement</a>.
              </p>
            </FormGroup>

            <div className="step-footer">
              <Button bsStyle="link" className="btn-form-step-prev" onClick={this.prevFormStep}>Back</Button>
              <Button className="btn-form-step-next" onClick={this.nextFormStep} bsStyle="success" disabled={!this.state.waiverAgreement}>Save</Button>
            </div>
          </div>
        }

        {/* Confirmation */}
        {this.state.step === 8 &&
          <div className="form-step center">

            <span style={{ display: 'block', marginTop: 50, fontSize: '7em', color: '#5cc700', lineHeight: 0 }}><FontAwesome name="check-circle" /></span>
            <h3 style={{ lineHeight: '1.3em' }}>{this.state.name}
              <br />has been added successfully.</h3>
            <div className="step-footer">
              <Button className="btn-form-step-next" onClick={this.props.closeModal}>Close</Button>
            </div>
          </div>
        }

      </div>
    );
  }
}

const MY_INSURANCE_LIST_QUERY = gql`
  query {
    me {
      id
      insuranceSet {
        id
        companyName
        policyNum
      }
    }
  }`;

const ADD_STUDENT_MUTATION = gql`
  mutation AddStudentQuery(
    $id: Int
    $isParentGuardian: Boolean
    $parentGuardianEmail: String

    $name: String!
    $dob: String!
    $currentSchoolId: Int!
    $classroom: Int!

    $gender: Int
    $height: String
    $weight: String
    $lastTetanus: String
    $noTetanusVaccine: Boolean
    $recentTrauma: String
    $restrictions: String

    $insId: Int
    $insCompanyName: String
    $insGroupNum: String
    $insPolicyNum: String
    $insHolderName: String

    $nonRxType: Int!
    $nonRxNotes: String
    $medicationSet: String

    $allergies: String
    $foodAllergens: String
    $allergiesExpanded: String

    $dietaryNeeds: String
    $guardianSuppliesFood: Boolean

    $photoWaiver: Boolean
    $waiverAgreement: Boolean!
  ) {
    addOrModifyStudent(
      id: $id
      isParentGuardian: $isParentGuardian
      parentGuardianEmail: $parentGuardianEmail

      name: $name
      dob: $dob
      currentSchoolId: $currentSchoolId
      classroom: $classroom

      gender: $gender
      height: $height
      weight: $weight
      lastTetanus: $lastTetanus
      noTetanusVaccine: $noTetanusVaccine
      recentTrauma: $recentTrauma
      restrictions: $restrictions

      insId: $insId
      insCompanyName: $insCompanyName
      insGroupNum: $insGroupNum
      insPolicyNum: $insPolicyNum
      insHolderName: $insHolderName

      nonRxType: $nonRxType
      nonRxNotes: $nonRxNotes
      medicationSet: $medicationSet

      allergies: $allergies
      foodAllergens: $foodAllergens
      allergiesExpanded: $allergiesExpanded

      dietaryNeeds: $dietaryNeeds
      guardianSuppliesFood: $guardianSuppliesFood

      photoWaiver: $photoWaiver
      waiverAgreement: $waiverAgreement
    ) {
      student {
        id
        name
        guid
        created
        dob
        photoWaiver
        modified
        waiverAgreement
        guardianList {
          id
          email
        }
      }
      medicalRecord {
        id
        gender
        height
        weight
        lastTetanus
        noTetanusVaccine
        recentTrauma
        restrictions
        created
        nonRxType
        nonRxNotes
        allergies
        foodAllergens
        allergiesExpanded
        dietaryNeeds
        guardianSuppliesFood
        modified
      }
      insurance {
        id
        companyName
        groupNum
        policyNum
        holderName
        modified
        dependentsList {
          id
          firstName
        }
        account {
          id
          name
        }
      }
    }
  }`;

const DELETE_STUDENT = gql`
  mutation DeleteStudentMutation(
    $id: Int!
  ) {
    deleteStudent(
      id: $id
    ) {
      success
    }
  }`;

const StudentForm = compose(
  graphql(ADD_STUDENT_MUTATION, { name: 'addOrModifyStudentMutation' }),
  graphql(MY_INSURANCE_LIST_QUERY, { name: 'myInsuranceListQuery' }),
  graphql(DELETE_STUDENT, { name: 'deleteStudent' })
)(StudentFormContainer);

export default StudentForm;
