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
exports.GameModule = void 0;
const common_1 = __webpack_require__(3);
const game_controller_1 = __webpack_require__(4);
const game_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(21);
const _app_1 = __webpack_require__(22);
const core_1 = __webpack_require__(1);
const auth_guard_1 = __webpack_require__(24);
const guard_module_1 = __webpack_require__(27);
const game_events_module_1 = __webpack_require__(31);
const drawing_service_1 = __webpack_require__(12);
const achievements_service_1 = __webpack_require__(14);
let GameModule = class GameModule {
};
exports.GameModule = GameModule;
exports.GameModule = GameModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env.development',
            }),
            guard_module_1.GuardModule,
            _app_1.PrismaModule,
            game_events_module_1.GameEventsModule,
        ],
        controllers: [game_controller_1.GameController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            game_service_1.GameService,
            drawing_service_1.DrawingService,
            achievements_service_1.AchievementsService,
        ],
    })
], GameModule);


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameController = void 0;
const common_1 = __webpack_require__(3);
const game_service_1 = __webpack_require__(5);
const create_game_dto_1 = __webpack_require__(18);
const express_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(19);
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    createGame(createGameDto, req) {
        return this.gameService.createGame(createGameDto, req.user);
    }
    joinGame(code, req) {
        return this.gameService.joinGame(code, req.user);
    }
    getParticipatingGames(req, isEnded = 'false') {
        return this.gameService.getParticipatingGames(req.user, isEnded === 'true');
    }
    getPublicGames(req) {
        return this.gameService.getPublicGames(req.user);
    }
    getGame(id, req) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.gameService.getGame(numberId, req.user);
    }
    deleteLeaveGame(id, req) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.gameService.deleteLeaveGame(numberId, req.user);
    }
    startGame(id, req) {
        const numberId = parseInt(id);
        if ((0, class_validator_1.isInt)(numberId) === false) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return this.gameService.startGame(numberId, req.user);
    }
};
exports.GameController = GameController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_game_dto_1.CreateGameDto !== "undefined" && create_game_dto_1.CreateGameDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createGame", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "joinGame", null);
__decorate([
    (0, common_1.Get)('participating'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('isEnded')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, String]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getParticipatingGames", null);
__decorate([
    (0, common_1.Get)('public'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getPublicGames", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGame", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_h = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "deleteLeaveGame", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "startGame", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [typeof (_a = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _a : Object])
], GameController);


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(6);
const game_1 = __webpack_require__(8);
const random_1 = __webpack_require__(10);
const socket_service_1 = __webpack_require__(11);
const drawing_service_1 = __webpack_require__(12);
const game_2 = __webpack_require__(9);
const achievements_service_1 = __webpack_require__(14);
let GameService = class GameService {
    constructor(prismaService, socketService, drawingService, achievementsService) {
        this.prismaService = prismaService;
        this.socketService = socketService;
        this.drawingService = drawingService;
        this.achievementsService = achievementsService;
    }
    async createGame(createGameDto, user) {
        if (createGameDto.maxPlayers * createGameDto.drawingsPerPlayer >
            game_1.MaxGameDrawings) {
            throw new common_1.BadRequestException('Too many drawings for that amount of players');
        }
        const gameParticipating = await this.prismaService.game.findFirst({
            where: { players: { some: { userId: user.id } }, endDate: null },
        });
        if (gameParticipating) {
            throw new common_1.BadRequestException('You are already in another game');
        }
        const wordTypes = await this.prismaService.drawingWordType.findMany({
            where: { id: { in: createGameDto.wordTypeIds } },
        });
        const wordTypesCost = wordTypes.reduce((acc, wordType) => acc + wordType.price, 0);
        if (wordTypesCost > user.money) {
            throw new common_1.BadRequestException('Not enough money');
        }
        let code = (0, random_1.randomCode)(6);
        while (true) {
            const gameFinded = await this.prismaService.game.findFirst({
                where: { code },
            });
            if (!gameFinded) {
                break;
            }
            code = (0, random_1.randomCode)(6);
        }
        const game = await this.prismaService.game.create({
            data: {
                drawingsPerPlayer: createGameDto.drawingsPerPlayer,
                maxPlayers: createGameDto.maxPlayers,
                isPrivate: createGameDto.isPrivate,
                isSimplified: createGameDto.isSimplified,
                roundDuration: createGameDto.roundDuration,
                wordTypes: {
                    connect: createGameDto.wordTypeIds.map((id) => ({ id })),
                },
                code,
                creatorId: user.id,
                players: {
                    create: {
                        userId: user.id,
                    },
                },
            },
        });
        const userUpdated = await this.prismaService.user.update({
            where: { id: user.id },
            data: {
                money: {
                    decrement: wordTypesCost,
                },
            },
        });
        return { gameId: game.id, updatedMoney: userUpdated.money };
    }
    async joinGame(code, user) {
        const gameParticipating = await this.prismaService.game.findFirst({
            where: { players: { some: { userId: user.id } }, endDate: null },
        });
        if (gameParticipating) {
            if (gameParticipating.code === code.toLowerCase()) {
                return gameParticipating.id;
            }
            throw new common_1.BadRequestException('You are already in another game');
        }
        const game = await this.prismaService.game.findFirst({
            where: { code: code.toLowerCase() },
            include: { players: true },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        if (game.players.some((player) => player.userId === user.id)) {
            return game.id;
        }
        if (game.players.length === game.maxPlayers) {
            throw new common_1.BadRequestException('Game is full');
        }
        const gameUpdated = await this.prismaService.game.update({
            where: { id: game.id },
            data: {
                players: {
                    create: { userId: user.id },
                },
            },
        });
        return gameUpdated.id;
    }
    async getGame(id, user) {
        const game = await this.prismaService.game.findUnique({
            where: { id, players: { some: { userId: user.id } } },
            include: {
                players: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                avatarUrl: true,
                                username: true,
                                experience: true,
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
        const drawings = game.endDate
            ? await this.prismaService.drawing.findMany({
                where: { gameId: game.id },
                include: {
                    drawingParts: true,
                    word: true,
                },
                orderBy: { roundNumber: 'asc' },
            })
            : null;
        return { ...game, drawings };
    }
    async getParticipatingGames(user, isEnded) {
        return await this.prismaService.game.findMany({
            where: {
                players: { some: { userId: user.id } },
                endDate: isEnded ? { not: null } : null,
            },
            include: {
                players: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                avatarUrl: true,
                                username: true,
                            },
                        },
                    },
                },
                wordTypes: true,
            },
            orderBy: { id: 'desc' },
        });
    }
    async getPublicGames(user) {
        return await this.prismaService.game.findMany({
            where: {
                players: { none: { userId: user.id } },
                startDate: null,
                isPrivate: false,
            },
            include: {
                players: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                avatarUrl: true,
                                username: true,
                            },
                        },
                    },
                },
                wordTypes: true,
            },
        });
    }
    async deleteLeaveGame(id, user) {
        const game = await this.prismaService.game.findUnique({
            where: { id },
            include: { players: true, wordTypes: true },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        if (game.startDate) {
            throw new common_1.BadRequestException('Game has started');
        }
        if (game.creatorId !== user.id) {
            if (!game.players.some((player) => player.userId === user.id)) {
                throw new common_1.BadRequestException('You are not in this game');
            }
            return this.prismaService.game.update({
                where: { id },
                data: {
                    players: {
                        deleteMany: { userId: user.id },
                    },
                },
            });
        }
        const wordTypesCost = game.wordTypes.reduce((acc, wordType) => acc + wordType.price, 0);
        return {
            game: await this.prismaService.game.delete({
                where: { id },
            }),
            updatedMoney: (await this.prismaService.user.update({
                where: { id: user.id },
                data: {
                    money: {
                        increment: wordTypesCost,
                    },
                },
            })).money,
        };
    }
    async startGame(id, user) {
        const game = await this.prismaService.game.findUnique({
            where: { id },
            include: { players: true },
        });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        if (game.creatorId !== user.id) {
            throw new common_1.BadRequestException('You are not the creator of this game');
        }
        if (game.players.length < 2) {
            throw new common_1.BadRequestException('Not enough players');
        }
        if (game.startDate) {
            throw new common_1.BadRequestException('Game has already started');
        }
        await this.drawingService.addDrawings(game.id);
        const gameStarted = await this.prismaService.game.update({
            where: { id },
            data: { startDate: new Date() },
        });
        this.socketService.socket
            .to(String(game.id))
            .emit('gameStarted', gameStarted.startDate.toISOString());
        this.sendTime({ ...game, startDate: gameStarted.startDate });
        return gameStarted;
    }
    sendTime(game) {
        const timeToEndGame = (game.roundDuration + game_2.breakSecondsNumber) *
            game.drawingsPerPlayer *
            game.players.length;
        let nextSecond = 1;
        let timeToNextSecond = game.startDate.getTime() + nextSecond * 1000 - Date.now();
        const timePassedHandler = () => {
            if (nextSecond === timeToEndGame) {
                this.endGame(game.id);
                return;
            }
            if (nextSecond % (game.roundDuration + game_2.breakSecondsNumber) ===
                game.roundDuration) {
                this.increaseRound(game.id, nextSecond === nextSecond - game_2.breakSecondsNumber);
            }
            this.socketService.socket
                .to(String(game.id))
                .emit('timePassed', nextSecond);
            nextSecond += 1;
            timeToNextSecond =
                game.startDate.getTime() + nextSecond * 1000 - Date.now();
            setTimeout(() => {
                timePassedHandler();
            }, timeToNextSecond);
        };
        setTimeout(() => {
            timePassedHandler();
        }, timeToNextSecond);
    }
    async increaseRound(gameId, isLastRound) {
        await this.prismaService.game.update({
            where: { id: gameId },
            data: { currentRound: { increment: 1 } },
        });
        this.sendUpdatedPlayers(gameId, isLastRound);
    }
    async sendUpdatedPlayers(gameId, isLastRound) {
        const game = await this.prismaService.game.findUnique({
            where: { id: gameId },
            include: {
                players: {
                    orderBy: { id: 'asc' },
                    include: {
                        user: {
                            select: {
                                id: true,
                                avatarUrl: true,
                                username: true,
                                experience: true,
                            },
                        },
                    },
                },
            },
        });
        if (isLastRound) {
            await this.prismaService.$transaction(async (prisma) => {
                game.players = await Promise.all(game.players.map(async (player) => {
                    this.achievementsService.recalculateAchievements(player.user, gameId);
                    await prisma.user.update({
                        where: { id: player.userId },
                        data: { experience: { increment: player.points } },
                    });
                    return {
                        ...player,
                        user: {
                            ...player.user,
                            experience: player.user.experience + player.points,
                        },
                    };
                }));
            });
        }
        this.socketService.socket
            .to(String(gameId))
            .emit('updatedPlayers', game.players);
    }
    async endGame(gameId) {
        const endDate = new Date();
        const game = await this.prismaService.game.update({
            data: {
                endDate,
            },
            where: { id: gameId },
            include: {
                drawings: {
                    include: {
                        drawingParts: true,
                        word: true,
                    },
                    orderBy: { roundNumber: 'asc' },
                },
            },
        });
        this.socketService.socket
            .to(String(game.id))
            .emit('gameEnded', { endDate, drawings: game.drawings });
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof socket_service_1.SocketService !== "undefined" && socket_service_1.SocketService) === "function" ? _b : Object, typeof (_c = typeof drawing_service_1.DrawingService !== "undefined" && drawing_service_1.DrawingService) === "function" ? _c : Object, typeof (_d = typeof achievements_service_1.AchievementsService !== "undefined" && achievements_service_1.AchievementsService) === "function" ? _d : Object])
], GameService);


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
/* 11 */
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
/* 12 */
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
const random_1 = __webpack_require__(10);
const game_1 = __webpack_require__(9);
const socket_service_1 = __webpack_require__(11);
const prices_1 = __webpack_require__(13);
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
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Prices = void 0;
exports.Prices = {
    OpenLetter: 10,
    ChangeWord: 50,
};


