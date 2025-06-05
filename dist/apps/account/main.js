/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const account_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(11);
const cookie_parser_1 = __importDefault(__webpack_require__(41));
async function bootstrap() {
    const app = await core_1.NestFactory.create(account_module_1.AccountModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, cookie_parser_1.default)());
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        credentials: true,
    });
    const port = configService.get('PORT_ACCOUNT');
    await app.listen(port);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const common_1 = __webpack_require__(3);
const account_controller_1 = __webpack_require__(4);
const account_service_1 = __webpack_require__(6);
const _app_1 = __webpack_require__(33);
const config_1 = __webpack_require__(11);
const jwt_1 = __webpack_require__(10);
const mailer_1 = __webpack_require__(14);
const handlebars_adapter_1 = __webpack_require__(35);
const google_module_1 = __webpack_require__(36);
const achievements_module_1 = __webpack_require__(37);
const achievements_service_1 = __webpack_require__(19);
const guard_module_1 = __webpack_require__(39);
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env.development',
            }),
            jwt_1.JwtModule.registerAsync({
                useFactory: (config) => ({
                    global: true,
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: (config) => ({
                    transport: {
                        host: config.get('SMTP_HOST'),
                        port: config.get('SMTP_PORT'),
                        auth: {
                            user: config.get('SMTP_USER'),
                            pass: config.get('SMTP_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: '"nest-modules" <modules@nestjs.com>',
                    },
                    template: {
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            guard_module_1.GuardModule,
            _app_1.PrismaModule,
            google_module_1.GoogleModule,
            achievements_module_1.AchievementsModule,
        ],
        controllers: [account_controller_1.AccountController],
        providers: [achievements_service_1.AchievementsService, account_service_1.AccountService],
    })
], AccountModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const common_1 = __webpack_require__(3);
const express_1 = __webpack_require__(5);
const account_service_1 = __webpack_require__(6);
const sign_in_dto_1 = __webpack_require__(23);
const sign_up_dto_1 = __webpack_require__(25);
const config_1 = __webpack_require__(11);
const constants_1 = __webpack_require__(15);
const reset_password_dto_1 = __webpack_require__(26);
const sign_in_google_dto_1 = __webpack_require__(27);
const auth_guard_1 = __webpack_require__(28);
const account_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(30);
const update_user_dto_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(24);
const roles_guard_1 = __webpack_require__(32);
let AccountController = class AccountController {
    constructor(accountService, configService) {
        this.accountService = accountService;
        this.configService = configService;
    }
    async signIn(signInDto, response) {
        const tokens = await this.accountService.signIn(signInDto);
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: Number(String(this.configService.get('JWT_REFRESH_EXPIRES_IN')).slice(0, -1)) *
                constants_1.MILLISECONDS_IN_A_DAY,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { accessToken: tokens.accessToken };
    }
    async signInGoogle(googleToken, response) {
        const tokens = await this.accountService.signInGoogle(googleToken.accessToken);
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: Number(String(this.configService.get('JWT_REFRESH_EXPIRES_IN')).slice(0, -1)) *
                constants_1.MILLISECONDS_IN_A_DAY,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { accessToken: tokens.accessToken };
    }
    async logout(response) {
        response.clearCookie('refreshToken');
    }
    async signUp(signUpDto) {
        return await this.accountService.signUp(signUpDto);
    }
    async requestCode(email) {
        return await this.accountService.requestCode(email);
    }
    async resetPassword(resetPasswordDto) {
        return await this.accountService.resetPassword(resetPasswordDto);
    }
    async refreshToken(request, response) {
        const refreshToken = request.cookies['refreshToken'];
        const tokens = await this.accountService.refreshToken(refreshToken);
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: Number(String(this.configService.get('JWT_REFRESH_EXPIRES_IN')).slice(0, -1)) *
                constants_1.MILLISECONDS_IN_A_DAY,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { accessToken: tokens.accessToken };
    }
    getProfile(request) {
        return {
            id: request.user.id,
            email: request.user.email,
            username: request.user.username,
            joinDate: request.user.joinDate,
            loginDate: request.user.loginDate,
            avatarUrl: request.user.avatarUrl,
            role: request.user.role,
            type: request.user.type,
            access: request.user.access,
            experience: request.user.experience,
            money: request.user.money,
        };
    }
    getAll() {
        return this.accountService.getAll();
    }
    async patchUser(request, patchUserDto, response) {
        const tokens = await this.accountService.patchUser(request.user.id, {
            username: patchUserDto.username,
        });
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: Number(String(this.configService.get('JWT_REFRESH_EXPIRES_IN')).slice(0, -1)) *
                constants_1.MILLISECONDS_IN_A_DAY,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { accessToken: tokens.accessToken };
    }
    patchUserAdmin(id, patchUserDto, request) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.accountService.patchUserAdmin(numberId, patchUserDto, request.user);
    }
    getLeaderboard(type, days) {
        const daysNumber = parseInt(days);
        if ((0, class_validator_1.isInt)(daysNumber) === false) {
            throw new common_1.BadRequestException('Invalid days number');
        }
        switch (type) {
            case account_1.LeaderboardTypes.Points:
                return this.accountService.getLeaderboardByPoints(daysNumber);
            case account_1.LeaderboardTypes.Wins:
                return this.accountService.getLeaderboardByWins(daysNumber);
            case account_1.LeaderboardTypes.WordsGuessed:
                return this.accountService.getLeaderboardByWordsGuessed(daysNumber);
            default:
                throw new common_1.BadRequestException('Invalid type');
        }
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof sign_in_dto_1.SignInDto !== "undefined" && sign_in_dto_1.SignInDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('login-google'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof sign_in_google_dto_1.SignInGoogleDto !== "undefined" && sign_in_google_dto_1.SignInGoogleDto) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signInGoogle", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof sign_up_dto_1.SignUpDto !== "undefined" && sign_up_dto_1.SignUpDto) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('request-code/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "requestCode", null);
__decorate([
    (0, common_1.Put)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof reset_password_dto_1.ResetPasswordDto !== "undefined" && reset_password_dto_1.ResetPasswordDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _k : Object, typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _m : Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_1.UserRole.ADMIN, account_1.UserRole.MODERATOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _p : Object, typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "patchUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_1.UserRole.ADMIN, account_1.UserRole.MODERATOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_r = typeof update_user_dto_1.UpdateUserAdminDto !== "undefined" && update_user_dto_1.UpdateUserAdminDto) === "function" ? _r : Object, typeof (_s = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _s : Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "patchUserAdmin", null);
__decorate([
    (0, common_1.Get)('leaderboard/:type/:days'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getLeaderboard", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AccountController);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const path_1 = __importDefault(__webpack_require__(7));
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(10);
const config_1 = __webpack_require__(11);
const bcrypt_1 = __webpack_require__(12);
const random_1 = __webpack_require__(13);
const mailer_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(15);
const google_service_1 = __webpack_require__(16);
const account_1 = __webpack_require__(18);
const achievements_service_1 = __webpack_require__(19);
let AccountService = class AccountService {
    constructor(configService, prismaService, jwtService, mailerService, googleService, achievementsService) {
        this.configService = configService;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.googleService = googleService;
        this.achievementsService = achievementsService;
    }
    async generateTokens(payload) {
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            }),
        };
    }
    async signIn(signInDto) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: signInDto.email,
                type: account_1.AccountType.EMAIL,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.access) {
            throw new common_1.ForbiddenException('User is blocked');
        }
        const isEqualPasswords = await (0, bcrypt_1.compare)(signInDto.password, user.password);
        if (!isEqualPasswords) {
            throw new common_1.UnauthorizedException('Wrong password');
        }
        const tokens = await this.generateTokens({
            username: user.username,
            email: user.email,
            type: account_1.AccountType.EMAIL,
        });
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                loginDate: new Date(),
                refreshToken: tokens.refreshToken,
            },
        });
        return tokens;
    }
    async signInGoogle(googleToken) {
        const googleInfo = await this.googleService.verifyCode(googleToken);
        const tokens = await this.generateTokens({
            username: googleInfo.name,
            email: googleInfo.email,
            type: account_1.AccountType.GOOGLE,
        });
        const hashedPassword = await (0, bcrypt_1.hash)(googleInfo.sub, this.configService.get('HASH_SALT'));
        const userTofind = await this.prismaService.user.findFirst({
            where: {
                email: googleInfo.email,
            },
        });
        if (!userTofind) {
            const userCreated = await this.prismaService.user.create({
                data: {
                    email: googleInfo.email,
                    username: googleInfo.name,
                    password: hashedPassword,
                    joinDate: new Date(),
                    loginDate: new Date(),
                    refreshToken: tokens.refreshToken,
                    access: true,
                    avatarUrl: googleInfo.picture,
                    role: account_1.UserRole.USER,
                    type: account_1.AccountType.GOOGLE,
                },
            });
            await this.achievementsService.createEmptyAchievements(userCreated);
            return tokens;
        }
        else {
            if (userTofind.type !== account_1.AccountType.GOOGLE) {
                throw new common_1.ConflictException('User is registered without google');
            }
            if (userTofind.access === false) {
                throw new common_1.ForbiddenException('User is blocked');
            }
            if (userTofind.password !== hashedPassword) {
                throw new common_1.UnauthorizedException('Wrong credentials');
            }
            await this.prismaService.user.update({
                where: {
                    id: userTofind.id,
                },
                data: {
                    loginDate: new Date(),
                    refreshToken: tokens.refreshToken,
                },
            });
            return tokens;
        }
    }
    async signUp(signUpDto) {
        const userToFind = await this.prismaService.user.findFirst({
            where: {
                email: signUpDto.email,
            },
        });
        if (userToFind) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashPassword = await (0, bcrypt_1.hash)(signUpDto.password, this.configService.get('HASH_SALT'));
        const tokens = await this.generateTokens({
            username: signUpDto.username,
            email: signUpDto.email,
            type: account_1.AccountType.EMAIL,
        });
        const userCreated = await this.prismaService.user.create({
            data: {
                email: signUpDto.email,
                username: signUpDto.username,
                password: hashPassword,
                joinDate: new Date(),
                loginDate: new Date(),
                refreshToken: tokens.refreshToken,
                access: true,
                avatarUrl: null,
                role: account_1.UserRole.USER,
            },
        });
        await this.achievementsService.createEmptyAchievements(userCreated);
    }
    async requestCode(email) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: email,
                type: account_1.AccountType.EMAIL,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const code = (0, random_1.randomNumCode)(constants_1.CODE_LENGTH);
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                resetCode: code,
            },
        });
        await this.mailerService.sendMail({
            to: email,
            from: this.configService.get('SMTP_USER'),
            subject: 'Reset password request',
            template: path_1.default.join(__dirname, 'templates', 'reset-password.hbs'),
            context: {
                code: code,
            },
        });
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: resetPasswordDto.email,
                type: account_1.AccountType.EMAIL,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.resetCode !== resetPasswordDto.code) {
            throw new common_1.BadRequestException('Wrong code');
        }
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: await (0, bcrypt_1.hash)(resetPasswordDto.password, this.configService.get('HASH_SALT')),
                resetCode: null,
            },
        });
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.ForbiddenException();
        }
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        const user = await this.prismaService.user.findFirst({
            where: {
                refreshToken,
            },
        });
        if (!user || !payload.email) {
            throw new common_1.NotFoundException('User not found');
        }
        const tokens = await this.generateTokens({
            username: user.username,
            email: user.email,
            type: user.type,
        });
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: tokens.refreshToken,
            },
        });
        return tokens;
    }
    async getLeaderboardByPoints(days) {
        const players = await this.prismaService.gamePlayer.findMany({
            where: {
                game: {
                    endDate: { gte: new Date(Date.now() - days * constants_1.MILLISECONDS_IN_A_DAY) },
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                        experience: true,
                    },
                },
            },
        });
        const usersWithPointsByUserId = players.reduce((acc, player) => ({
            ...acc,
            [player.user.id]: {
                ...player.user,
                points: (acc[player.user.id]?.points || 0) + player.points,
            },
        }), {});
        return Object.values(usersWithPointsByUserId)
            .sort((a, b) => b.points - a.points)
            .slice(0, constants_1.LeaderboardPlayersNumber);
    }
    async getLeaderboardByWins(days) {
        const games = await this.prismaService.game.findMany({
            where: {
                endDate: { gte: new Date(Date.now() - days * constants_1.MILLISECONDS_IN_A_DAY) },
            },
            include: {
                players: {
                    orderBy: { points: 'desc' },
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                                experience: true,
                            },
                        },
                    },
                },
            },
        });
        const winners = games.reduce((acc, game) => {
            return [...acc, ...game.players.filter((p) => p.points === game.players[0].points)];
        }, []);
        const userWinners = winners.reduce((acc, player) => ({
            ...acc,
            [player.user.id]: {
                ...player.user,
                wins: (acc[player.user.id]?.wins || 0) + 1,
            },
        }), {});
        return Object.values(userWinners)
            .sort((a, b) => b.wins - a.wins)
            .slice(0, constants_1.LeaderboardPlayersNumber);
    }
    async getLeaderboardByWordsGuessed(days) {
        const wordsGuessed = await this.prismaService.drawingMessage.findMany({
            where: {
                sendDate: { gte: new Date(Date.now() - days * constants_1.MILLISECONDS_IN_A_DAY) },
                isGuessed: true,
            },
            include: {
                sender: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                                experience: true,
                            },
                        },
                    },
                },
            },
        });
        const userGuessers = wordsGuessed.reduce((acc, word) => ({
            ...acc,
            [word.sender.user.id]: {
                ...word.sender.user,
                wordsGuessed: (acc[word.sender.user.id]?.wordsGuessed || 0) + 1,
            },
        }), {});
        return Object.values(userGuessers)
            .sort((a, b) => b.wordsGuessed - a.wordsGuessed)
            .slice(0, constants_1.LeaderboardPlayersNumber);
    }
    async getAll() {
        return this.prismaService.user.findMany({
            orderBy: { id: 'asc' },
            select: {
                id: true,
                username: true,
                email: true,
                access: true,
                avatarUrl: true,
                loginDate: true,
                joinDate: true,
                role: true,
                type: true,
                experience: true,
            },
        });
    }
    async patchUser(id, patchUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const tokens = await this.generateTokens({
            username: patchUserDto.username,
            email: user.email,
            type: user.type,
        });
        await this.prismaService.user.update({
            where: { id },
            data: { ...patchUserDto, refreshToken: tokens.refreshToken },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
            },
        });
        return tokens;
    }
    async patchUserAdmin(id, patchUserDto, user) {
        const userPatching = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!userPatching) {
            throw new common_1.NotFoundException('User not found');
        }
        if (userPatching.role === account_1.UserRole.MODERATOR) {
            if (user.role !== account_1.UserRole.MODERATOR) {
                throw new common_1.ForbiddenException('You cannot change moderator');
            }
            if (Number(patchUserDto.role) !== account_1.UserRole.MODERATOR) {
                throw new common_1.ForbiddenException('You cannot change moderator role');
            }
            if (!Boolean(patchUserDto.access)) {
                throw new common_1.ForbiddenException('You cannot block moderator');
            }
        }
        const tokens = await this.generateTokens({
            username: patchUserDto.username,
            email: userPatching.email,
            type: userPatching.type,
        });
        const typedDto = {
            username: patchUserDto.username,
            role: patchUserDto.role && Number(patchUserDto.role),
            access: patchUserDto.access && Boolean(patchUserDto.access),
            password: patchUserDto.password &&
                (await (0, bcrypt_1.hash)(patchUserDto.password, this.configService.get('HASH_SALT'))),
            refreshToken: tokens.refreshToken,
        };
        if (![account_1.UserRole.USER, account_1.UserRole.ADMIN].includes(typedDto.role) &&
            userPatching.role !== account_1.UserRole.MODERATOR) {
            throw new common_1.BadRequestException('Wrong role');
        }
        return this.prismaService.user.update({
            where: { id },
            data: typedDto,
            select: {
                id: true,
                username: true,
                email: true,
                access: true,
                avatarUrl: true,
                loginDate: true,
                joinDate: true,
                role: true,
                type: true,
                experience: true,
            },
        });
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _d : Object, typeof (_e = typeof google_service_1.GoogleService !== "undefined" && google_service_1.GoogleService) === "function" ? _e : Object, typeof (_f = typeof achievements_service_1.AchievementsService !== "undefined" && achievements_service_1.AchievementsService) === "function" ? _f : Object])
], AccountService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(9);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uniqueRandomFromArray = exports.randomCode = exports.randomNumCode = void 0;
const randomNumCode = (length) => Math.floor(Math.random() * Math.pow(10, length)).toString();
exports.randomNumCode = randomNumCode;
const randomCode = (length) => Math.random()
    .toString(36)
    .slice(2, length + 2);
