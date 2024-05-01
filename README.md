## Todo

- [ ] Utility to generate a new widget
- [ ] Utility to check if all widgets are setup correctly
- [ ] Create pages for each widget for development purposes
- [ ] Create a page to view all widgets on a single page

## Install Database

Install MongoDB as described in the [official documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition).

Update your `.env` file with the following for development:

```env
MONGODB_URI=mongodb://<username>:<password>@localhost:27017/myDatabase
```

```bash
show dbs # Show all databases
use <database> # Switch to a database

# Create a new admin user
use admin
db.auth("specialAdminUser", passwordPrompt())

# Create a collection https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#examples
db.createCollection("myCollection", {...})
```
