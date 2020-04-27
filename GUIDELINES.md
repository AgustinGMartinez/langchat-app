# Code Guidelines

## Project Structure

### Server App

```
-constants
  -index.js
  -user.js
  -coupon.js
-errors
  -index.js
  -GenericError.js
  -MissingArgsError.js
-features
  -users
    -index.js
    -api
      - index.js
      - router.js
      - validations.js
    -model.js
    -service.js
    -service.unit.test.js
    -errors
      -index.js
      -UserNotFoundError.js
    -jobs
      -index.js
      -dailyMailJob.js
      -updateUserCouponUsed.js
-middlewares
  -index.js
  -authMiddleware.js
-services
  - index.js
  - Logger
    - index.js
  Mailer
    - index.js
-tests
  -int
    -userApi.int.test.js
-utils
  -index.js
  -strings.js
```

- **Constants:** All common constants should be placed here. This will probably hold business logic related stuff such as certain names or maps used in the entire app. Constants scoped to a speceific section of the app should be placed under a `constants` folder within that section.

- **Errors:** Common errors throughout the app. They extend from GenericError and have a `message`, `type` and `status`. The `catchAll` middleware which catches the errors from the app, will use that values to send the response to the client. To create a simple error when used in a certain place only, just use the `GenericError`.

- **Features:** Place to add app's features. They group all the related files (business logic, api, controller, etc.) that tackle one concern/purpose within the app.

- **Middlewares:** All global middlewares should be placed here. Middlewares scoped to a specific section of the app should be placed under a `middlewares` folder within that section.

- **Tests:** Place all integration tests inside the int folder. If further separation is required, group related tests within the same folder

- **Utils:** Place all utility files, used throughout the app, to help with certain specific things, e.g. a `strings` file to hold common logic when handling strings. If the utility functions needed are scoped to a specific service, you can always have an `utils` folder within that service.

### Client App

```
- api
  - index.js
  - user.js
  - coupon.js
- components
  - index.js
  - Row
  - Col
- constants
  - index.js
  - user.js
  - coupon.js
- features
  - App
    - index.js
    - api
    - components
      - index.js
      - Coupon
    - hooks
      - index.js
      - useFetchDrawerData.js
    - Users
      - index.js
      - api
      - components
        - index.js
        - User
      - hooks
        - index.js
        - useFetchUserData.js
    - Admins
      - index.js
      - api
      - components
        - index.js
        - Admin
      - hooks
        - index.js
        - useFetchAdminData.js
- hocs
  - index.js
  - withModalBackHandler.js
- styles
  - button.js
  - index.js
  - layouts.js
- utils
  - index.js
  - device.js
```

- **API:** Place all common API requests here. Scoped APIs, only used in a specific section of the app, should be placed in an `api` folder inside that section.

- **Components:** Place all common components used throughout the app. Feature scoped components should be placed in a `components` folder within said feature.

- **Constants:** All common constants should be placed here. This will probably hold business logic related stuff such as certain names or maps used in the entire app. Constants scoped to a sections of the app should be placed under a `constants` folder within that section.

- **Features:** This holds the main components for each part of the app. It has a nested structure where the first level is commonly used for the main sections or layouts of the app, and nested levels are used to place common logic, sub sections and all the related components.

- **HOCs:** Place all common HOCs here.

- **Navigation:** The main navigation component and the NavigationService should be placed here.

- **Styles:** All common styles should be placed here, e.g. `layouts.js`.

- **Utils:** Holds all utility files used in the app. Common logic to handle certain things should be placed here, e.g. `strings.js`. If you need some utility files under a feature, you can always create a `utils` folder within that feature.

### Best practices

- When having multiple files within a folder and all of them are part of that interface, create an index.js file to export all of those files. If the folder just has a main purpose, like in React components, the index.js file will be the component itself.

- If some case scenario is missing from this structure example, remember to follow the same practices and apply them to nested folders.

## Naming Conventions

Always use meaningful names. It doesn't matter if they are longer that average. It's better to have a name that describes in the best possible way what it is than having abbreviated or short names that require understanding the code to realize what value they hold or what they do.

### Code

- **Classes** and **React** components should be written in PascalCase, e.g. `MyClass` or `MyComponent`

- **Functions** should be written in camelCase, e.g. `myFunction`

- **Variables** should be written in camelCase, e.g. `myVar`

- **Boolean variables** should be self descriptive, indicating they are booleans. e.g. `isVisible` rather than `visible` or `hasShift` rather than `shift`

