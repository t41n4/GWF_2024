import * as Yup from 'yup';

export const userInitialValues: FormikValues = { nickname: '', answers: [] };

export interface FormikValues {
    nickname: string;
    answers: QuestionAnswer[];
}

export interface QuestionAnswer {
    question: string;
    answer: string;
}

export const NicknameSchema = Yup.object().shape({
    nickname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Một cái tôi nên có một cái tên'),
});