import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";

import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./strategies";
import {SessionSerializer} from "./session.serializer";
import {TypeOrmConfigService} from "../typeorm.options";


describe("AuthService", () => {
  let servcontrollerce: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        UserModule,
        PassportModule,
      ],
      providers: [LocalStrategy, SessionSerializer],
      controllers: [AuthController],
    }).compile();

    servcontrollerce = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(servcontrollerce).toBeDefined();
  });
});