- **Constants** should be written in UPPERCASE, e.g. `DATE_FORMAT` or `MAX_RETRIES`

- **Object** (mostly enums) or **array constants** should be written in UPPERCASE, e.g.

  ```javascript
  const USER_TYPES = { FACILITY: 'FACILITY', AGENT: 'AGENT', ADMIN: 'ADMIN' }
  const CHARTING_TYPES = ['Electronic', 'Paper']
  ```

### Files

Always match the filename with the primary export of that file. Since we use all named exports, we may have a set of exports equally important or one export that is the main one for that file.

#### Set of exports

Commonly used when grouping functions that are related. In this case we name the file in kebab-case, with something meaningful that denotes what all these functions have in common. A usual case may be a `utils/strings.js`

#### One main export

It's possible to have a main export but also some complementary exports. In this case, the main export is the one that takes precedence and the file is named after it since the main purpose of said file is that export.

```javascript
// File User.js
export { User, USER_TYPES }
```

### Folders

Folders should match the main export of the index when referring to classes or components. When grouping multiple files or index file within folder has more than one main export, use kebab-case.

```javascript
// path MyComponent/index.js
export { MyComponent }

// path user-agents/index.js
export { AgentService, someCronJob }
```

### Branches

Always use `kebab-case` when naming branches. Name format for feature branches: `{project-shorthand}-{ticket-number}/{type}/{description}`.  
Example: `GC-56/fix/drawer-wont-open`

**Possible types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

## REST API Conventions

- Use nouns to represent resources: REST refers to resources, hence the use of nouns instead of verbs is more adequate.
- Use hierarchical relationships to define sub resources of a given resource.
- Use `GET` to retrieve a resource or a collection of resources
- Use `POST` to create a new resource.
- Use `PUT` to update a resource.
- Use `PATCH` to update several resources of a given collection
- Use `DELETE` to remove a resource.
- Use kebab-case to define resource names. `/team-members`
- From the server, send resources under a named key instead of directly sending the object or the array, e.g. `{ employees: [...]}` `{ employee: {...} }`
- From the client, send body data under a representing named key, `body: { employee: {...} }`

**Examples:**
Based on the resources managed by the API, we'll consider users and coupons resources for this example:
| Endpoint | Action |
| ------------------------ | ------------------------ |
| GET `/users` | Get all the users |
| POST `/users` | Create a new user |
| PUT `/users/{id}` | Update an user |
| PATCH `/users` | Update several users |
| DELETE `/users/{id}` | Delete an use |
When handling hierarchical relationships or inner resources that represent something within the parent resource, define all the path to that sub resource, first defining the parent one:
| Endpoint | Action |
| ---------------------------------- | --------------------------------- |
| GET `/coupons` | Get all the coupons |
| GET `/users/{id}/coupons` | Get all the coupons for a user |
| POST `/users/{id}/coupons` | Create a new coupon for a user |
| GET `/users/{id}/coupons/{id}` | Get a coupon for a user |
To get a subset of a collection, use the query params to send valuable information from the required subset. When paginating, if total count is needed besides the results for the given page, use `totalCount` query param:
| Endpoint | Action |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| GET `/users?email=john&deactivated=false` | Get only the active user accounts which their emails start with john |
| GET `/users?deactivated=true&totalCount=true&page=3` | Get only the deactivated employee accounts third page, included the total count |

## Best Practices

### Eslint

Eslint is set up to provide linting rules and improve code guidelines. Remember to run `yarn lint` before committing and pushing changes.

When working on old legacy files, having the default VSCode config may lead to several formatting changes. If that happens, there's three options:

- Make a first commit a formatting commit, this way the dev making the future PR review can just look at the next commits an avoid the formatting one.

- If the PR is really big and may have a lot of intermediate commits just for formatting, the review will be really hard to do. Hence, disabling `eslint.autoFixOnSave` and `editor.formatOnSave` may be the best option. Those files can be formatted in future PRs

- If you know the files beforehand and some of them will need formatting, it's possible to make a first PR just to format all of them, quickly merge it and then start working on the real changes.

### Commitizen

Use commitizen to format commits in order to have a unified commit template to fill in.

- `npm i -g commitizen`

- Use `git cz` instead of `git commit`

- Follow the walkthrough and add the relevant information always including the ticket number with it's project shorthand for proper linking to Jira ticket, e.g. `GC-56`

