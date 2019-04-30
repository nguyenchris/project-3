import React from 'react';
import ReactWizard from 'react-bootstrap-wizard';
import { Container, Row, Col } from 'reactstrap';
import FirstStep from './Step1';
import SecondStep from './Step2';
class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: null
    };
  }

  render() {
    return (
      <div>
        <h5 className="info-text">Please confirm your Profile</h5>
      </div>
    );
  }
}
const steps = [
  { stepName: 'About Me', stepIcon: 'tim-icons icon-single-02', component: FirstStep },
  { stepName: 'Profile Image', stepIcon: 'tim-icons icon-settings-gear-63', component: SecondStep },
  { stepName: 'confirm', stepIcon: 'tim-icons icon-check-2', component: ThirdStep }
];
class ProfileForm extends React.Component {
  finishButtonClick(e) {
    console.log(e);
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={12} md={12} className="mr-auto ml-auto">
            <ReactWizard
              steps={steps}
              navSteps
              title={`Create Profile`}
              description={`Welcome ${
                this.props.userState.name
              }! Please create your profile to get started.`}
              headerTextCenter
              validate
              progressbar={true}
              color="blue"
              finishButtonClasses="btn-wd btn-success"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              finishButtonClick={e => this.props.finishButtonClick(e)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileForm;
