import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { MailEntity } from "./mail.entity";
import { BaseAbstractRepostitory } from "src/common/base.repository";
import { MailRepositoryInterface } from "./mail.interface";


export class MailEntityRepository
    extends BaseAbstractRepostitory<MailEntity>
    implements MailRepositoryInterface {
    constructor(@InjectRepository(MailEntity)
    private readonly MailEntityRepository: Repository<MailEntity>) {
        super(MailEntityRepository)
    }
}