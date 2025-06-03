/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
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
exports.DrawingModule = void 0;
const common_1 = __webpack_require__(3);
const drawing_controller_1 = __webpack_require__(4);
const drawing_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(15);
const _app_1 = __webpack_require__(16);
const guard_module_1 = __webpack_require__(18);
const auth_guard_1 = __webpack_require__(19);
const core_1 = __webpack_require__(1);
const drawing_word_module_1 = __webpack_require__(25);
const drawing_word_type_module_1 = __webpack_require__(29);
const drawing_message_module_1 = __webpack_require__(33);
const socket_module_1 = __webpack_require__(42);
let DrawingModule = class DrawingModule {
};
exports.DrawingModule = DrawingModule;
exports.DrawingModule = DrawingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env.development',
            }),
            guard_module_1.GuardModule,
            _app_1.PrismaModule,
            socket_module_1.SocketModule,
            drawing_word_module_1.DrawingWordModule,
            drawing_word_type_module_1.DrawingWordTypeModule,
            drawing_message_module_1.DrawingMessageModule,
        ],
        controllers: [drawing_controller_1.DrawingController],
        providers: [{ provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard }, drawing_service_1.DrawingService],
        exports: [drawing_service_1.DrawingService],
    })
], DrawingModule);


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingController = void 0;
const common_1 = __webpack_require__(3);
const drawing_service_1 = __webpack_require__(5);
const express_1 = __webpack_require__(12);
const add_drawing_part_dto_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(14);
let DrawingController = class DrawingController {
    constructor(drawingService) {
        this.drawingService = drawingService;
    }
    addDrawingPart(drawing, req) {
        return this.drawingService.addDrawingPart(drawing, req.user);
    }
    changeDrawingWord(req, gameId) {
        const numberId = parseInt(gameId);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.drawingService.changeDrawingWord(numberId, req.user);
    }
    getDrawing(req, gameId) {
        const numberId = parseInt(gameId);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.drawingService.getCurrentGameDrawing(numberId, req.user);
    }
    getMyDrawings(req) {
        return this.drawingService.getMyDrawings(req.user);
    }
};
exports.DrawingController = DrawingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof add_drawing_part_dto_1.AddDrawingPartDto !== "undefined" && add_drawing_part_dto_1.AddDrawingPartDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DrawingController.prototype, "addDrawingPart", null);
__decorate([
    (0, common_1.Post)('/change-word/:gameId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, String]),
    __metadata("design:returntype", void 0)
], DrawingController.prototype, "changeDrawingWord", null);
__decorate([
    (0, common_1.Get)('game-current/:gameId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, String]),
    __metadata("design:returntype", void 0)
], DrawingController.prototype, "getDrawing", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], DrawingController.prototype, "getMyDrawings", null);
exports.DrawingController = DrawingController = __decorate([
    (0, common_1.Controller)('drawing'),
    __metadata("design:paramtypes", [typeof (_a = typeof drawing_service_1.DrawingService !== "undefined" && drawing_service_1.DrawingService) === "function" ? _a : Object])
], DrawingController);


/***/ }),
/* 5 */
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
exports.DrawingService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(6);
const random_1 = __webpack_require__(8);
const game_1 = __webpack_require__(9);
const socket_service_1 = __webpack_require__(10);
const prices_1 = __webpack_require__(11);
let DrawingService = class DrawingService {
    constructor(prismaService, socketService) {
        this.prismaService = prismaService;
        this.socketService = socketService;
    }
    async addDrawings(gameId) {
        const game = await this.prismaService.game.update({
            where: {
                id: gameId,
            },
            data: {
                currentRound: 1,
            },
            include: {
                drawings: true,
                players: {
                    include: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                wordTypes: {
                    include: {
                        drawingWords: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        const words = (0, random_1.uniqueRandomFromArray)(game.wordTypes
            .reduce((acc, wordType) => [...acc, ...wordType.drawingWords], [])
            .map((word) => word.id), game.players.length * game.drawingsPerPlayer);
        return await Promise.all(words.map((word, index) => this.prismaService.drawing.create({
            data: {
                roundNumber: index + 1,
                wordId: word,
                gameId: gameId,
                gamePlayerId: game.players[index % game.players.length].id,
            },
        })));
    }
    async addDrawingPart(part, user) {
        if (part.posX.length !== part.posY.length || part.posX.length === 0) {
            throw new common_1.BadRequestException('Invalid drawing');
        }
        const game = await this.prismaService.game.findFirst({
            where: {
                id: part.gameId,
                players: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: {
                drawings: true,
                players: {
                    include: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                    orderBy: { id: 'asc' },
                },
                wordTypes: true,
            },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        const currentPlayerIndex = game.currentRound % game.players.length === 0
            ? game.players.length - 1
            : (game.currentRound % game.players.length) - 1;
        if (user.id !== game.players[currentPlayerIndex]?.user.id) {
            throw new common_1.BadRequestException('Not your turn');
        }
        return await this.prismaService.drawing.update({
            data: {
                drawingParts: {
                    create: {
                        posX: part.posX,
                        posY: part.posY,
                        color: part.color,
                        lineWidth: part.lineWidth,
                    },
                },
            },
            where: {
                id: part.drawingId,
                gamePlayerId: game.players[currentPlayerIndex].id,
            },
        });
    }
    async changeDrawingWord(gameId, user) {
        if (user.money < prices_1.Prices.ChangeWord) {
            throw new common_1.BadRequestException('Not enough money');
        }
        const game = await this.prismaService.game.findFirst({
            where: {
                id: gameId,
                players: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: {
                drawings: { orderBy: { roundNumber: 'asc' } },
                wordTypes: {
                    include: {
                        drawingWords: true,
                    },
                },
                players: true,
            },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        if (game.drawings[game.currentRound - 1]?.gamePlayerId !==
            game.players.find((player) => player.userId === user.id)?.id) {
            throw new common_1.BadRequestException('Not your turn');
        }
        const timePassedAfterGameStart = Date.now() - game.startDate.getTime();
        const timePassedAfterRoundStart = timePassedAfterGameStart -
            (game.currentRound - 1) *
                (game.roundDuration + game_1.breakSecondsNumber) *
                1000;
        if (timePassedAfterRoundStart > game.roundDuration * 1000) {
            throw new common_1.BadRequestException('Game in break phase');
        }
        if (timePassedAfterRoundStart > game_1.noGuessesSecondsNumber * 1000) {
            throw new common_1.BadRequestException(`You cannot change word after ${game_1.noGuessesSecondsNumber} seconds of round passed`);
        }
        const wordId = (0, random_1.uniqueRandomFromArray)(game.wordTypes
            .reduce((acc, wordType) => [...acc, ...wordType.drawingWords], [])
            .filter((word) => word.id !== game.drawings[game.currentRound - 1].wordId)
            .map((word) => word.id))[0];
        const [updatedUser, newDrawing] = await Promise.all([
            this.prismaService.user.update({
                data: {
                    money: { decrement: prices_1.Prices.ChangeWord },
                },
                where: {
                    id: user.id,
                },
            }),
            this.prismaService.drawing.update({
                data: {
                    wordId,
                },
                where: {
                    id: game.drawings[game.currentRound - 1].id,
                },
                include: {
                    word: true,
                },
            }),
        ]);
        return {
            word: newDrawing.word,
            updatedMoney: updatedUser.money,
        };
    }
    async getCurrentGameDrawing(gameId, user) {
        const game = await this.prismaService.game.findFirst({
            where: {
                id: gameId,
                players: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: {
                drawings: {
                    include: {
                        drawingParts: true,
                        word: true,
                    },
                },
                players: {
                    include: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                    orderBy: { id: 'asc' },
                },
            },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        const currentPlayerIndex = game.currentRound % game.players.length === 0
            ? game.players.length - 1
            : (game.currentRound % game.players.length) - 1;
        const fullDrawing = game.drawings.find((drawing) => drawing.roundNumber === game.currentRound);
        return fullDrawing
            ? {
                ...fullDrawing,
                wordId: undefined,
                word: user.id === game.players[currentPlayerIndex].user.id
                    ? fullDrawing.word
                    : undefined,
            }
            : null;
    }
    getMyDrawings(user) {
        return this.prismaService.drawing.findMany({
            where: { gamePlayer: { userId: user.id } },
            include: {
                drawingParts: true,
                word: true,
            },
            orderBy: {
                id: 'desc',
            },
        });
    }
};
exports.DrawingService = DrawingService;
exports.DrawingService = DrawingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof socket_service_1.SocketService !== "undefined" && socket_service_1.SocketService) === "function" ? _b : Object])
], DrawingService);


/***/ }),
/* 6 */
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
const client_1 = __webpack_require__(7);
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
/* 7 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 8 */
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
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extraPointsGuessedForDrawer = exports.defaultPointsGuessedForDrawer = exports.extraMaxPointsForGuess = exports.defaultPointsForGuess = exports.noGuessesSecondsNumber = exports.breakSecondsNumber = void 0;
exports.breakSecondsNumber = 5;
exports.noGuessesSecondsNumber = 5;
exports.defaultPointsForGuess = 10;
exports.extraMaxPointsForGuess = 20;
exports.defaultPointsGuessedForDrawer = 5;
exports.extraPointsGuessedForDrawer = 5;


/***/ }),
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Prices = void 0;
exports.Prices = {
    OpenLetter: 10,
    ChangeWord: 50,
};


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 13 */
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
exports.AddDrawingPartDto = void 0;
const class_validator_1 = __webpack_require__(14);
class AddDrawingPartDto {
}
exports.AddDrawingPartDto = AddDrawingPartDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddDrawingPartDto.prototype, "posX", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddDrawingPartDto.prototype, "posY", void 0);
__decorate([
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], AddDrawingPartDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddDrawingPartDto.prototype, "lineWidth", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AddDrawingPartDto.prototype, "gameId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AddDrawingPartDto.prototype, "drawingId", void 0);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 16 */
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
__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 17 */
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
const prisma_service_1 = __webpack_require__(6);
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
/* 18 */
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
const auth_guard_1 = __webpack_require__(19);
const jwt_1 = __webpack_require__(20);
const config_1 = __webpack_require__(15);
const prisma_module_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(22);
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(15);
const jwt_1 = __webpack_require__(20);
const prisma_service_1 = __webpack_require__(6);
const public_decorator_1 = __webpack_require__(21);
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
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 22 */
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
const account_1 = __webpack_require__(23);
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(21);
const roles_decorator_1 = __webpack_require__(24);
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
        const requiredRoles = this.reflector.getAllAndOverride(account_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        const allRequiredRoles = [
            ...(requiredRolesController || []),
            ...(requiredRoles || []),
        ];
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
/* 23 */
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
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ROLES_KEY = 'roles-guard-key';
var LeaderboardTypes;
(function (LeaderboardTypes) {
    LeaderboardTypes["Points"] = "points";
    LeaderboardTypes["Wins"] = "wins";
    LeaderboardTypes["WordsGuessed"] = "words-guessed";
})(LeaderboardTypes || (exports.LeaderboardTypes = LeaderboardTypes = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const account_1 = __webpack_require__(23);
const common_1 = __webpack_require__(3);
const Roles = (...roles) => (0, common_1.SetMetadata)(account_1.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingWordModule = void 0;
const common_1 = __webpack_require__(3);
const drawing_word_controller_1 = __webpack_require__(26);
const drawing_word_service_1 = __webpack_require__(27);
const _app_1 = __webpack_require__(16);
const guard_module_1 = __webpack_require__(18);
const auth_guard_1 = __webpack_require__(19);
const core_1 = __webpack_require__(1);
const roles_guard_1 = __webpack_require__(22);
let DrawingWordModule = class DrawingWordModule {
};
exports.DrawingWordModule = DrawingWordModule;
exports.DrawingWordModule = DrawingWordModule = __decorate([
    (0, common_1.Module)({
        imports: [guard_module_1.GuardModule, _app_1.PrismaModule],
        controllers: [drawing_word_controller_1.DrawingWordController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            drawing_word_service_1.DrawingWordService,
        ],
    })
], DrawingWordModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingWordController = void 0;
const common_1 = __webpack_require__(3);
const drawing_word_service_1 = __webpack_require__(27);
const word_dto_1 = __webpack_require__(28);
const class_validator_1 = __webpack_require__(14);
const account_1 = __webpack_require__(23);
const roles_decorator_1 = __webpack_require__(24);
let DrawingWordController = class DrawingWordController {
    constructor(drawingWordService) {
        this.drawingWordService = drawingWordService;
    }
    addDrawingWord(word) {
        return this.drawingWordService.addWord(word);
    }
    getDrawingWords() {
        return this.drawingWordService.getWords();
    }
    deleteDrawingWord(id) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.drawingWordService.deleteWord(numberId);
    }
    updateDrawingWord(id, word) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.drawingWordService.updateWord(numberId, word);
    }
};
exports.DrawingWordController = DrawingWordController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof word_dto_1.WordDto !== "undefined" && word_dto_1.WordDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], DrawingWordController.prototype, "addDrawingWord", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrawingWordController.prototype, "getDrawingWords", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawingWordController.prototype, "deleteDrawingWord", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof word_dto_1.WordDto !== "undefined" && word_dto_1.WordDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DrawingWordController.prototype, "updateDrawingWord", null);
exports.DrawingWordController = DrawingWordController = __decorate([
    (0, roles_decorator_1.Roles)(account_1.UserRole.ADMIN),
    (0, common_1.Controller)('drawing-word'),
    __metadata("design:paramtypes", [typeof (_a = typeof drawing_word_service_1.DrawingWordService !== "undefined" && drawing_word_service_1.DrawingWordService) === "function" ? _a : Object])
], DrawingWordController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingWordService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(6);
let DrawingWordService = class DrawingWordService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    addWord(word) {
        return this.prismaService.drawingWord.create({
            data: { word: word.word, type: { connect: { id: word.typeId } } },
        });
    }
    deleteWord(id) {
        return this.prismaService.drawingWord.delete({ where: { id } });
    }
    updateWord(id, word) {
        return this.prismaService.drawingWord.update({
            where: { id },
            data: { word: word.word, type: { connect: { id: word.typeId } } },
        });
    }
    getWords() {
        return this.prismaService.drawingWord.findMany({
            include: { type: true },
        });
    }
};
exports.DrawingWordService = DrawingWordService;
exports.DrawingWordService = DrawingWordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], DrawingWordService);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WordDto = void 0;
const class_validator_1 = __webpack_require__(14);
class WordDto {
}
exports.WordDto = WordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WordDto.prototype, "word", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], WordDto.prototype, "typeId", void 0);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingWordTypeModule = void 0;
const common_1 = __webpack_require__(3);
const drawing_word_type_controller_1 = __webpack_require__(30);
const drawing_word_type_service_1 = __webpack_require__(31);
const _app_1 = __webpack_require__(16);
const guard_module_1 = __webpack_require__(18);
const auth_guard_1 = __webpack_require__(19);
const core_1 = __webpack_require__(1);
const roles_guard_1 = __webpack_require__(22);
let DrawingWordTypeModule = class DrawingWordTypeModule {
};
exports.DrawingWordTypeModule = DrawingWordTypeModule;
exports.DrawingWordTypeModule = DrawingWordTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [guard_module_1.GuardModule, _app_1.PrismaModule],
        controllers: [drawing_word_type_controller_1.DrawingWordTypeController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            drawing_word_type_service_1.DrawingWordTypeService,
        ],
    })
], DrawingWordTypeModule);


