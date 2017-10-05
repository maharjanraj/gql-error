A simple package for throwing graphql validation error with localization.

### Installing
>npm install --save gql-error  

### How to use
This library provides two function **validate()** and **error()**  
**validate()** can be used for form validations and **error()** can be used to throw normal graphql error.

**validate(input, rules[, options])** takes 3 parameter  
First parameter: input object we get from graphql. Ex: {email: "Graphql@gql.com", password: "gqlvalidator"}  
Second parameter: rules for validation (example below).  
Third parameter: options for localization and others.

**error(message[, options])** takes 2 parameter  
First parameter: concatenated string that matches json path in config files as shown below.  
Second parameter: same as above third parameter.

##### Options
* lang (string) - Which localization to use. Default 'en'.
* gql (boolean) - If true uses throws graphql error. If false, throws error as original nodejs error. Default true.

#### Example
Authentication example:  
auth.resolver.js
```aidl
import GQLError from 'gql-validator';
import rules from './auth.validation';

const resolvers = {
  Mutation: {
    login: (_, { input }, req) => {
      let lang = req.header('Accept-Language'); //en
      GQLError.validate(input, rules.login(), { lang: lang });

      return User
        .findOne({email: input.email})
        .then(user => {
          if (!user) GQLError.error('user.email.notFound', {lang: lang});

          if (input.password == 'gqlvalidator') {
            GQLError.error('user.password.incorrect', {lang: lang});
          }

          return user;
        })
        .catch(err => {
          throw err;
        })
    },

    register: (_, { input }, req) => {
      let lang = req.header('Accept-Language'); //se
      GQLError.validate(input, rules.register(), { lang: lang });

      return User
        .findOne({ where: { email: input.email } })
        .then(res => {
            if (res) GQLError.error('user.email.notAvailable', { lang: lang });

            return User
              .create({
                email: input.email,
                password: input.password
              })
              .then(user => {
                return user;
              })
              .catch(err => {
                throw err;
              });
        })
        .catch(err => {
          throw err;
        });
    }
```

validation rules (I used a different file ./auth.validation.js)  
To learn more about rule convention, see how to make constraints here: http://validatejs.org
```aidl
const rules = {
  register: () => {
    return {
      email: {
        presence: { message: "user.email.required" },
        email: { message: "user.email.invalid" }
      },
      password: {
        presence: { message: "user.password.required" },
        length: {
          minimum: 3, message: "user.password.minimum"
        }
      }
    };
  },
  
  login: () => {
    // rules here
  }
}
```

Message config files:
en.json
```aidl
{
  "user": {
    "email": {
      "required": "Email is required",
      "invalid": "Invalid email address",
      "notAvailable": "Email address not available",
      "notFound": "Email address not found"
    },
    "password": {
      "required": "Password is required",
      "minimum": "Minimum 3 character required",
      "incorrect": "Password is incorrect"
    }
  }
}
```

se.json (Used google translator, you get the idea :D)
```aidl
{
  "user": {
    "email": {
      "required": "E-post krävs",
      "invalid": "Ogiltig e-postadress",
      "notAvailable": "E-postadressen är inte tillgänglig",
      "notFound": "E-postadressen hittades inte"
    },
    "password": {
      "required": "Lösenord krävs",
      "minimum": "Minst 3 tecken krävs",
      "incorrect": "Lösenord är inkorrekt"
    }
  }
}
```

You need to create separate files for different locales.
Name should match exactly what you will use in option {lang: en}.

Example:  
app\  
--config\  
----locales  
------en.json  
------se.json  
------fr.json  

For now your json file structure and path should look exactly like above.

#### Note:  
In order to provide lang option either you will need to have access to 
'Accept-Language' header option found in request inside graphql resolver or
you need to find a way to provide lang option for third parameter for localisation.
In above example I have passed req object as a third parameter in resolver.
