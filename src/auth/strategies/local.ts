import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";

import {UserEntity} from "../../user/user.entity";
import {UserService} from "../../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    const userEntity = await this.userService.getByCredentials(email, password);

    if (userEntity) {
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}