/***/ }),
/* 30 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingWordTypeController = void 0;
const common_1 = __webpack_require__(3);
const drawing_word_type_service_1 = __webpack_require__(31);
const word_type_dto_1 = __webpack_require__(32);
const class_validator_1 = __webpack_require__(14);
const account_1 = __webpack_require__(23);
const roles_decorator_1 = __webpack_require__(24);
const public_decorator_1 = __webpack_require__(21);
let DrawingWordTypeController = class DrawingWordTypeController {
    constructor(wordTypeService) {
        this.wordTypeService = wordTypeService;
    }
    addDrawingWordType(wordType) {
        return this.wordTypeService.addWordType(wordType);
    }
    getDrawingWordTypes() {
        return this.wordTypeService.getWordTypes();
    }
    deleteDrawingWordType(id) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.wordTypeService.deleteWordType(numberId);
    }
    updateDrawingWordType(id, word) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.wordTypeService.updateWordType(numberId, word);
    }
};
exports.DrawingWordTypeController = DrawingWordTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof word_type_dto_1.WordTypeDto !== "undefined" && word_type_dto_1.WordTypeDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], DrawingWordTypeController.prototype, "addDrawingWordType", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrawingWordTypeController.prototype, "getDrawingWordTypes", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawingWordTypeController.prototype, "deleteDrawingWordType", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof word_type_dto_1.WordTypeDto !== "undefined" && word_type_dto_1.WordTypeDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DrawingWordTypeController.prototype, "updateDrawingWordType", null);
exports.DrawingWordTypeController = DrawingWordTypeController = __decorate([
    (0, roles_decorator_1.Roles)(account_1.UserRole.ADMIN),
    (0, common_1.Controller)('drawing-word-type'),
    __metadata("design:paramtypes", [typeof (_a = typeof drawing_word_type_service_1.DrawingWordTypeService !== "undefined" && drawing_word_type_service_1.DrawingWordTypeService) === "function" ? _a : Object])
], DrawingWordTypeController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingWordTypeService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(6);
let DrawingWordTypeService = class DrawingWordTypeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    addWordType(wordType) {
        return this.prismaService.drawingWordType.create({
            data: { type: wordType.type, price: wordType.price },
        });
    }
    deleteWordType(id) {
        return this.prismaService.drawingWordType.delete({ where: { id } });
    }
    updateWordType(id, wordType) {
        return this.prismaService.drawingWordType.update({
            where: { id },
            data: { type: wordType.type, price: wordType.price },
        });
    }
    getWordTypes() {
        return this.prismaService.drawingWordType.findMany({
            orderBy: { id: 'asc' },
        });
    }
};
exports.DrawingWordTypeService = DrawingWordTypeService;
exports.DrawingWordTypeService = DrawingWordTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], DrawingWordTypeService);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WordTypeDto = void 0;
const class_validator_1 = __webpack_require__(14);
class WordTypeDto {
}
exports.WordTypeDto = WordTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WordTypeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], WordTypeDto.prototype, "price", void 0);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingMessageModule = void 0;
const common_1 = __webpack_require__(3);
const drawing_message_controller_1 = __webpack_require__(34);
const drawing_message_service_1 = __webpack_require__(35);
const _app_1 = __webpack_require__(16);
const guard_module_1 = __webpack_require__(18);
const auth_guard_1 = __webpack_require__(19);
const core_1 = __webpack_require__(1);
const game_player_module_1 = __webpack_require__(41);
let DrawingMessageModule = class DrawingMessageModule {
};
exports.DrawingMessageModule = DrawingMessageModule;
exports.DrawingMessageModule = DrawingMessageModule = __decorate([
    (0, common_1.Module)({
        imports: [guard_module_1.GuardModule, _app_1.PrismaModule, game_player_module_1.GamePlayerModule],
        controllers: [drawing_message_controller_1.DrawingMessageController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            drawing_message_service_1.DrawingMessageService,
        ],
    })
], DrawingMessageModule);


/***/ }),
/* 34 */
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawingMessageController = void 0;
const common_1 = __webpack_require__(3);
const drawing_message_service_1 = __webpack_require__(35);
const express_1 = __webpack_require__(12);
const class_validator_1 = __webpack_require__(14);
const drawing_message_dto_1 = __webpack_require__(39);
const open_letter_dto_1 = __webpack_require__(40);
let DrawingMessageController = class DrawingMessageController {
    constructor(drawingMessageService) {
        this.drawingMessageService = drawingMessageService;
    }
    addDrawingMessage(drawingMessage, req) {
        return this.drawingMessageService.addDrawingMessage(drawingMessage, req.user);
    }
    openLetter(openLetterDto, req) {
        return this.drawingMessageService.openLetter(openLetterDto.drawingId, req.user, openLetterDto.letterIndex);
    }
    getDrawingMessages(req, drawingId) {
        const numberId = parseInt(drawingId);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.drawingMessageService.getCurrentDrawingMessages(numberId, req.user);
    }
};
exports.DrawingMessageController = DrawingMessageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof drawing_message_dto_1.DrawingMessageDto !== "undefined" && drawing_message_dto_1.DrawingMessageDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DrawingMessageController.prototype, "addDrawingMessage", null);
__decorate([
    (0, common_1.Post)('open-letter'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof open_letter_dto_1.OpenLetterDto !== "undefined" && open_letter_dto_1.OpenLetterDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], DrawingMessageController.prototype, "openLetter", null);
__decorate([
    (0, common_1.Get)('drawing/:drawingId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('drawingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, String]),
    __metadata("design:returntype", void 0)
], DrawingMessageController.prototype, "getDrawingMessages", null);
exports.DrawingMessageController = DrawingMessageController = __decorate([
    (0, common_1.Controller)('drawing-message'),
    __metadata("design:paramtypes", [typeof (_a = typeof drawing_message_service_1.DrawingMessageService !== "undefined" && drawing_message_service_1.DrawingMessageService) === "function" ? _a : Object])
], DrawingMessageController);


