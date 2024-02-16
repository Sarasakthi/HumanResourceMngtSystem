/*-------------------------------------------------------------------
|  🐼 Input Validators 
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
|  🐸 Returns:  -
*-------------------------------------------------------------------*/
import * as moment from 'moment'
export const firstname_validation = {
  name: 'firstname',
  label: 'Firstname',
  type: 'text',
  id: 'firstname',
  placeholder: 'Type Firstname ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },

}

export const lastname_validation = {
  name: 'lastname',
  label: 'Lastname',
  type: 'text',
  id: 'lastname',
  placeholder: 'Type Lastname ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },

}

export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'Password',
  type: 'password',
  id: 'password',
  placeholder: 'Type password ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
  },
}

export const num_validation = {
  name: 'num',
  label: 'number',
  type: 'number',
  id: 'num',
  placeholder: 'write a random number',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const email_validation = {
  name: 'email',
  label: 'Email',
  type: 'email',
  id: 'email',
  placeholder: 'Type email address',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'not valid',
    },
  },
}

export const dateofjoining_validation = {
  name: 'dateofjoining',
  label: 'Date of joining',
  type: 'date',
  id: 'dateofjoining',
  placeholder: 'Type date of joining',
 dateformat : true,
  validation: {
    required: {
    
      value:true,
      message: 'required',
    },
    pattern: {
      value:
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      message: 'not valid',
    },
  },
}

export const dateofbirth_validation = {
  name: 'dateofbirth',
  label: 'Date of birth',
  type: 'date',
  id: 'dateofbirth',
  placeholder: 'Type date of birth',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      message: 'not valid',
    },
  },
}

export const department_validation = {
  name : 'department',
 label:'Department',
 id:'department',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    
  },
}

export const position_validation = {
  name: 'position',
  label: 'Position',
  type: 'text',
  id: 'position',
  placeholder: 'Type position ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },

}

export const manager_validation = {
  name : 'reportingto',
 label:'Reporting to',
 id:'reportingto',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    
  },
}