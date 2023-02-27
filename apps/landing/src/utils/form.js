import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { inputs, sendMail } from 'utils';
import { getAnswers } from './parser';
import {
  Checkbox,
  Radio,
  CheckboxInput,
  RadioInput,
  TextInput,
  TextareaInput,
} from 'styles';

const getInput = (type) => {
  switch (type) {
    case inputs?.radio:
      return RadioInput;

    case inputs?.text:
    case inputs?.email:
      return TextInput;

    case inputs?.textarea:
      return TextareaInput;

    default:
      return CheckboxInput;
  }
};

const getComponent = (type) => {
  if (type === inputs?.radio) return Radio;
  return Checkbox;
};

const getInitialObject = (template) => {
  switch (template) {
    case 'join':
      return {
        email: '',
      };

    case 'help':
      return {
        currentType: '',
        visibleQuestionIndex: 0,
        currentWarning: '',
        questions: {},
      };

    default:
      return {
        email: '',
        message: '',
      };
  }
};

const getNotificationMessages = ({ locale, template }) => {
  const translations = require(`../../src/languages/${locale}`).default.email
    .responseMessages;

  const {
    pending = '',
    error = '',
    [template]: { success = '' } = {},
  } = translations;

  return {
    pending,
    success,
    error,
  };
};

const notify = (func, { ...props }) =>
  toast.promise(func, getNotificationMessages(props));

const initialFormStructure = (template, optionalData = {}) => {
  let initialObject = getInitialObject(template);
  return { ...initialObject, ...optionalData };
};

const getNewState = ({
  questions,
  visibleQuestionId,
  currentQuestionState = {},
  showOther,
  textInput,
}) => {
  const currentQuestion = questions?.[visibleQuestionId];

  return {
    questions: {
      ...questions,
      [visibleQuestionId]:
        !showOther && (textInput || textInput === '')
          ? textInput
          : {
              ...currentQuestion,
              ...currentQuestionState,
            },
    },
  };
};

const useFormState = ({
  setFormObject,
  template,
  initialData,
  defaultDisabled = false,
} = {}) => {
  const { locale } = useRouter();
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState(defaultDisabled);

  const sentSuccessfully = () => {
    setFormObject(initialFormStructure(template, initialData));
    setSubmitButtonDisabled(false);
    return Promise.resolve();
  };

  const onSubmit = ({ e, formObject = {}, apiRequest = false }) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);

    let mailProps = {
      locale,
      template,
      sentSuccessfully,
      formObject: { answers: formObject },
    };

    if (apiRequest) {
      const answers = getAnswers(formObject, template);
      const url = '/api/send-email-marketing';
      mailProps = { ...mailProps, url, formObject: answers };
    }

    notify(sendMail({ ...mailProps }), { locale, template });
  };

  return { submitButtonDisabled, onSubmit };
};

export default {
  getInput,
  getComponent,
  useFormState,
  getNewState,
  initialFormStructure,
};