/***/ }),
/* 35 */
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
exports.DrawingMessageService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(6);
const game_player_service_1 = __webpack_require__(36);
const game_1 = __webpack_require__(9);
const game_2 = __webpack_require__(37);
const messages_1 = __webpack_require__(38);
const prices_1 = __webpack_require__(11);
let DrawingMessageService = class DrawingMessageService {
    constructor(prismaService, gamePlayerService) {
        this.prismaService = prismaService;
        this.gamePlayerService = gamePlayerService;
    }
    async addDrawingMessage(drawingMessage, user) {
        const drawing = await this.prismaService.drawing.findUnique({
            where: { id: drawingMessage.drawingId },
            include: { game: { include: { players: true } }, word: true },
        });
        const gamePlayer = drawing.game.players.find((player) => player.userId === user.id);
        if (gamePlayer.id === drawing.gamePlayerId) {
            throw new common_1.BadRequestException('You cannot guess your own drawing');
        }
        if (!drawing.game || !gamePlayer) {
            throw new common_1.BadRequestException('You are not in a game');
        }
        if (!drawing.game.startDate) {
            throw new common_1.BadRequestException('Game has not started');
        }
        if (drawing.game.endDate) {
            throw new common_1.BadRequestException('Game has ended');
        }
        const timePassedAfterGameStart = Date.now() - drawing.game.startDate.getTime();
        const timePassedAfterRoundStart = timePassedAfterGameStart -
            (drawing.game.currentRound - 1) *
                (drawing.game.roundDuration + game_1.breakSecondsNumber) *
                1000;
        if (timePassedAfterRoundStart > drawing.game.roundDuration * 1000) {
            throw new common_1.BadRequestException('Game in break phase');
        }
        if (timePassedAfterRoundStart < game_1.noGuessesSecondsNumber * 1000) {
            throw new common_1.BadRequestException(`You cannot make a guess before ${game_1.noGuessesSecondsNumber} seconds of round passed`);
        }
        const roundPartPassed = timePassedAfterRoundStart / (drawing.game.roundDuration * 1000);
        const messages = await this.prismaService.drawingMessage.findMany({
            where: {
                drawingId: drawingMessage.drawingId,
                gamePlayerId: gamePlayer.id,
            },
        });
        if (messages.find((message) => message.message.toLowerCase() === drawing.word.word.toLowerCase())) {
            throw new common_1.BadRequestException('You have already guessed this word');
        }
        let isGuessed = false;
        const pointsToAddGuesser = (0, game_2.calculatePoints)(roundPartPassed);
        const pointsToAddDrawer = (0, game_2.calculatePoints)(roundPartPassed, true);
        let updatedPoints = gamePlayer.points;
        if (drawing.word.word.toLowerCase() === drawingMessage.message.toLowerCase()) {
            isGuessed = true;
            const [guesser] = await Promise.all([
                this.gamePlayerService.addPoints(gamePlayer.id, pointsToAddGuesser),
                this.gamePlayerService.addPoints(drawing.gamePlayerId, pointsToAddDrawer),
            ]);
            updatedPoints = guesser.points;
        }
        return {
            isGuessed,
            updatedPoints: updatedPoints,
            guessedLetters: drawing.game.isSimplified
                ? (0, messages_1.getGuessedLettersFromMessages)([
                    ...messages.map((message) => message.message),
                    drawingMessage.message,
                ], drawing.word.word)
                : null,
            message: await this.prismaService.drawingMessage.create({
                data: {
                    isGuessed,
                    isFirst: messages.length === 0,
                    secondsPassedAfterRound: timePassedAfterRoundStart / 1000,
                    message: drawingMessage.message,
                    drawingId: drawingMessage.drawingId,
                    sendDate: new Date(),
                    gamePlayerId: gamePlayer.id,
                    isLetterBought: false,
                },
            }),
        };
    }
    async openLetter(drawingId, user, letterIndex) {
        if (user.money < prices_1.Prices.OpenLetter) {
            throw new common_1.BadRequestException('Not enough money');
        }
        const drawing = await this.prismaService.drawing.findUnique({
            where: { id: drawingId },
            include: { game: { include: { players: true } }, word: true },
        });
        const gamePlayer = drawing.game.players.find((player) => player.userId === user.id);
        if (gamePlayer.id === drawing.gamePlayerId) {
            throw new common_1.BadRequestException('You open letter of your own drawing');
        }
        if (!drawing.game || !gamePlayer) {
            throw new common_1.BadRequestException('You are not in a game');
        }
        if (!drawing.game.startDate) {
            throw new common_1.BadRequestException('Game has not started');
        }
        if (drawing.game.endDate) {
            throw new common_1.BadRequestException('Game has ended');
        }
        if (drawing.word.word.length <= letterIndex || letterIndex < 0) {
            throw new common_1.BadRequestException('Invalid letter index');
        }
        const timePassedAfterGameStart = Date.now() - drawing.game.startDate.getTime();
        const timePassedAfterRoundStart = timePassedAfterGameStart -
            (drawing.game.currentRound - 1) *
                (drawing.game.roundDuration + game_1.breakSecondsNumber) *
                1000;
        const roundPartPassed = timePassedAfterRoundStart / (drawing.game.roundDuration * 1000);
        if (timePassedAfterRoundStart > drawing.game.roundDuration * 1000) {
            throw new common_1.BadRequestException('Game in break phase');
        }
        if (timePassedAfterRoundStart < game_1.noGuessesSecondsNumber * 1000) {
            throw new common_1.BadRequestException(`You cannot open letter before ${game_1.noGuessesSecondsNumber} seconds of round passed`);
        }
        const messages = await this.prismaService.drawingMessage.findMany({
            where: {
                drawingId: drawingId,
                gamePlayerId: gamePlayer.id,
            },
        });
        if (messages.find((message) => message.message.toLowerCase() === drawing.word.word.toLowerCase())) {
            throw new common_1.BadRequestException('You have already guessed this word');
        }
        if (messages.find((message) => message.message[letterIndex]?.toLowerCase() ===
            drawing.word.word[letterIndex]?.toLowerCase())) {
            throw new common_1.BadRequestException('You have already opened this letter');
        }
        if (messages.some((message) => message.isLetterBought)) {
            throw new common_1.BadRequestException('You have already bought a letter');
        }
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { money: { decrement: prices_1.Prices.OpenLetter } },
        });
        const messageWithOpenedLetter = Array(drawing.word.word.length).fill('_');
        messageWithOpenedLetter[letterIndex] = drawing.word.word[letterIndex];
        let isGuessed = false;
        const pointsToAddGuesser = (0, game_2.calculatePoints)(roundPartPassed);
        const pointsToAddDrawer = (0, game_2.calculatePoints)(roundPartPassed, true);
        let updatedPoints = gamePlayer.points;
        const guessedLetters = (0, messages_1.getGuessedLettersFromMessages)([
            ...messages.map((message) => message.message),
            messageWithOpenedLetter.join(''),
        ], drawing.word.word);
        if (guessedLetters.every((letter) => letter !== null)) {
            isGuessed = true;
            const [guesser] = await Promise.all([
                this.gamePlayerService.addPoints(gamePlayer.id, pointsToAddGuesser),
                this.gamePlayerService.addPoints(drawing.gamePlayerId, pointsToAddDrawer),
            ]);
            updatedPoints = guesser.points;
        }
        return {
            isGuessed,
            updatedPoints: updatedPoints,
            updatedMoney: user.money - prices_1.Prices.OpenLetter,
            guessedLetters: drawing.game.isSimplified ? guessedLetters : null,
            message: await this.prismaService.drawingMessage.create({
                data: {
                    isGuessed,
                    isFirst: messages.length === 0,
                    secondsPassedAfterRound: timePassedAfterRoundStart / 1000,
                    message: messageWithOpenedLetter.join(''),
                    drawingId: drawingId,
                    sendDate: new Date(),
                    gamePlayerId: gamePlayer.id,
                    isLetterBought: true,
                },
            }),
        };
    }
    async getCurrentDrawingMessages(drawingId, user) {
        const drawing = await this.prismaService.drawing.findUnique({
            where: { id: drawingId },
            include: { game: { include: { players: true } }, word: true },
        });
        if (!drawing) {
            throw new common_1.BadRequestException('Drawing not found');
        }
        const gamePlayer = drawing.game.players.find((player) => player.userId === user.id);
        if (!gamePlayer) {
            throw new common_1.BadRequestException('You are not in a game');
        }
        const messages = await this.prismaService.drawingMessage.findMany({
            where: { gamePlayerId: gamePlayer.id, drawingId },
        });
        return {
            isGuessed: messages.findIndex((message) => message.message.toLowerCase() === drawing.word.word.toLowerCase()) !== -1,
            guessedLetters: drawing.game.isSimplified
                ? (0, messages_1.getGuessedLettersFromMessages)(messages.map((message) => message.message), drawing.word.word)
                : null,
            messages,
        };
    }
};
exports.DrawingMessageService = DrawingMessageService;
exports.DrawingMessageService = DrawingMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof game_player_service_1.GamePlayerService !== "undefined" && game_player_service_1.GamePlayerService) === "function" ? _b : Object])
], DrawingMessageService);


