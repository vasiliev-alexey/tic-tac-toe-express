https://morioh.com/p/0fc65dd5b7b6

https://dev.to/lcanady/series/5368

https://dev.to/killianfrappartdev/instant-messaging-app-made-with-react-typescript-node-socket-io-27pc

[Как использовать Websocket на примере простого Express API?](https://habr.com/ru/post/516334/)
[Using WebSockets in React ](https://dev.to/finallynero/using-websockets-in-react-4fkp)
[WebSockets tutorial: How to go real-time with Node and React](https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/)
[Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
[react-nice-avatar](https://github.com/dapilab/react-nice-avatar)

[Streaming Updates](https://redux-toolkit.js.org/rtk-query/usage/streaming-updates)

1. Пользователь логиниться -указывает свой логин
2. Пользователь выбирает роль (Игрок X , Игрок O , зритель). - проверить на валидность выбранного
3. Игроки X и Y могут ходить, у зрителей нет права ходить - добавить в стейт - роль (X O R)
4. Зритель может выбрать роль Игрока - только в начале игры - добавить в стейт статус игры
5. Есть кнопка Начать игру - (зависит от стейта)
6. Игровая механика определяется на сервере. ( ходы пушим на сервер и клиенты вытягивают его - и обновляют стейт)

Комопненты:

- форма входа
- Список игроков
- Игровое поле
- ~~Панель с действиями ?~~

Статус игры;

- wait_gamers
- wait_X
- wait_O
- running

npm install react-nice-avatar
