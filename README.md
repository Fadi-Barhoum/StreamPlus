# Multi-Step User Onboarding Form

A Symfony-based multi-step onboarding form for StreamPlus, a subscription-based streaming service. The form collects user information, address details, and payment data for premium users.

## Installation

### 1. Clone the repository:
### 2. Install dependencies:
composer install
### 3. Configure the database:
Update the database connection in .env:
DATABASE_URL="mysql://sername:password:@127.0.0.1:3306/streamplus?serverVersion=8.0.32&charset=utf8mb4"
### 4. Create the database:
php bin/console doctrine:database:create
### 5. Run database migrations:
php bin/console doctrine:migrations:migrate
### 6. Create a database schema (if needed):
php bin/console doctrine:schema:create
### 7. Start the Symfony server:
php bin/console server:run


Usage
Open http://127.0.0.1:8000/ in your browser.

Complete the steps:

    Step 1: Enter user info (Name, Email, Phone, Subscription Type).

    Step 2: Enter address info (Country-specific).

    Step 3: Enter payment info (if Premium).

    Step 4: Review and submit.


Features
Dynamic form steps based on subscription type (Free/Premium).

    Country-specific address fields.

    Validation on each step.

    Allows back navigation.



This includes all the commands you've likely used today:

1. **Clone the repository**
2. **Install dependencies** (`composer install`)
3. **Install required Symfony packages** (`symfony/orm-pack`, `symfony/maker-bundle`)
4. **Configure the database connection** in `.env`
5. **Create the database** with `doctrine:database:create`
6. **Run migrations** with `doctrine:migrations:migrate`
7. **Create the schema** (optional but included) using `doctrine:schema:create`
8. **Start the Symfony server** (`server:run`)

Let me know if anything else is needed!

# Multi-Step User Onboarding Form

A Symfony-based multi-step onboarding form for StreamPlus, a subscription-based streaming service. The form collects user information, address details, and payment data for premium users.

## Installation

### 1. Clone the repository:
### 2. Install dependencies:
composer install
### 3. Configure the database:
Update the database connection in .env:
DATABASE_URL="mysql://sername:password:@127.0.0.1:3306/streamplus?serverVersion=8.0.32&charset=utf8mb4"
### 4. Create the database:
php bin/console doctrine:database:create
### 5. Run database migrations:
php bin/console doctrine:migrations:migrate
### 6. Create a database schema (if needed):
php bin/console doctrine:schema:create
### 7. Start the Symfony server:
php bin/console server:run


Usage
Open http://127.0.0.1:8000/ in your browser.

Complete the steps:

    Step 1: Enter user info (Name, Email, Phone, Subscription Type).

    Step 2: Enter address info (Country-specific).

    Step 3: Enter payment info (if Premium).

    Step 4: Review and submit.


Features
Dynamic form steps based on subscription type (Free/Premium).

    Country-specific address fields.

    Validation on each step.

    Allows back navigation.



This includes all the commands you've likely used today:

1. **Clone the repository**
2. **Install dependencies** (`composer install`)
3. **Install required Symfony packages** (`symfony/orm-pack`, `symfony/maker-bundle`)
4. **Configure the database connection** in `.env`
5. **Create the database** with `doctrine:database:create`
6. **Run migrations** with `doctrine:migrations:migrate`
7. **Create the schema** (optional but included) using `doctrine:schema:create`
8. **Start the Symfony server** (`server:run`)

Let me know if anything else is needed!

API Example (Postman)
You can test the subscription API using Postman.

Request:
POST http://127.0.0.1:8000/api/subscribe

Request Body:
{
    "user": {
        "name": "John Doe",
        "email": "john1@example.com",
        "phone": "1234567890",
        "subscriptionType": "Premium",
        "address": {
            "addressLine1": "123 Main St",
            "city": "Some City",
            "postalCode": "12345",
            "state": "Some State",
            "country": "Some Country"
        }
    },
    "payment": {
        "cardNumber": "4111111111111111",
        "expirationDate": "12/29",
        "cvv": "123"
    }
}
Response:
{
    "success": true,
    "message": "Subscription successful."
}
