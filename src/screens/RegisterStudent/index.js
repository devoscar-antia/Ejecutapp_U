import {connect} from 'react-redux';
import RegisterStudentScreen from './RegisterStudentScreen';
import * as Students from '../../redux/actions/Students';

const mapStateToProps = state => {
  return {
    user: state.auth.userEmail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createStudent: (
      names,
      surnames,
      code,
      birthDate,
      institution,
      country,
      city,
      sex,
      instructor,
    ) =>
      dispatch(
        Students.Actions.createStudent(
          names,
          surnames,
          code,
          birthDate,
          institution,
          country,
          city,
          sex,
          instructor,
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterStudentScreen);
