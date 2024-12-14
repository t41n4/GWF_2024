import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MailDTO } from "./mail.dto";
import { MailService } from "./mail.service";

@ApiTags('Mailer')
@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) { }

    @Post("subscribe")
    @ApiBody({ type: MailDTO })
    @ApiOperation({
        summary: 'Send email to confirm registration for weather forecast news',
        // description: 'Lorem ipsum ....',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Email sent successfully',
    })
    async sendConfirmMail(@Body() body: MailDTO, @Res() response) {
        try {
            const res = await this.mailService.subscribeDailyMail(body);
            return response.status(HttpStatus.OK).json({
                message: res,
                status_code: 200,
                date: new Date().toISOString(),
                data: res,
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Failed to send email',
                status_code: 500,
                date: new Date().toISOString(),
            });
        }
    }

    @Get("confirm")
    @ApiOperation({
        summary: 'Confirm registration for weather forecast news',
        // description: 'Lorem ipsum ....',
    })
    @ApiQuery({ name: 'token', type: 'string', required: true, example: 'token', description: 'Token' })
    async confirmMail(@Res() response, @Query('token') token: string) {
        try {
            const res = await this.mailService.confirmSubscription(token);
            return response.status(HttpStatus.OK).json({
                message: "Email confirmed successfully",
                status_code: 200,
                date: new Date().toISOString(),
            });
        } catch (error) {
            return response.status(500).json({
                message: error.message,
                status_code: 500,
                date: new Date().toISOString(),
            });
        }
    }

    @Post("unsubscribe")
    @ApiOperation({
        summary: 'Unsubscribe registration for weather forecast news',
        // description: 'Lorem ipsum ....',
    })
    @ApiQuery({ name: 'email', type: 'string', required: true, example: 'email', description: 'Email' })
    async unsubscribeMail(@Res() response, @Query('email') email: string) {
        try {
            const res = await this.mailService.unsubscribe(email);
            return response.status(HttpStatus.OK).json({
                message: "Email unsubscribed successfully",
                status_code: 200,
                date: new Date().toISOString(),
            });
        } catch (error) {
            return response.status(500).json({
                message: error.message,
                status_code: 500,
                date: new Date().toISOString(),
            });
        }
    }

    @Post("resend")
    @ApiOperation({
        summary: 'Resend confirmation email',
        // description: 'Lorem ipsum ....',
    })
    @ApiQuery({ name: 'email', type: 'string', required: true, example: 'email', description: 'Email' })
    async resendMail(@Res() response, @Query('email') email: string) {
        try {
            const res = await this.mailService.resendConfirmationMail(email);
            return response.status(HttpStatus.OK).json({
                message: "Email resent successfully",
                status_code: 200,
                date: new Date().toISOString(),
            });
        } catch (error) {
            return response.status(500).json({
                message: error.message,
                status_code: 500,
                date: new Date().toISOString(),
            });
        }
    }

}