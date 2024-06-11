"use strict";
//---------------------------------------------------------------------------------
//Разминка
// Определите интерфейс для пользователя
interface User {
    id: number;
    name: string;
    email: string;
    // Добавьте свойство email типа string
  }
  
  // Определите интерфейс для активности пользователя
  interface Activity {
    userId: number;
    activity: string;
    timestamp: Date;
    // Добавьте свойство timestamp типа Date
  }
  
  // Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
  async function fetchData<T>(url: string): Promise<T> {
    // Реализуйте получение данных с использованием fetch и возвращение их в формате json
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка');
    }
    return response.json()
  }
  
  // Используйте Utility Types для создания Partial и Readonly версий User и Activity
  type PartialUser = Partial<User> // Заполните тип
  type ReadonlyActivity = Readonly<Activity> // Заполните тип
  

  //Типизируйте функцию. userId - число
  function getUserActivities(userId: number): Promise<Activity> {
    return fetchData<Activity>(`/api/activities/${userId}`);
  }
  // Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
  type ActivitiesReturnType = ReturnType<typeof getUserActivities>// Заполните тип
  
  // Используйте extends в условных типах для создания типа Permissions
  type AdminPermissions = { canBanUser: boolean };
  type BasicPermissions = { canEditProfile: boolean };
  // Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
  type UserPermissions<T> = T extends 'admin' ? AdminPermissions : BasicPermissions;
  
  
  ///ЧАСТЬ 2.
  
  // Определите Type Alias для Union типа String или Number
  type StringOrNumber = string | number;// Заполните тип
  
  // Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
  function logMessage(message: StringOrNumber): void {
    // Реализуйте вывод сообщения в консоль
    console.log(message)
  }
  
  // Реализуйте функцию throwError, которая никогда не возвращает управление (never)
  function throwError(errorMsg: string): never {
    // Бросьте исключение с errorMsg
    throw new Error(errorMsg)
  }
  
  // Реализуйте Type Guard для проверки, является ли значение строкой
  function isString(value: StringOrNumber): value is string {
    // Верните результат проверки типа
    return typeof value === 'string';
  }
  
  // Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
  function assertIsNumber(value: any): asserts value is number {
    // Бросьте исключение, если значение не является числом
    if(typeof value !== 'number') {
      throw new Error(`${value} не является числом`);
    }
  }
  
  // Завершите функцию processValue, используя isString и assertIsNumber
  function processValue(value: StringOrNumber) {
    // Реализуйте логику проверки и обработки значения
    if (isString(value)) {
      console.log('Это строка', value.toUpperCase())
    } else {
      assertIsNumber(value);
      console.log('Это число', value.toFixed(2));
    }
  }
  
  // Type Alias и Union
  type StringOrNumber = string | number;
  
  
  //сделайте  Type Guard для определения, является ли значение строкой
  function isString(value): value is string {
    return typeof value === 'string';
  }
  
  // создайте asserts function на число.
  function assertIsNumber(value: any): asserts value is number {
    if(typeof value !== 'number' ) {
      throw new Error(`${value} не является числом`);
    }
  }
  
  // Использование Type Guard и Asserts
  function processValue(value: StringOrNumber) {
    if (isString(value)) {
      console.log(`String value: ${value.toUpperCase()}`);
    } else {
      assertIsNumber(value);
      console.log(`Number value: ${value.toFixed(2)}`);
    }
  }
  
  //---------------------------------------------------------------------------------
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 2: Расширенное использование Generics
  // Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.
  
  // Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
  interface Response<T> {
    data: T;
    status: number;
  }
  
  // Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
  function createResponse<T>(data: T, status: number): Response<T>{
    // Реализуйте создание и возврат объекта Response
    return {
      data: data,
      status: status
    };
  }
  
  // Используйте функцию createResponse для создания ответа с массивом чисел
  const numbersArray = [0, 1 , 2 , 3, 4];
  const numericResponse = createResponse(numbersArray,200);// Заполните вызов функции
  
  // Используйте функцию createResponse для создания ответа с объектом пользователя (User)
  const userk = {
    id: 1,
    name: 'Sanya',
    email: '123@gmail.com'
  }
  const userResponse = createResponse(userk,200)// Заполните вызов функции
  //---------------------------------------------------------------------------------
  
    
  //---------------------------------------------------------------------------------
  // Задание 3: Расширенное использование Generics
  // Цель: Разработать несколько функций для обработки и различения типов данных.
  
  // Определите тип данных для описания автомобиля
  type Car = {
    company: string;
    model: string;
    year: number;
  };
  
  // Определите тип данных для описания велосипеда
  type Bike = {
    company: string;
    type: 'road' | 'mountain';
  };
  
  // Создайте Type Guard для проверки, является ли объект автомобилем
  function isCar(vehicle: any): vehicle is Car  {
    return typeof vehicle.company === 'string'
    && typeof vehicle.model === 'string'
    && typeof vehicle.year === 'number';
  }
  
  // Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
  function printVehicleInfo(vehicle: Car | Bike) {
    if (isCar(vehicle)) {
      console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
    } else {
      console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
    }
  }
  //---------------------------------------------------------------------------------
    
  
  
  //---------------------------------------------------------------------------------
  // Задание 4: Использование Utility Types для работы с интерфейсами
  // Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.
  
  // Определите интерфейс Employee
  interface Employee {
    id: number;
    name: string;
    department: string;
    email: string;
  }
  
  // Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
  type PartialEmployee = Partial<Employee>// Заполните тип
  
  // Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
  type ReadonlyEmployee = Readonly<Employee>// Заполните тип
  
  // Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
  function printEmployeeInfo(employee: PartialEmployee): void {
    console.log('Информация о работнике')

    const proper: {label: string; value: any}[] = [
      {label: 'ID', value: employee.id},
      {label: 'Name', value: employee.name},
      {label: 'Departament', value: employee.department},
      {label: 'Email', value: employee.email},
    ];

    proper.forEach(property => {
      if(proper.values !== undefined) {
        console.log(`${property.label}: ${property.value} `);
      } else {
        console.log(`${property.label}: Свойство отсутствует `);
      }
    })
    // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
  }
  //---------------------------------------------------------------------------------
  
  
  
  
  //---------------------------------------------------------------------------------
  //Задание 5: Работа с Indexed Access Types и Mapped Types
  //Цель: Создать утилиты для работы с объектами и их ключами.
  
  // Определите интерфейс для пользователя
  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }
  
  // Используйте Indexed Access Types для получения типа поля name из User
  type UserNameType = User['name']; // Заполните тип
  
  // Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof
  type UserFieldsToBoolean = {
    [key in keyof User]: boolean;
  }
  
  // Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
  function getUserFieldType<T extends keyof User>(key: T): User[T]{
    // Верните тип ключа
    return null as any;
  }
  
  // Используйте эту функцию для получения типа поля 'age' и 'name'
  const ageType = getUserFieldType('age');
  const nameType = getUserFieldType('name');
  //---------------------------------------------------------------------------------
  
  
  
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 6: Расширение и ограничение Generics
  // Цель: Создать универсальные функции с ограничениями типов.
  
  // Создайте базовый интерфейс для сущностей с идентификатором
  interface Identifiable {
    id: number;
  }
  
  interface User extends Identifiable {
    name: string,
    email: string,
    age: number
  }

  // Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
  function findById<T extends Identifiable>(items: T[], id: T['id']): T | undefined {
    return items.find(item => item.id === id);
  }
  
  // Используйте эту функцию для поиска пользователя по id в массиве пользователей
  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
  ];
  const user = findById(users, 1);
  if (user) {
    console.log(`Пользователь: ${user.name}, ${user.email}, ${user.age}`);
  } else {
    console.log('Пользователь не найден');
  }
  //---------------------------------------------------------------------------------
  
  
  
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 7: Работа с обобщённой функцией поиска в массиве
  // Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
  interface User {
    id: number;
    name: string;
    age: number;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  interface Book {
    isbn: string;
    title: string;
    author: string;
  }
  
  // Разберитесь с типизацией функции и поймите как она работает.
  // Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
  // Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
  function findInArray<T extends object>(items: T[], criteria: Partial<T>): T | undefined {
    if(!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items array');
      return undefined;
    }
    if(!criteria || typeof criteria !== 'object' || Object.keys(criteria).length === 0) {
      console.error('Критерии посика не указаны');
      return undefined;
    }
    return items.find(item => {
      return Object.keys(criteria).every(key => {
        if(criteria[key as keyof T] === undefined || criteria[key as keyof T] === null) {
          console.error(`Значение для ключа '${key}' не указано`);
          return false;
        }
        if(!(key in item)) {
          console.error(`Key '${String(key)}' не существует в элументе`, item);
          return false;
        }
        return item[key as keyof T] === criteria[key as keyof T];
      });
    });
    /* if(key === undefined || key === null) {
      console.error('Ключ отсутствует')
      return undefined;
    }
    if(value === undefined || value === null) {
      console.error('Значение отсутствует')
      return undefined;
    }
    for(const item of items) {
      if(!(key in item)) {
        console.error(`Key '${String(key)}' не существует`, item);
        return undefined;
      }
    } */
  }
  
  // Данные для тестирования функции
  const users: User[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
  ];
  
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 }
  ];
  
  const books: Book[] = [
    { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
    { isbn: "67890", title: "Learning TypeScript", author: "Another One" }
  ];
  
  // 1. Найдите пользователя по имени "Alice".
  const foundUser = findInArray(users, {name: 'Alice'});
  // 2. Найдите продукт с ценой 500.
  const foundProduct = findInArray(products, {price: '500'});
  // 3. Найдите книгу по автору "Another One".
  const foundBook = findInArray(books, {author: 'Another One'});

  console.log(foundUser)
  //---------------------------------------------------------------------------------
  
  
  
  
// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter(items, transform, filter) {
    // Ваш код здесь
    const transformItems = items.map(transform);
    const filterItems = transformItems.filter(filter);
    return filterItems;
}
// Пример данных
const people = [
    { name: "Alice", age: 24 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 32 }
];
// Пример использования функции mapAndFilter
const adults = mapAndFilter(people, (person) => ({ fullName: person.name, age: person.age }), (adult) => adult.age >= 18);
// Выведите результаты для проверки
console.log(adults);
//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
// mapAndFilter должна будет принимать доп параметр, который будет определять критерий сортировки, параметр будет 
// клчючом(опциональным), тогда mapAndFilter будет выполнять сортировку перед возвратом результата  
// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.
// Могут быть разными и не обязательно должны иметь общие характеристики, на примере mapAndFilter
// функция принимает T и преобразует его в тип U, типы T И U могут быть разными T- массив чисел, U - массив строк
//  ts geneticrs как раз позволяет создавать эти обобщенные функции и классы, а также работать с разными типами данных без явного указания конкретных типов
// ну и тем самым ts позволяет создавать пересипользуемый код, ну грубо говоря как я понял  функции и классы могут быть написаны таким образом, чтобы принимать
// и возвращать значения разных типов, не зная их заранее   
//---------------------------------------------------------------------------------
