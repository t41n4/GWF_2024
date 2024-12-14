import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsEmailConfirmDecorator, IsEmailExistDecorator } from "src/common/decorator/email/email.validate.decorator";


export class MailDTO {

    @ApiProperty({
        type: "string",
        required: true,
        example: "to@example.com"
    })
    @IsNotEmpty()
    @IsEmail()
    @IsEmailExistDecorator()
    @IsEmailConfirmDecorator()
    to: string;

    @ApiProperty({
        type: "string",
        required: true,
        example: "Ho Chi Minh"
    })
    @IsNotEmpty()
    @IsString()
    location: string;



    // @ApiProperty({
    //     type: "string",
    //     required: true,
    //     example: "from@example.com"
    // })
    // @IsNotEmpty()
    // @IsEmail(
    //     {
    //         allow_ip_domain: false,
    //         allow_utf8_local_part: true,
    //         require_tld: true,
    //     },
    //     {
    //         message: "Invalid email"
    //     }
    // )
    // from: string;

    // @ApiProperty({
    //     type: "string",
    //     required: true,
    //     example: "Subject"
    // })
    // @IsNotEmpty()
    // subject: string;

    // @ApiProperty(
    //     {
    //         type: "string",
    //         required: true,
    //         example: "Text"
    //     }
    // )
    // @IsNotEmpty()
    // text: string;

    // @ApiProperty(
    //     {
    //         type: "string",
    //         required: false,
    //         example: "normal"
    //     }
    // )
    // @IsNotEmpty()
    // @Matches(/^(high|normal|low)$/, {
    //     message: "Priority must be high, normal or low"
    // })
    // priority: "high" | "normal" | "low";
}