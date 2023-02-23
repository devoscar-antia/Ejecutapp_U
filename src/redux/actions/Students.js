export const Types = {
  SetSelectedStudent: 'students.setSelectedStudent',
  FetchAllOwnStudents: 'students.fetchAllOwnStudents',
  SetAllOwnStudents: 'students.setAllOwnStudents',
  RequestFailure: 'students.requestFailure',
  CreateStudent: 'students.createStudent',
  AddCreatedStudent: 'students.addCreatedStudent',
  AddOwnStudentResult: 'students.addOwnStudentResult',
  StudentHasCompletedGame: 'student.getStudentCompletedGames',
};

export const Actions = {
  setSelectedStudent: selectedStudent => ({
    type: Types.SetSelectedStudent,
    selectedStudent,
  }),
  fetchAllOwnStudents: userEmail => ({
    type: Types.FetchAllOwnStudents,
    userEmail,
  }),
  addOwnStudentResult: (game, studentCode, data) => ({
    type: Types.AddOwnStudentResult,
    game,
    studentCode,
    data,
  }),
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
  ) => ({
    type: Types.CreateStudent,
    names,
    surnames,
    code,
    birthDate,
    institution,
    country,
    city,
    sex,
    instructor,
  }),
  studentHasCompletedGame: (id, game, gameId) => ({
    type: Types.StudentHasCompletedGame,
    id,
    game,
    gameId,
  }),
  addCreatedStudent: createdStudent => ({
    type: Types.AddCreatedStudent,
    createdStudent,
  }),
  setAllOwnStudents: studentsList => ({
    type: Types.SetAllOwnStudents,
    studentsList,
  }),
  requestFailure: error => ({type: Types.RequestFailure, error}),
};
