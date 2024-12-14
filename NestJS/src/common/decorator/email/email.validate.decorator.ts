import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { MailEntity } from 'src/cores/mail/mail.entity';
import { MailEntityRepository } from 'src/cores/mail/mail.repository';

@ValidatorConstraint({ name: 'IsEmailConfirmed', async: true })
@Injectable()
export class IsEmailConfirmedConstraint implements ValidatorConstraintInterface {
    private logger = new Logger(IsEmailConfirmedConstraint.name);
    constructor(@InjectRepository(MailEntity) private readonly mailRepository: MailEntityRepository) { }
    async validate(mail, args: ValidationArguments) {
        try {
            const data = await this.mailRepository.findOne({ where: { email: mail } });
            this.logger.log(JSON.stringify(mail));

            if (!data.isConfirmed) return false;

            return true;
        } catch (error) {
            this.logger.error(error);
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `Email ${args.value} is not confirmed`;
    }
}

export function IsEmailConfirmDecorator(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsEmailConfirmed',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsEmailConfirmedConstraint,
        });

    };
}


@ValidatorConstraint({ name: 'IsEmailExist', async: true })
@Injectable()
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
    private logger = new Logger(IsEmailExistConstraint.name);
    constructor(@InjectRepository(MailEntity) private readonly mailRepository: MailEntityRepository) { }
    async validate(mail, args: ValidationArguments) {
        try {
            const data = await this.mailRepository.findOne({ where: { email: mail } });
            this.logger.log(JSON.stringify(data));
            this.logger.log(JSON.stringify(mail));

            if (data) return false;

            return true;
        } catch (error) {
            this.logger.error(error);
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `Email ${args.value} is already exist`;
    }
}

export function IsEmailExistDecorator(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsEmailExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsEmailExistConstraint,
        });
    };
}


