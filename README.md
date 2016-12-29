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

## Todo
- [ ] Everything.
