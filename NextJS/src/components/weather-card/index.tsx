
import { Condition } from '@/common/weather.type';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import './weather-card.scss';
import clsx from 'clsx';

type WeatherProps = {
    location: string;
    temperature: string;
    date: string;
    humidity: string;
    wind: string;
    condition: Condition;
    variant: 'current' | 'forecast';
} & React.HTMLAttributes<HTMLDivElement>;

export function WeatherCard({ location, temperature, date, humidity, wind, condition, variant, ...props }: WeatherProps) {
    return (
        variant === 'current' ? (
            <Card className={clsx('weather-card-current flex', props.className)}>
                <CardHeader>
                    <div className='font-heading'>{`${location}(${date})`}</div>
                    <div className='temperature'>{`Temperature ${temperature} °C`}</div>
                    <div className='humidity'>{`Humidity ${humidity}%`}</div>
                    <div className='wind'>{`Wind ${wind}M/S`}</div>
                </CardHeader>

                <CardContent className='flex items-center'>
                    <div className='weather-description min-w-[170px] flex justify-end items-center flex-col'>
                        <Image src={`https:${condition.icon}`} alt={condition.text} width={80} height={80} />
                        <span>{condition.text}</span>
                    </div>
                </CardContent>
            </Card>)
            : (
                <Card className={clsx('weather-card', props.className)}>
                    <CardHeader>
                        <div className='date font-heading'>{date}</div>
                    </CardHeader>

                    <CardContent>
                        <div className='weather-description min-w-[170px]'>
                            <Image src={`https:${condition.icon}`} alt={condition.text} width={50} height={50} />
                            <span>{condition.text}</span>
                        </div>
                        <div className='temperature'>{`Temp ${temperature} °C`}</div>
                        <div className='humidity'>{`Humidity ${humidity}%`}</div>
                        <div className='wind'>{`Wind ${wind}M/S`}</div>
                    </CardContent>
                </Card>
            )
    );
}