/***/ }),
/* 14 */
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
const achievements_1 = __webpack_require__(15);
const prisma_service_1 = __webpack_require__(6);
const socket_service_1 = __webpack_require__(11);
const achievements_2 = __webpack_require__(17);
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
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMyMessagesStats = exports.getConsecutiveDaysPlaying = exports.getTodayGames = exports.getWonGamesByType = exports.calculateAchievementLevel = void 0;
const constants_1 = __webpack_require__(16);
const achievements_1 = __webpack_require__(17);
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
        const playersSorted = game.players
            .slice()
            .sort((p1, p2) => p2.points - p1.points);
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
        [achievements_1.AchievementsTypeIds.FirstTryGuesses]: drawingMessages.filter((message) => message.isFirst).length,
        [achievements_1.AchievementsTypeIds.QuickQuesses]: drawingMessages.filter((message) => message.secondsPassedAfterRound <= achievements_1.QuickGuessSeconds).length,
    };
};
exports.getMyMessagesStats = getMyMessagesStats;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeaderboardPlayersNumber = exports.CODE_LENGTH = exports.MILLISECONDS_IN_A_DAY = void 0;
exports.MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
exports.CODE_LENGTH = 6;
exports.LeaderboardPlayersNumber = 10;


/***/ }),
/* 17 */
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
/* 18 */
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
exports.CreateGameDto = void 0;
const class_validator_1 = __webpack_require__(19);
class CreateGameDto {
}
exports.CreateGameDto = CreateGameDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(12),
    (0, class_validator_1.Min)(2),
    __metadata("design:type", Number)
], CreateGameDto.prototype, "maxPlayers", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(120),
    (0, class_validator_1.Min)(10),
    __metadata("design:type", Number)
], CreateGameDto.prototype, "roundDuration", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(6),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateGameDto.prototype, "drawingsPerPlayer", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateGameDto.prototype, "isSimplified", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateGameDto.prototype, "isPrivate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateGameDto.prototype, "wordTypeIds", void 0);


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 22 */
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
__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 23 */
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
/* 24 */
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
const config_1 = __webpack_require__(21);
const jwt_1 = __webpack_require__(25);
const prisma_service_1 = __webpack_require__(6);
const public_decorator_1 = __webpack_require__(26);
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
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 27 */
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
const auth_guard_1 = __webpack_require__(24);
const jwt_1 = __webpack_require__(25);
const config_1 = __webpack_require__(21);
const prisma_module_1 = __webpack_require__(23);
const roles_guard_1 = __webpack_require__(28);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const account_1 = __webpack_require__(29);
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(26);
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
/* 29 */
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const account_1 = __webpack_require__(29);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameEventsModule = void 0;
const common_1 = __webpack_require__(3);
const game_gateway_1 = __webpack_require__(32);
const socket_module_1 = __webpack_require__(37);
let GameEventsModule = class GameEventsModule {
};
exports.GameEventsModule = GameEventsModule;
exports.GameEventsModule = GameEventsModule = __decorate([
    (0, common_1.Module)({
        providers: [game_gateway_1.GameGateway],
        imports: [socket_module_1.SocketModule],
    })
], GameEventsModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameGateway = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(21);
const websockets_1 = __webpack_require__(33);
const socket_io_1 = __webpack_require__(34);
const create_game_interface_1 = __webpack_require__(35);
const socket_service_1 = __webpack_require__(11);
const add_drawing_part_interface_1 = __webpack_require__(36);
const publicRoom = 'public-room';
let GameGateway = class GameGateway {
    constructor(socketService) {
        this.socketService = socketService;
        this.logger = new common_1.Logger('GameGateway');
    }
    afterInit(server) {
        this.socketService.socket = server;
    }
    handleConnection(socket) {
        this.logger.log(`Socket connected: ${socket.id}`);
    }
    handleDisconnect(socket) {
        this.logger.log(`Socket disconnected: ${socket.id}`);
    }
    async handleJoinPublic(client) {
        client.join(publicRoom);
    }
    async handleLeavePublic(client) {
        client.leave(publicRoom);
    }
    async handleCreateGamePublic(client, game) {
        client.to(publicRoom).emit('joinedGamePublic', game);
    }
    async handleCreateGame(client, room) {
        client.to(publicRoom).emit('deletedGamePublic', room);
    }
    async handleLeaveGamePublic(client, room, userId) {
        client.to(publicRoom).emit('leftGamePublic', { room, userId });
    }
    async handleJoinGame(client, info) {
        if (!info.player)
            return;
        client.join(String(info.room));
        this.logger.log(`Client with id: ${info.player.user.id} joined room: ${info.room}`);
        client.to(String(info.room)).emit('joinedGame', info.player);
    }
    async handleLeaveGame(client, room, userId) {
        this.logger.log(`Client with id: ${userId} left room: ${room}`);
        client.to(String(room)).emit('leftGame', userId);
        client.leave(String(room));
    }
    async handleDeleteGame(client, room) {
        this.logger.log(`Room deleted: ${room}`);
        client.to(String(room)).emit('deletedGame');
        client.leave(String(room));
    }
    async handleDrewPart(client, drawingData) {
        client.to(String(drawingData.room)).emit('drewPart', drawingData.drawing);
    }
    async handleChangeDrawingWord(client, room) {
        client.to(String(room)).emit('drawingWordChanged');
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinPublic'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleJoinPublic", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leavePublic'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleLeavePublic", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGamePublic'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('game')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object, typeof (_f = typeof create_game_interface_1.CreateGame !== "undefined" && create_game_interface_1.CreateGame) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleCreateGamePublic", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteGamePublic'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _g : Object, Number]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleCreateGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveGamePublic'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __param(2, (0, websockets_1.MessageBody)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object, Number, Number]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleLeaveGamePublic", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __param(2, (0, websockets_1.MessageBody)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _k : Object, Number, Number]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleLeaveGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _l : Object, Number]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleDeleteGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('drewPart'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _m : Object, typeof (_o = typeof add_drawing_part_interface_1.AddDrawingPart !== "undefined" && add_drawing_part_interface_1.AddDrawingPart) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleDrewPart", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('changeDrawingWord'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _p : Object, Number]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleChangeDrawingWord", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: new config_1.ConfigService().get('FRONTEND_URL'),
        },
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof socket_service_1.SocketService !== "undefined" && socket_service_1.SocketService) === "function" ? _a : Object])
], GameGateway);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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
exports.SocketModule = void 0;
const common_1 = __webpack_require__(3);
const socket_service_1 = __webpack_require__(11);
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
const game_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(21);
async function bootstrap() {
    const app = await core_1.NestFactory.create(game_module_1.GameModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    await app.startAllMicroservices();
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        credentials: true,
    });
    const port = configService.get('PORT_GAME');
    await app.listen(port);
}
bootstrap();

})();

/******/ })()
;