/***/ }),
/* 36 */
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
exports.GamePlayerService = void 0;
const prisma_service_1 = __webpack_require__(6);
const common_1 = __webpack_require__(3);
let GamePlayerService = class GamePlayerService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async addPoints(gamePlayerId, points) {
        return await this.prismaService.gamePlayer.update({
            where: { id: gamePlayerId },
            data: { points: { increment: points } },
        });
    }
};
exports.GamePlayerService = GamePlayerService;
exports.GamePlayerService = GamePlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], GamePlayerService);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.calculatePoints = exports.MaxGameDrawings = void 0;
const game_1 = __webpack_require__(9);
exports.MaxGameDrawings = 12;
const calculatePoints = (roundPassedPart, isDrawer = false) => {
    return isDrawer
        ? game_1.defaultPointsGuessedForDrawer +
            Math.round(roundPassedPart * game_1.extraPointsGuessedForDrawer)
        : game_1.defaultPointsForGuess +
            Math.round(roundPassedPart * game_1.extraMaxPointsForGuess);
};
exports.calculatePoints = calculatePoints;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGuessedLettersFromMessages = void 0;
const getGuessedLettersFromMessages = (messages, word) => {
    const letters = word.split('');
    return letters.map((letter, index) => messages.some((message) => message[index]?.toLowerCase() === letter?.toLowerCase())
        ? letter
        : null);
};
exports.getGuessedLettersFromMessages = getGuessedLettersFromMessages;


