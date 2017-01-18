# Bud.
Bud is your simple budget management buddy.

## Why
This whole project is based on a challenge I've received during a wild night at a bar.
The next morning, I've decided to tackle it anyway, build the whole things from scratch.

It has no pretension to be an actual app that thousands of people would use but it serves its purpose.
It's still missing a couple of features but the core ones are up and running well, and it's fast.

## Installation
In order to install Bud on your local machine, please proceed the following steps:

1. `> git clone git@github.com:Magellol/bud.git`
2. `> cd bud`
3. `> yarn`
4. `> yarn run db:migrate && yarn run db:seed`
5. `> yarn run dev`

## Technical side of things.
I've only polyfilled `fetch` because Safari doesn't support it yet.
Also I've been using a lot of features that won't be available in browsers that are not up to date with the ES6/ES7 spec, so be careful out there.

## Contributing
If you wish to contribute, I'd be more than happy to help you with it and review any potential PRs you'd open.
Just fork this repo and follow the installation steps above.

## Todo
- [ ] Deleting/renaming an expense
- [ ] Deleting/renaming a category
