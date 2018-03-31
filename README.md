# Demo app

## AngularJs app

### Installation guide

install [nodejs](https://nodejs.org/en/)

clone repository :

```cmd
git clone https://github.com/panakran/DemoApp.git
```

navigate to folder :

```cmd
cd DemoApp
```

install app :

```cmd
npm install
```

run webpack-dev-server  :

```cmd
npm run start
```

production version under docs :

```cmd
npm run build
```

generate bundle under dist:

```cmd
npm run webpack
```

### Libraries used

+ Dependencies
    - angular `1.6.9`
    - angular-ui-bootstrap `2.5.6`
    - angular-animate `1.6.6`
    - angular-sanitize `1.6.9`
    - angular-translate `2.16.0`
    - angular-translate-loader-static-files `2.16.0`
    - angular-translate-loader-url `2.16.0`
    - bootstrap `3.3.7`
    - jquery `3.3.1`
    - lodash `4.17.4`
+ Dev-dependencies
    - webpack `3.10.0`
    - broswer-sync `2.23.6`
    - babel-core `6.26.0`
    - babel-loader `7.1.2`
    - babel-preset-env `1.6.1`
    - ngstorage `0.3.11`

### Updates

---

- [x] Add charts
- [x] Add save/load (local storage)
- [x] Compatibility with all browsers
- [ ] Calculate expenses across tabs
- [ ] Add tabs per month
- [ ] Add css
- [ ] i18n
- [ ] npm publish
- [ ] Unit tests
- [ ] e2e tests
- [ ] Wrap app with electron
