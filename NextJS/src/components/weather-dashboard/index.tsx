'use client'

import { Divider } from '@/components/divider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import env from '@/config';
import { axiosGetter, axiosPoster } from '@/lib/axios';
import logger from '@/lib/logger';
import './weather-dashboard.scss';

import { WeatherType } from '@/common/weather.type';
import {
    Field,
    FieldProps,
    Form,
    Formik
} from 'formik';
import { useState } from 'react';
import { WeatherCard } from '../weather-card';

type Props = {}

const search_path = '/weather/search';
const subscribe_path = '/mail/subscribe';
const unsubscribe_path = '/mail/unsubscribe';
const resend_path = '/mail/resend';
const page_size = 4;

import { IsStringEmpty } from '@/lib/utils';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


enum EmailState {
    SUBSCRIBE = 'Subscribe',
    EMAIL_NOTCONFIRM = 'Resend',
    EMAIL_EXIST = 'Email already exist',
}

enum EmailError {
    EMPTY_LOCATION = "location should not be empty",
    NOT_CONFIRMED = "not confirmed",
    ALREADY_EXIST = "already exist"
}

export default function WeatherDashBoard({ }: Props) {
    const [weather, setWeather] = useState<WeatherType | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [emailState, setEmailState] = useState<EmailState>(EmailState.SUBSCRIBE);
    const [emailError, setEmailError] = useState(false);

    const [resendCountdown, setResendCountdown] = useState(3);

    const handleEmailAction = (email: string) => {
        if (emailState === EmailState.SUBSCRIBE) {
            subscribeToWeatherData(email);
        } else if (emailState === EmailState.EMAIL_EXIST) {
            unsubscribeToWeatherData(email);
        } else if (emailState === EmailState.EMAIL_NOTCONFIRM) {
            resendEmail(email);
        }
    }

    const searchWeatherData = async (query: string, page: number) => {
        console.log("🚩 ~ searchWeatherData ~ page:", page);
        try {
            const url = `${env.BACKEND_URL}${search_path}?location=${query}&page=${page}&pageSize=${page_size}`;
            console.log("🚩 ~ fetchData ", url);
            setIsLoading(true);
            const response = await axiosGetter<{ data: { page: WeatherType, total: number } }>(url);
            setIsLoading(false);
            // append data to existing weather data
            if (page_size > response.data.total) {
                setHasMore(false);
            }
            if (weather && page > 1) {
                setPage(page);
                setWeather({
                    ...weather,
                    forecast: {
                        forecastday: [
                            ...weather.forecast.forecastday,
                            ...response.data.page.forecast.forecastday
                        ]
                    }
                });
            } else {
                setWeather(response.data.page);
                setPage(1);
                setHasMore(true);
            }
        } catch (error) {
            logger.error('Error fetching weather data');
        }
    }

    const subscribeToWeatherData = async (email: string) => {
        try {
            const url = `${env.BACKEND_URL}${subscribe_path}`;
            const response = await axiosPoster(url, { to: email, location: query })
            console.log("🚩 ~ subscribeToWeatherData ~ url:", url);
            if (response) {
                toast.success('Check your email to confirm subscription');
                setEmailError(false);
                setEmailState(EmailState.EMAIL_NOTCONFIRM);
            }
        } catch (error) {
            const axiosError = error as AxiosError<any>;
            if (axiosError.response?.status === 400) {
                const { message } = axiosError.response.data;
                const arrayMessage = message as string[];
                setEmailError(true);
                // toast priority 1: location is required
                // toast priority 2: email not confirmed
                // toast priority 3: email already subscribed
                // re-order array 
                const reorderedArray = [
                    ...arrayMessage.map((item) => {
                        if (item.includes(EmailError.EMPTY_LOCATION)) {
                            return EmailError.EMPTY_LOCATION;
                        } else if (item.includes(EmailError.NOT_CONFIRMED)) {
                            return EmailError.NOT_CONFIRMED;
                        } else if (item.includes(EmailError.ALREADY_EXIST)) {
                            return EmailError.ALREADY_EXIST;
                        }
                    })
                ]
                console.log("🚩 ~ subscribeToWeatherData ~ reorderedArray:", reorderedArray);

                if (reorderedArray[0]?.includes(EmailError.EMPTY_LOCATION)) {
                    toast.error('City name is required');
                    setEmailState(EmailState.SUBSCRIBE);
                } else if (reorderedArray[0]?.includes(EmailError.NOT_CONFIRMED)) {
                    setEmailState(EmailState.EMAIL_NOTCONFIRM);
                    toast.error('Please check your email to confirm');
                } else if (reorderedArray[0]?.includes(EmailError.ALREADY_EXIST)) {
                    setEmailState(EmailState.EMAIL_EXIST);
                    toast.success('Already subscribed');
                }
            }
            else {
                toast.error('Error subscribing');
            }
        }
    }

    const unsubscribeToWeatherData = async (email: string) => {
        try {
            const url = `${env.BACKEND_URL}${unsubscribe_path}`;
            const response = await axiosPoster(url, { to: email, location: query })
            console.log("🚩 ~ unsubscribeToWeatherData ~ url:", url);
            if (response) {
                toast.success('Unsubscribed successfully');
                setEmailError(false);
                setEmailState(EmailState.SUBSCRIBE);
            }
        } catch (error) {
            toast.error('Error unsubscribing');
        }
    }

    const resendEmail = async (email: string) => {
        try {
            const url = `${env.BACKEND_URL}${resend_path}`;
            const response = await axiosPoster(url, { to: email, location: query })
            console.log("🚩 ~ resendEmail ~ url:", url);
            if (response) {
                toast.success('Email resent successfully');
                setEmailError(false);
                setEmailState(EmailState.EMAIL_EXIST);
            }
        } catch (error) {
            toast.error('Error resending email');
        } finally {
            if (resendCountdown > 0) {
                setTimeout(() => {
                    setResendCountdown(resendCountdown - 1);
                }, 1000);
            } else {
                setResendCountdown(3);
            }
        }
    }

    return (
        <section className="container">
            <Card className='action'>
                <Formik
                    initialValues={{ query: '' }}
                    onSubmit={(values, actions) => {
                        setQuery(values.query);
                        searchWeatherData(values.query, 1);
                    }}
                    validate={(values) => {
                        const errors: { query?: string } = {};
                        if (IsStringEmpty(values.query)) {
                            errors.query = 'City name is required';
                        }
                        return errors;
                    }}>
                    {({ errors, touched, values }) => (
                        <Form className='search'
                            onChange={() => {
                                console.log("🚩 ~ WeatherDashBoard ~ values.query", values.query)
                                setQuery(values.query)
                            }}
                        >
                            <Field name='query'
                            >
                                {({ field }: FieldProps) => (
                                    <Input type='text' placeholder='Enter city name' {...field} />
                                )}
                            </Field>
                            {errors.query && touched.query && <div className='text-red-500'>{errors.query}</div>}
                            <Button className='bg-button-primary w-full' type='submit'>Search</Button>
                        </Form>
                    )}


                </Formik>

                <Divider text='or' />

                <Button className='bg-button-primary w-full' disabled>Use my location</Button>

                <Divider text='or' />
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={(values, actions) => {
                        setIsLoading(true);
                        handleEmailAction(values.email);
                        setIsLoading(false);
                    }}
                    validate={(values) => {
                        const errors: { email?: string } = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className='mail' >
                            <p>Subscribe to weather updates</p>
                            <Field name='email'>
                                {({ field }: FieldProps) => (
                                    <Input type='text'
                                        placeholder='Enter your email'
                                        {...field}
                                    />
                                )}
                            </Field>
                            {errors.email && touched.email && <div className='text-red-500'>{errors.email}</div>}
                            <Button className='bg-button-primary w-full' type='submit' disabled={
                                !(resendCountdown > 0)
                            }>
                                <EmailActionText emailState={emailState} isLoading={isLoading} />
                            </Button>
                        </Form>
                    )}
                </Formik>


            </Card>

            <div className='weather'>
                {weather &&
                    <WeatherCard
                        location={weather.location.name}
                        temperature={weather.current.temp_c.toString()}
                        date={weather.current.last_updated}
                        humidity={weather.current.humidity.toString()}
                        wind={weather.current.wind_kph.toString()}
                        condition={weather.current.condition}
                        variant='current'
                    />

                }
                <div className='forecast-weather'>
                    {weather && weather.forecast.forecastday.map((item, index) => {
                        return (
                            <WeatherCard
                                key={index}
                                location={weather.location.name}
                                temperature={item.day.avgtemp_c.toString()}
                                date={item.date}
                                humidity={item.day.avghumidity.toString()}
                                wind={item.day.maxwind_kph.toString()}
                                condition={item.day.condition}
                                variant='forecast'
                            />
                        )
                    })}
                </div>

                {weather && weather.forecast.forecastday.length > 0 && (
                    <Button
                        className='bg-button-primary w-full'
                        onClick={() => {
                            searchWeatherData(query, page + 1);
                        }}
                        disabled={!hasMore}
                    >
                        Load more
                    </Button>
                )}
                {!weather && !isLoading && <p>No data found</p>}
                {isLoading && <CircleLoader />}
            </div>

        </section >
    )
}


const EmailActionText = ({ emailState, isLoading }: { emailState: EmailState, isLoading: boolean }) => {
    switch (emailState) {
        case EmailState.EMAIL_EXIST:
            return isLoading ? <ButtonCircleLoader /> : 'Unsubscribe';
        case EmailState.EMAIL_NOTCONFIRM:
            return isLoading ? <ButtonCircleLoader /> : 'Resend';
        default:
            return isLoading ? <ButtonCircleLoader /> : 'Subscribe';
    }
}

const CircleLoader = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
            </div>
        </div>
    )
}

const ButtonCircleLoader = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900">
            </div>
        </div>
    )
}