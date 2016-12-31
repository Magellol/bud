## Bud.
Bud is your simple budget management buddy.

## Why
Budget management apps are overly complicated for nothing. (Maybe I could add some other stuff here).

## Installation
In order to install Bud on your local machine, please proceed the following steps:

1. `> git clone git@github.com:Magellol/bud.git`
2. `> cd bud`
3. `> yarn`
4. `> yarn run db:migrate && yarn run db:seed`
5. `> yarn run dev`

## Technical side of things
Bud will stay a monolithic app from the beginning until the need to have a separate API will make sense.
Monolithic apps are easier to develop and maintain when the number of contributors are extremely low (like myself alone) but I'd like to have it as a standalone API at some point to build other types of clients (bots, native apps, ...). That's why the structure of the app is trying to ease that future move, if ever happens.

## Screens

1. Get all users (easy peasy).
2. Adding an expense.
    - Assign an expense to a existing category (Categories are fetched without any date condition)
    - Assign an expense to a new category, create the category first, switch the UI to be a radio button once created then proceed as usual and assign the expense to it.

3. See the details for the current month by default.
    - List of categories that were created within the viewing month OR the past.
    - We don't fetch categories that were created after the viewing month because in case we're viewing details from a month in the past, we can show categories that did not exist at that time.
    - Within these categories, we're going to fetch and count the total amount of expenses created IN the viewing month.
    - The "new category" functionality should only be available in the current (actual) month, not all months.

4. See detail of a category within a given month.
    - Fetch the category by its id (no condition)
    - Fetch all expenses where the conditions are the current category and the current month date.

5. See details of an expenses
    - Fetch expense by its id.
    - Allow user to assign this expense to another category IF and only IF the expense was created within the current month.
    Otherwise we don't allow that because it doesn't make sense for a user to go back in time and re-assign their expenses.
    - User can always delete the expense.

6. Missing a screen to allow users to delete categories without any date condition.
    - Deleting a category will warn the user about the consequences (deleting all expenses that belong to it, that is).
    - Once deleted, the category and all of its expenses will disappear on any further screens.