### Define constants for enums and predefined meaningful variables

- Enums that represent business logic.

- Predefined meaningful variables.

```javascript
// Enums
const USER_TYPES = {
  FACILITY: FACILITY,
  AGENT: AGENT,
  ADMIN: ADMIN
}

const MAX_RETRIES = 5
```

### Use `const` instead of `let` when possible

This will help identify better and quicker which variables are meant to be constants and which are meant to be re assigned hence their value will change.

### Keep boolean expressions simple

Keep simple logic for boolean expressions.

```javascript
// Bad
if (array.length > 0)

if (array.length === 0)

// Good
if (array.length)

if (!array.length)

// Bad
if (user === null)

// Good
if (!user)

```

### Use template literals instead of string concats

```javascript
// Bad
const welcome = 'Welcome ' + user.name + ' ' + user.lastName + '!'

// Good
const welcome = `Welcome ${user.name} ${user.lastName}!`
```

### Always use named exports

For simplicity and easy findings, export named variables instead of default exports.

```javascript
// Bad
export default MyComponent

// Good
export { MyComponent }
```

### Return fast whenever possible

In order to have cleaner and more understandable code, and also to avoid running unnecessary logic, try returning fast if certain conditions happen.

```javascript
// Bad
const formatUser = (user) => {
  const fullName = user ? getFullName(user) : ''
  const age = user ? getAge(user.birthDate) : ''
  const formattedUser = user ? `${fullName}, age: ${age}` : ''

  return formattedUser

}

// Good
const formatUser = (user) => {
  if (!user) return ''
  ...
}
```

### Use `map`, `filter` and `reduce`

Use `map`, `filter` and `reduce` to manipulate arrays instead of `for` loops or `forEach` method.

```javascript
// Bad
const admins = []

users.forEach(user => {
  if (user.type === 'ADMIN') admins.push(user)
})

// Good
const admins = users.filter(user => user.type === 'ADMIN')
```

### Try to avoid mutations as much as possible

Mutations makes code difficult to understand, test and debug. Changing already declared variables may lead to unintended side effects in other parts of the code.

Never mutate or re assign function parameters.

```javascript
// Bad
user.admin = true
user.type === 'ADMIN'

// Good
const admin = { ...user, admin: true, type: 'ADMIN' }
```

```javascript
// Bad
const makeUserAdmin = (user, options) => {
  if (!options) options = {}

  user.admin = true
  ...
}

// Good
const makeUserAdmin = (user, options) => {
  const defaultOptions = options || {}

  const admin = { ...user, admin }
}
```

### Use maps instead of `switch` statements

Using maps instead of `switch` statements will make the code more readable and performant. Maps have direct access while `switch` statements don't.

```javascript
// Bad
const getShiftColor = (shiftName) => {

  switch(shiftName) {
    case 'am':
      return lightBlue

    case 'pm':
      return blue

    case 'noc':
      return darkBlue
  }
}

// Good
const SHIFT_COLORS: {
  am: lightBlue,
  pm: blue,
  noc: darkBlue,
}

const getShiftColor = (shiftName) => SHIFT_COLORS[shiftName]
```

### Use ternary expressions to initialize variables

Instead of declaring a variable with `let` , initializing it, and the use an `if` to possibly change its value, use a one liner ternary expression to initialize it.

```javascript
// Bad
let tagText = text

if (!expanded) {
  tagText = text.substring(0, 5)
}

// Good
const tagText = expanded ? text : text.substring(0, 5)
```

### Handle errors gracefully and notify the user with meaningful messages

```javascript
// Bad
const createUser = async (email, password) {
  try {
    await api.createUser(email, password)
    toast('Success')
  } catch (error) {
    console.log(error)
    toast(error)
  }
}

// Good
const createUser = async (email, password) {
  try {
    await api.createUser(email, password)
    toast('Successfully created user')
  } catch (error) {
    console.log(error)
    toast('Failed to create user, please try again')
  }
}
```

### Always export at the end of the file

```javascript
// Bad
export const Component = () => { ... }

// Good
const Component = () => { ... }

export { Component }
```

### Order of imports

Separation of imports is ideal to easily visualize different types of imports. The order will be:

- node_modules
- absolute imports
- assets imports
- relative imports

```javascript
// Good
import React from 'react'
import { Button } from 'material-ui'

import { Modal } from 'components'

import userIcon from 'assets/icons/user.svg'

import api from './api'
import styles from './styles

```
