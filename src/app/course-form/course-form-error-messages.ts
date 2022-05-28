export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ){}
}

export const CourseFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Kurstitel muss angegeben werden'),
  new ErrorMessage('description', 'required', 'Es muss eine Beschreibung angegeben werden'),
  new ErrorMessage('semester', 'required', 'Es muss ein Semester angegeben werden'),
  new ErrorMessage('semester', 'min', 'Semester muss mind. 1 sein'),
  new ErrorMessage('semester', 'max', 'Semester kann max. 6 sein')
];
