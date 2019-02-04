Тестовое задание для Node.js программиста

Написать модуль для получения часового пояса по названию города.

Принимает название города (`строка`), возвращает идентификатор часового пояса (`строка`).

Модуль должен информировать (удобным образом) в случае request rate limit (429)

Требования:

- ES6, async/await

## 1. API Яндекс.Карт для определения координат по названию города

- [API](https://tech.yandex.ru/maps/geocoder/)

- [Пример запроса](https://geocode-maps.yandex.ru/1.x/?geocode=${city}&format=json&results=1)

## 2. Google Maps Time Zone API для определения часового пояса по координатам

- [API](https://developers.google.com/maps/documentation/timezone/start)

- [Пример запроса](https://maps.googleapis.com/maps/api/timezone/json?location=${coord}&timestamp=${timestamp}&key=${key})

# Sample Coordinates:

New York:

```json
{
  "lowerCorner": "-74.140359 40.587148",
  "upperCorner": "-73.873200 40.840713"
}
```
- Coords: 40.7128° N, 74.0060° W
- Coords Raw: 40.712800, -74.006000
- Median Lon: (40.587148 + 40.840713) / 2 = 40.71393050
- Median Lat: (74.140359 + 73.873200) / 2 = -74.00677950
- Median Lon, Lat: 40.71393050, -74.00677950
- Median Coords: 40.7139° N, 74.0068° W
- Median Coords: 40°42'50.0"N 74°00'24.5"W

- [Yandex API](https://geocode-maps.yandex.ru/1.x/?geocode=new%20york&format=json&results=1)
- [Google API](https://maps.googleapis.com/maps/api/timezone/json?location=40.71393050,-74.00677950&timestamp=1458000000&key=YOUR_API_KEY)

Moscow:

- 55.7558° N, 37.6173° E
- 55.751244, 37.618423

- [Yandex API](https://geocode-maps.yandex.ru/1.x/?geocode=moscow&format=json&results=1)
- [Google API](https://maps.googleapis.com/maps/api/timezone/json?location=55.751244,37.618423&timestamp=1458000000&key=YOUR_API_KEY)

------------

See [API Response Samples](public/api-samples):

- [Google: Moscow](public/api-samples/google-moscow.json)
- [Google: New York](public/api-samples/google-new%20york.json)
- [Yandex: Moscow](public/api-samples/yandex-moscow.json)
- [Yandex: New York](public/api-samples/yandex-new%20york.json)

