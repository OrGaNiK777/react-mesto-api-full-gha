[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# [Ссылка на react-mesto-api-full](https://github.com/OrGaNiK777/mesto-final)
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 
  
Пожалуйста, прикрепите в это описание ссылку на сайт, размещенный на Яндекс.Облаке.

# Ссылки на проект

## Публичный ip:

### 158.160.49.56

## Frontend

### https://mesto.organik.nomoredomains.xyz
### http://mesto.organik.nomoredomains.xyz

## Backend

### https://api.mesto.organik.nomoredomains.xyz
### http://api.mesto.organik.nomoredomains.xyz

## Краш-тест сервера

Создан только для ревьюеров.

app.get('/crash-test', () => { setTimeout(() => { throw new Error('Сервер сейчас упадёт'); }, 0); });

Удалить этот код после успешного прохождения ревью.

