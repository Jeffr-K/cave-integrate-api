import { Controller } from "@nestjs/common";
import { domain } from "src/application/common/controller-url-routing";

@Controller(domain.router.token)
export class TokenController {
  
  constructor() {}

}