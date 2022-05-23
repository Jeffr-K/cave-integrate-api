import { Controller, Get, Inject, LoggerService } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  @Get("/")
  async healthCheck() {
    try {
      return "ok"

    } catch (e) {
      this.logger.error("err")
    }
  }
}