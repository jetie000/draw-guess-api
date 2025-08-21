# Draw & Guess API 🎨

Микросервисная архитектура для игры "Рисуй и Угадывай" (Draw & Guess), построенная на NestJS с использованием PostgreSQL и WebSocket для real-time взаимодействия.

## 📋 Содержание

- [Описание проекта](#описание-проекта)
- [Архитектура](#архитектура)
- [Технологии](#технологии)
- [Установка и запуск](#установка-и-запуск)
- [API Документация](#api-документация)
- [WebSocket Events](#websocket-events)
- [База данных](#база-данных)
- [Разработка](#разработка)
- [Деплой](#деплой)

## 🎯 Описание проекта

Draw & Guess - это многопользовательская игра, где игроки рисуют заданные слова, а другие участники пытаются их угадать. Проект реализован в виде микросервисной архитектуры для обеспечения масштабируемости и гибкости.

### Основные возможности

- 🔐 Аутентификация через JWT и Google OAuth
- 🎮 Создание публичных и приватных игровых комнат
- ✏️ Real-time рисование с WebSocket
- 💬 Система чата и угадываний
- 🏆 Система достижений и опыта
- 💰 Экономика (покупка подсказок, премиум слов)
- 📊 Статистика игроков
- 👥 Многопользовательские игры

## 🏗️ Архитектура

Проект состоит из 3 микросервисов:

### 1. Account Service (Порт: 3000)

**Управление пользователями и аутентификация**

- Регистрация и авторизация
- JWT токены (access + refresh)
- Google OAuth интеграция
- Email уведомления
- Система достижений
- Управление профилем

### 2. Game Service (Порт: 3002)

**Управление игровыми сессиями**

- Создание игровых комнат
- WebSocket коммуникация
- Управление игроками
- Отслеживание очков
- Игровая логика

### 3. Drawing Service (Порт: 3001)

**Управление рисунками и игровым процессом**

- Создание и сохранение рисунков
- Система сообщений
- Управление словами
- Покупка подсказок

## 🛠️ Технологии

### Backend

- **NestJS** - фреймворк для Node.js
- **TypeScript** - типизированный JavaScript
- **Prisma** - ORM для PostgreSQL
- **Socket.io** - WebSocket библиотека
- **JWT** - аутентификация
- **Passport** - стратегии аутентификации

### База данных

- **PostgreSQL** - основная база данных

### Инфраструктура

- **Docker** - контейнеризация
- **Docker Compose** - оркестрация сервисов

## 🚀 Установка и запуск

### Предварительные требования

- Node.js 18+
- Docker и Docker Compose
- PostgreSQL (если запуск без Docker)

### Быстрый запуск с Docker

1. **Клонирование репозитория**

```bash
git clone <repository-url>
cd draw-guess-api
```

2. **Настройка переменных окружения**

```bash
cp .env.example .env.development.docker
# Отредактируйте .env.development.docker с вашими настройками
```

3. **Запуск всех сервисов**

```bash
docker-compose up -d
```

Сервисы будут доступны по адресам:

- Account Service: http://localhost:3000
- Drawing Service: http://localhost:3001
- Game Service: http://localhost:3002
- Frontend: http://localhost:80

### Локальная разработка

1. **Установка зависимостей**

```bash
npm install
```

2. **Настройка базы данных**

```bash
# Создание миграций
npx prisma migrate dev

# Генерация Prisma Client
npx prisma generate
```

3. **Запуск сервисов**

```bash
# Account Service
npm run start:account

# Drawing Service
npm run start:drawing

# Game Service
npm run start:game
```

## 📚 API Документация

### Account Service API

#### Аутентификация

```http
POST /user/login
POST /user/sign-up
POST /user/login-google
POST /user/logout
GET /user/refresh-token
```

#### Управление пользователем

```http
GET /user/profile
PATCH /user/profile
GET /user/request-code/:email
PUT /user/reset-password
```

#### Достижения

```http
GET /user/achievements
```

### Game Service API

#### Управление играми

```http
POST /game
POST /game/join
GET /game/participating
GET /game/public
GET /game/:id
DELETE /game/:id
POST /game/:id/start
```

### Drawing Service API

#### Рисование

```http
POST /drawing
POST /drawing/change-word/:gameId
GET /drawing/game-current/:gameId
GET /drawing/my
```

#### Сообщения

```http
POST /drawing/message
GET /drawing/messages/:drawingId
```

#### Слова

```http
GET /drawing/words
GET /drawing/word-types
```

## 🔌 WebSocket Events

### Подключение к игре

```javascript
// Присоединение к публичной комнате
socket.emit('joinPublic');

// Присоединение к игре
socket.emit('joinGame', { player, room });

// Выход из игры
socket.emit('leaveGame', { room, userId });
```

### Рисование

```javascript
// Добавление части рисунка
socket.emit('addDrawingPart', {
  drawingId: number,
  lineWidth: number,
  color: string,
  posX: number[],
  posY: number[]
});
```

### Сообщения

```javascript
// Отправка сообщения
socket.emit('sendMessage', {
  drawingId: number,
  message: string,
});
```

### Слушатели событий

```javascript
// Новый игрок присоединился
socket.on('joinedGame', (player) => {});

// Игрок покинул игру
socket.on('leftGame', (userId) => {});

// Обновление рисунка
socket.on('drawingUpdated', (drawingPart) => {});

// Новое сообщение
socket.on('newMessage', (message) => {});
```

## 🗄️ База данных

### Основные сущности

#### User

```sql
- id: Int (PK)
- email: String (unique)
- password: String
- username: String
- role: Int
- experience: Int
- money: Int
- achievements: Achievement[]
```

#### Game

```sql
- id: Int (PK)
- code: String
- creatorId: Int (FK -> User)
- isPrivate: Boolean
- maxPlayers: Int
- roundDuration: Int
- currentRound: Int
- players: GamePlayer[]
```

#### Drawing

```sql
- id: Int (PK)
- gamePlayerId: Int (FK -> GamePlayer)
- gameId: Int (FK -> Game)
- roundNumber: Int
- wordId: Int (FK -> DrawingWord)
- drawingParts: DrawingPart[]
- messages: DrawingMessage[]
```

### Миграции

```bash
# Создание новой миграции
npx prisma migrate dev --name migration_name

# Применение миграций
npx prisma migrate deploy

# Сброс базы данных
npx prisma migrate reset
```

## 👨‍💻 Разработка

### Структура проекта

```
draw-guess-api/
├── apps/
│   ├── account/          # Сервис аутентификации
│   ├── drawing/          # Сервис рисования
│   └── game/            # Сервис игр
├── libs/                # Общие библиотеки
│   ├── auth/           # Аутентификация
│   ├── prisma/         # База данных
│   ├── socket/         # WebSocket
│   └── helpers/        # Вспомогательные функции
└── docker-compose.yml
```

### Команды разработки

```bash
# Запуск тестов
npm run test

# Линтинг
npm run lint

# Форматирование кода
npm run format

# Сборка проекта
npm run build

# Запуск в режиме разработки
npm run start:dev
```

### Переменные окружения

Создайте файл `.env.development`:

```env
# База данных
DATABASE_URL="postgresql://user:password@localhost:5432/draw_guess"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Frontend
FRONTEND_URL="http://localhost:3000"
```

## 🚀 Деплой

### Docker Compose (Production)

```bash
# Сборка и запуск
docker-compose -f docker-compose.prod.yml up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

### Kubernetes

```bash
# Применение конфигураций
kubectl apply -f k8s/

# Проверка статуса
kubectl get pods
kubectl get services
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

- Создайте Issue в GitHub
- Обратитесь к документации API
- Проверьте логи сервисов

---

**Draw & Guess API** - Создано с ❤️ для любителей рисования и угадывания!