/***/ }),
/* 39 */
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
exports.DrawingMessageDto = void 0;
const class_validator_1 = __webpack_require__(14);
class DrawingMessageDto {
}
exports.DrawingMessageDto = DrawingMessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrawingMessageDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrawingMessageDto.prototype, "drawingId", void 0);


/***/ }),
/* 40 */
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
exports.OpenLetterDto = void 0;
const class_validator_1 = __webpack_require__(14);
class OpenLetterDto {
}
exports.OpenLetterDto = OpenLetterDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OpenLetterDto.prototype, "letterIndex", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OpenLetterDto.prototype, "drawingId", void 0);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GamePlayerModule = void 0;
const common_1 = __webpack_require__(3);
const game_player_service_1 = __webpack_require__(36);
const _app_1 = __webpack_require__(16);
let GamePlayerModule = class GamePlayerModule {
};
exports.GamePlayerModule = GamePlayerModule;
exports.GamePlayerModule = GamePlayerModule = __decorate([
    (0, common_1.Module)({
        imports: [_app_1.PrismaModule],
        providers: [game_player_service_1.GamePlayerService],
        exports: [game_player_service_1.GamePlayerService],
    })
], GamePlayerModule);


/***/ }),
/* 42 */
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
const socket_service_1 = __webpack_require__(10);
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const drawing_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(15);
async function bootstrap() {
    const app = await core_1.NestFactory.create(drawing_module_1.DrawingModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    await app.startAllMicroservices();
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        credentials: true,
    });
    const port = configService.get('PORT_DRAWING');
    await app.listen(port);
}
bootstrap();

})();

/******/ })()
;