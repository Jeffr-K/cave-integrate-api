import { Controller } from "@nestjs/common";
import { domain } from "src/common/controller-url-routing";

@Controller(domain.router.token)
export class TokenController {
  
  constructor() {}

}