exports.randomCode = randomCode;
const uniqueRandomFromArray = (arr, n = 1) => {
    const resultSet = new Set();
    while (resultSet.size < n) {
        resultSet.add(arr[Math.floor(Math.random() * arr.length)]);
    }
    return Array.from(resultSet);
};
exports.uniqueRandomFromArray = uniqueRandomFromArray;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeaderboardPlayersNumber = exports.CODE_LENGTH = exports.MILLISECONDS_IN_A_DAY = void 0;
exports.MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
exports.CODE_LENGTH = 6;
exports.LeaderboardPlayersNumber = 10;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleService = void 0;
const common_1 = __webpack_require__(3);
const google_auth_library_1 = __webpack_require__(17);
let GoogleService = class GoogleService {
    constructor() {
        this.client = new google_auth_library_1.OAuth2Client();
    }
    async verifyCode(token) {
        this.client.setCredentials({ access_token: token });
        const userinfo = await this.client.request({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        });
        return userinfo.data;
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)()
], GoogleService);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeaderboardTypes = exports.ROLES_KEY = exports.UserRole = exports.AccountType = void 0;
var AccountType;
(function (AccountType) {
    AccountType[AccountType["EMAIL"] = 0] = "EMAIL";
    AccountType[AccountType["GOOGLE"] = 1] = "GOOGLE";
})(AccountType || (exports.AccountType = AccountType = {}));
var UserRole;
(function (UserRole) {
    UserRole[UserRole["USER"] = 0] = "USER";
    UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
    UserRole[UserRole["MODERATOR"] = 2] = "MODERATOR";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ROLES_KEY = 'roles-guard-key';
var LeaderboardTypes;
(function (LeaderboardTypes) {
    LeaderboardTypes["Points"] = "points";
    LeaderboardTypes["Wins"] = "wins";
    LeaderboardTypes["WordsGuessed"] = "words-guessed";
})(LeaderboardTypes || (exports.LeaderboardTypes = LeaderboardTypes = {}));


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AchievementsService = void 0;
const achievements_1 = __webpack_require__(20);
const prisma_service_1 = __webpack_require__(8);
const socket_service_1 = __webpack_require__(22);
const achievements_2 = __webpack_require__(21);
const common_1 = __webpack_require__(3);
let AchievementsService = class AchievementsService {
    constructor(prismaService, socketService) {
        this.prismaService = prismaService;
        this.socketService = socketService;
    }
    async getMyAchievements(user) {
        const games = await this.prismaService.game.findMany({
            where: { players: { some: { userId: user.id } } },
            include: { players: true },
            orderBy: { id: 'desc' },
        });
        const myMessages = await this.prismaService.drawingMessage.findMany({
            where: { sender: { userId: user.id }, isGuessed: true },
        });
        const messagesMyDrawingGuessed = await this.prismaService.drawingMessage.findMany({
            where: {
                isGuessed: true,
                drawing: {
                    gamePlayer: {
                        userId: user.id,
                    },
                },
            },
        });
        return {
            achievements: await this.prismaService.achievement.findMany({
                where: { userId: user.id },
                include: {
                    type: true,
                },
                orderBy: {
                    type: {
                        id: 'asc',
                    },
                },
            }),
            progressByType: {
                ...(0, achievements_1.getWonGamesByType)(user, games),
                ...(0, achievements_1.getTodayGames)(games),
                ...(0, achievements_1.getConsecutiveDaysPlaying)(games),
                ...(0, achievements_1.getMyMessagesStats)(myMessages),
                [achievements_2.AchievementsTypeIds.DrawingGuesses]: messagesMyDrawingGuessed.length,
            },
        };
    }
    async createEmptyAchievements(user) {
        const achievementsTypes = await this.prismaService.achievementType.findMany();
        return this.prismaService.achievement.createMany({
            data: achievementsTypes.map((type) => ({
                userId: user.id,
                typeId: type.id,
                level: 0,
            })),
        });
    }
    async recalculateAchievements(user, gameId) {
        const currentAchievements = await this.prismaService.achievement.findMany({
            where: { userId: user.id },
        });
        const achievementsTypes = await this.prismaService.achievementType.findMany();
        const games = await this.prismaService.game.findMany({
            where: { players: { some: { userId: user.id } } },
            include: { players: true },
            orderBy: { id: 'desc' },
        });
        const myMessages = await this.prismaService.drawingMessage.findMany({
            where: { sender: { userId: user.id }, isGuessed: true },
        });
        const messagesMyDrawingGuessed = await this.prismaService.drawingMessage.findMany({
            where: {
                isGuessed: true,
                drawing: {
                    gamePlayer: {
                        userId: user.id,
                    },
                },
            },
        });
        const earnedAchievements = (await Promise.all(Object.entries({
            ...(0, achievements_1.getWonGamesByType)(user, games),
            ...(0, achievements_1.getTodayGames)(games),
            ...(0, achievements_1.getConsecutiveDaysPlaying)(games),
            ...(0, achievements_1.getMyMessagesStats)(myMessages),
            [achievements_2.AchievementsTypeIds.DrawingGuesses]: messagesMyDrawingGuessed.length,
        }).map((value) => {
            const achievementType = achievementsTypes.find((type) => type.id === Number(value[0]));
            return this.recalculateAchievement(currentAchievements, user, value[1], achievementType);
        }))).flat();
        if (earnedAchievements.length) {
            await this.prismaService.user.update({
                where: { id: user.id },
                data: {
                    money: {
                        increment: earnedAchievements.reduce((acc, achievement) => acc + achievements_2.moneyForAchievementAmountByLevel[achievement.level - 1], 0),
                    },
                },
            });
            this.socketService.socket.to(String(gameId)).emit('achievementsEarned', {
                userId: user.id,
                achievements: earnedAchievements,
            });
        }
    }
    async recalculateAchievement(currentAchievements, user, amount, achievementType) {
        const newAchievements = [];
        const achievementLevel = (0, achievements_1.calculateAchievementLevel)(amount, [
            achievementType.level1Amount,
            achievementType.level2Amount,
            achievementType.level3Amount,
        ]);
        const currentAchievement = currentAchievements.find((achievement) => achievement.typeId === achievementType.id);
        if (achievementLevel > (currentAchievement?.level || 0)) {
            newAchievements.push(await this.prismaService.achievement.upsert({
                create: {
                    userId: user.id,
                    typeId: achievementType.id,
                    level: achievementLevel,
                },
                update: {
                    level: achievementLevel,
                },
                where: {
                    id: currentAchievement?.id || -1,
                },
                include: {
                    type: true,
                },
            }));
        }
        return newAchievements;
    }
};
exports.AchievementsService = AchievementsService;
exports.AchievementsService = AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof socket_service_1.SocketService !== "undefined" && socket_service_1.SocketService) === "function" ? _b : Object])
], AchievementsService);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMyMessagesStats = exports.getConsecutiveDaysPlaying = exports.getTodayGames = exports.getWonGamesByType = exports.calculateAchievementLevel = void 0;
const constants_1 = __webpack_require__(15);
const achievements_1 = __webpack_require__(21);
const calculateAchievementLevel = (amount, levelAmounts) => {
    for (let i = 0; i < levelAmounts.length; i++) {
        if (amount < levelAmounts[i]) {
            return i;
        }
    }
    return levelAmounts.length;
};
exports.calculateAchievementLevel = calculateAchievementLevel;
const getWonGamesByType = (user, games) => {
    const gamesWon = games.filter((game) => {
        const playersSorted = game.players.slice().sort((p1, p2) => p2.points - p1.points);
        const yourPlayer = playersSorted.find((p) => p.userId === user.id);
        if (!yourPlayer || yourPlayer.points === 0) {
            return false;
        }
        return yourPlayer?.points === playersSorted[0].points;
    });
    const gamesWonByType = gamesWon.reduce((acc, game) => ({
        standart: acc.standart + (!game.isSimplified ? 1 : 0),
        simplified: acc.simplified + (game.isSimplified ? 1 : 0),
    }), { standart: 0, simplified: 0 });
    return {
        [achievements_1.AchievementsTypeIds.StandartWins]: gamesWonByType.standart,
        [achievements_1.AchievementsTypeIds.SimplifiedWins]: gamesWonByType.simplified,
    };
};
exports.getWonGamesByType = getWonGamesByType;
const getTodayGames = (games) => ({
    [achievements_1.AchievementsTypeIds.DailyGames]: games.filter((game) => game.startDate >= new Date(new Date().setHours(0, 0, 0, 0))).length,
});
exports.getTodayGames = getTodayGames;
const getConsecutiveDaysPlaying = (games) => {
    let consecutiveDaysPlaying = 1;
    for (let i = 1; i < games.length; i++) {
        const game1MS = new Date(games[i - 1].startDate).setHours(0, 0, 0, 0);
        const game2MS = new Date(games[i].startDate).setHours(0, 0, 0, 0);
        if (game1MS - game2MS === 0) {
            continue;
        }
        if (game1MS - game2MS === constants_1.MILLISECONDS_IN_A_DAY) {
            consecutiveDaysPlaying += 1;
        }
        else {
            break;
        }
    }
    return {
        [achievements_1.AchievementsTypeIds.ConsecutiveDaysPlaying]: consecutiveDaysPlaying,
    };
};
exports.getConsecutiveDaysPlaying = getConsecutiveDaysPlaying;
const getMyMessagesStats = (drawingMessages) => {
    return {
        [achievements_1.AchievementsTypeIds.WordsGuessed]: drawingMessages.length,
        [achievements_1.AchievementsTypeIds.FirstTryGuesses]: drawingMessages.filter((message) => message.isFirst)
            .length,
        [achievements_1.AchievementsTypeIds.QuickQuesses]: drawingMessages.filter((message) => message.secondsPassedAfterRound <= achievements_1.QuickGuessSeconds).length,
    };
};
exports.getMyMessagesStats = getMyMessagesStats;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moneyForAchievementAmountByLevel = exports.QuickGuessSeconds = exports.AchievementsTypeIds = void 0;
var AchievementsTypeIds;
(function (AchievementsTypeIds) {
    AchievementsTypeIds[AchievementsTypeIds["StandartWins"] = 1] = "StandartWins";
    AchievementsTypeIds[AchievementsTypeIds["SimplifiedWins"] = 2] = "SimplifiedWins";
    AchievementsTypeIds[AchievementsTypeIds["WordsGuessed"] = 3] = "WordsGuessed";
    AchievementsTypeIds[AchievementsTypeIds["QuickQuesses"] = 4] = "QuickQuesses";
    AchievementsTypeIds[AchievementsTypeIds["FirstTryGuesses"] = 5] = "FirstTryGuesses";
    AchievementsTypeIds[AchievementsTypeIds["DrawingGuesses"] = 6] = "DrawingGuesses";
    AchievementsTypeIds[AchievementsTypeIds["DailyGames"] = 7] = "DailyGames";
    AchievementsTypeIds[AchievementsTypeIds["ConsecutiveDaysPlaying"] = 8] = "ConsecutiveDaysPlaying";
})(AchievementsTypeIds || (exports.AchievementsTypeIds = AchievementsTypeIds = {}));
exports.QuickGuessSeconds = 10;
exports.moneyForAchievementAmountByLevel = [100, 250, 500];


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketService = void 0;
const common_1 = __webpack_require__(3);
let SocketService = class SocketService {
    constructor() {
        this.socket = null;
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = __decorate([
    (0, common_1.Injectable)()
], SocketService);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const class_validator_1 = __webpack_require__(24);
class SignInDto {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpDto = void 0;
const class_validator_1 = __webpack_require__(24);
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    }, {
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = void 0;
const class_validator_1 = __webpack_require__(24);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6),
    (0, class_validator_1.IsUppercase)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    }, {
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInGoogleDto = void 0;
const class_validator_1 = __webpack_require__(24);
class SignInGoogleDto {
}
exports.SignInGoogleDto = SignInGoogleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInGoogleDto.prototype, "accessToken", void 0);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(11);
const jwt_1 = __webpack_require__(10);
const prisma_service_1 = __webpack_require__(8);
const public_decorator_1 = __webpack_require__(29);
const core_1 = __webpack_require__(1);
let AuthGuard = class AuthGuard {
    constructor(jwtService, configService, prismaService, reflector) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prismaService = prismaService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: payload.email,
                },
            });
            if (!user || !user.access) {
                throw new common_1.UnauthorizedException();
            }
            request['user'] = user;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _c : Object, typeof (_d = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _d : Object])
], AuthGuard);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const account_1 = __webpack_require__(18);
const common_1 = __webpack_require__(3);
const Roles = (...roles) => (0, common_1.SetMetadata)(account_1.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserAdminDto = exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(24);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
class UpdateUserAdminDto extends UpdateUserDto {
}
exports.UpdateUserAdminDto = UpdateUserAdminDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "access", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    }, {
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
    }),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "password", void 0);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const account_1 = __webpack_require__(18);
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(29);
const roles_decorator_1 = __webpack_require__(30);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const requiredRolesController = this.reflector.get(roles_decorator_1.Roles, context.getClass());
        const requiredRoles = this.reflector.getAllAndOverride(account_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const allRequiredRoles = [...(requiredRolesController || []), ...(requiredRoles || [])];
        if (!allRequiredRoles.length) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const isProperRole = allRequiredRoles.some((role) => user.role === role);
        if (!isProperRole) {
            throw new common_1.ForbiddenException();
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(8);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleModule = void 0;
const common_1 = __webpack_require__(3);
const google_service_1 = __webpack_require__(16);
let GoogleModule = class GoogleModule {
};
exports.GoogleModule = GoogleModule;
exports.GoogleModule = GoogleModule = __decorate([
    (0, common_1.Module)({
        providers: [google_service_1.GoogleService],
        exports: [google_service_1.GoogleService],
    })
], GoogleModule);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AchievementsModule = void 0;
const common_1 = __webpack_require__(3);
const achievements_controller_1 = __webpack_require__(38);
const achievements_service_1 = __webpack_require__(19);
const _app_1 = __webpack_require__(33);
const guard_module_1 = __webpack_require__(39);
const socket_module_1 = __webpack_require__(40);
let AchievementsModule = class AchievementsModule {
};
exports.AchievementsModule = AchievementsModule;
exports.AchievementsModule = AchievementsModule = __decorate([
    (0, common_1.Module)({
        imports: [_app_1.PrismaModule, guard_module_1.GuardModule, socket_module_1.SocketModule],
        controllers: [achievements_controller_1.AchievementsController],
        providers: [achievements_service_1.AchievementsService],
        exports: [achievements_service_1.AchievementsService],
    })
], AchievementsModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AchievementsController = void 0;
const common_1 = __webpack_require__(3);
const achievements_service_1 = __webpack_require__(19);
const express_1 = __webpack_require__(5);
const auth_guard_1 = __webpack_require__(28);
let AchievementsController = class AchievementsController {
    constructor(achievementsService) {
        this.achievementsService = achievementsService;
    }
    getMyAchievements(req) {
        return this.achievementsService.getMyAchievements(req.user);
    }
};
exports.AchievementsController = AchievementsController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AchievementsController.prototype, "getMyAchievements", null);
exports.AchievementsController = AchievementsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('achievement'),
    __metadata("design:paramtypes", [typeof (_a = typeof achievements_service_1.AchievementsService !== "undefined" && achievements_service_1.AchievementsService) === "function" ? _a : Object])
], AchievementsController);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GuardModule = void 0;
const common_1 = __webpack_require__(3);
const auth_guard_1 = __webpack_require__(28);
const jwt_1 = __webpack_require__(10);
const config_1 = __webpack_require__(11);
const prisma_module_1 = __webpack_require__(34);
const roles_guard_1 = __webpack_require__(32);
let GuardModule = class GuardModule {
};
exports.GuardModule = GuardModule;
exports.GuardModule = GuardModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: (config) => ({
                    global: true,
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
                }),
                inject: [config_1.ConfigService],
            }),
            prisma_module_1.PrismaModule,
        ],
        providers: [auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, jwt_1.JwtService],
        exports: [auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, jwt_1.JwtService],
    })
], GuardModule);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketModule = void 0;
const common_1 = __webpack_require__(3);
const socket_service_1 = __webpack_require__(22);
let SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [],
        providers: [socket_service_1.SocketService],
        exports: [socket_service_1.SocketService],
    })
], SocketModule);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;