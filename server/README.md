# e-commerce diStoretion
## Documentation

### List of User Routes :

Route          | Method | Description            | Attributes                   |
-------------- | ------ | ---------------------- | ---------------------------- |
users/signup | POST   | register user          | name,email,username,password |
users/signin    | POST   | login user manual      | email & password             |
users/loginfb  | POST   | login using fb         | email                        |
carts/pay  | POST   | checkout item        |                         |



### List of Admin Routes : 

Route                 | Method | Description                             | Attributes                   |
--------------------- | ------ | --------------------------------------- | ---------------------------- |
items/    | GET    | get all item     | admin token id                |
items/:id | GET    | get specific item| admin token id                |
items/    | POST   | add new item     | name,price,stock,image                           |
items/:id | PUT    | edit item        | name,price,stock,image                 |
items/ :id| DELETE | delete item      | item id|
items/upload| PUT  | upload image item| image                           |


## USAGE
```
npm install
npm run dev
```

Access via http://localhost:3000