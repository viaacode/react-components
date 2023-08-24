# Meemoo - React components

## General

This repository contains the general meemoo React components to be consumed by applications built
for meemoo using the React framework.

It is built with:

- node: `v20.x.x`
- npm: `v9.x.x`
- React: `v17.0.2`
- Storybook: `v6.4.9`

For a complete list of packages and version check out the `package.json` file.

## Setup

### Clone and install dependencies

To setup this project, clone the repo and run `npm i` to install the dependencies.

This will also setup [husky](https://github.com/typicode/husky) via the `npm run prepare` script,
this lifecycle script will run automatically after the install.

### NPM

The available commands for development are:

| command | runs                           |
|---------|--------------------------------|
| start   | Run Storybook for development. |

<br>

The available commands for building the project are:

| command | runs                                                    |
|---------|---------------------------------------------------------|
| build   | Build a production ready package to the `/dist` folder. |

<br>

The available commands for testing the project are:

| command     | runs                                  |
|-------------|---------------------------------------|
| test        | Run all the unit tests.               |
| test:output | Ouput test results to json file       |
| test:watch  | Run all the unit tests in watch mode. |

<br>

Other available commands are:

| command   | runs                          |
|-----------|-------------------------------|
| lint      | Lint all scripts and styling. |
| lint:ts   | Lint all script files.        |
| lint:scss | Lint all style related files. |

## Deploy

1. Make sure all PR's are merged into `master`
2. Pull latest master
3. Update `package.json` by running `npm version patch`. This wil automatically update:
	1. Version in `package.json` and `package-lock.json`
	2. Create a tag
4. Push to the remote (`git push --follow-tags origin`)
5. Go to [meemoo's nexus](http://do-prd-mvn-01.do.viaa.be:8081/#browse/browse:npm-viaa:%40meemoo%2Freact-components) and check if the version is deployed
6. Open pull requests for all repositories and make sure to use the latest version for `@meemoo/react-components`

## Team

This project has been created by:

- Andry Charlier: andry.charlier@studiohyperdrive.be

It is currently maintained by:

- Bert Verhelst: bert.verhelst@studiohyperdrive.be
- Ward Vercruyssen: ward.vercruyssen@studiohyperdrive.be
- Bram Vandenbussche: bram.vandenbussche@studiohyperdrive.be
- ~~Andry Charlier: andry.charlier@studiohyperdrive.be~~
- ~~Ian Emsens: ian.emsens@studiohyperdrive.be~~
- ~~Bavo Vanderghote: bavo.vanderghote@studiohyperdrive.be~~
- ~~Silke Derudder: silke.derudder@studiohyperdrive~~

