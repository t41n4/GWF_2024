'use client';

import { createContext, useContext, useState } from 'react';
import { ProcessedgwfQuestion } from './question-phase/page';

const UserDataContext = createContext<UserDataContextType>({
    state: {
        nickname: '',
        answers: [],
    }, actions: {
        setNickname: () => { },
        setAnswers: () => {
        }
    }
});

interface UserDataContextType {
    state: {
        nickname: string;
        answers: ProcessedgwfQuestion[];
    };
    actions: {
        setNickname: (nickname: string) => void;
        setAnswers: (answers: ProcessedgwfQuestion[]) => void;
    };
};

export function Providers({
    children,
}: {
    children: React.ReactNode;
}) {

    const [nickname, setNickname] = useState('');
    const [answers, setAnswers] = useState<ProcessedgwfQuestion[]>([]);

    const value = {
        state: {
            nickname,
            answers,
        },
        actions:
        {
            setNickname,
            setAnswers,
        }
    }
    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

export function useUser() {
    return useContext(UserDataContext);
}