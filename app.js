const express = require('express')
const app = express()
const layout = require('express-ejs-layouts');
const fs = require('fs');
const cookieParser = require('cookie-parser'); // 1. `cookie-parser` 라이브러리를 `require`합니다.

// 다국어 플러그인
const i18n = require('i18n');

i18n.configure({
  locales: ['kr', 'en', 'cn'],
  directory: __dirname + '/locales',
  defaultLocale: 'kr',
  objectNotation: true,
  cookie: 'locale'
});

app.use(cookieParser()); // 2. 쿠키 파서 미들웨어 설정

app.use(i18n.init);

// 여기에 언어 설정 미들웨어 추가
app.use((req, res, next) => {
  app.locals.currentLocale = req.getLocale(); // app.locals에 currentLocale 설정
  let lang = req.cookies.locale;

  if (!lang) {
    const browserLang = req.acceptsLanguages('kr', 'en', 'cn');
    lang = browserLang || 'kr';
  }

  res.setLocale(lang);
  next();
});


app.get('/setlang/:lang', (req, res) => {
  res.cookie('locale', req.params.lang); 
  res.setLocale(req.params.lang);
  console.log(req.getLocale()); // 현재 설정된 로케일 출력
  res.redirect('back');
});



app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(layout);

const port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');

app.set('layout', 'layout/layout');
app.set('layout extractMetas', true);
app.set("layout extractScripts", true)
app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var cData = JSON.parse(data);
    cData = cData['main'];

    res.render('index', { cData, layout: 'layout', extractMetas: true, extractScripts: true , title: 'LUCKY MARCHÉ',  page: 'home'});
  });
});

app.get('/lucky-marche', function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var cData = JSON.parse(data);
    const thisCollecton = cData.collection.filter(collection => collection.cat == "lm");

  res.render('collection', { thisCollecton, layout: 'layout', extractMetas: true, extractScripts: true , title: 'LUCKY MARCHÉ', page: 'collection'});
  });
});

app.get('/lucky-le-match', function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var cData = JSON.parse(data);
    const thisCollecton = cData.collection.filter(collection => collection.cat == "ll");

  res.render('collection', { thisCollecton, layout: 'layout', extractMetas: true, extractScripts: true , title: 'LUCKY LE MATCH', page: 'collection'});
  });
});

app.get('/archive', function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var aData = JSON.parse(data);

  res.render('archive', { aData : aData.archive, layout: 'layout', extractMetas: true, extractScripts: true , title: 'ARCHIVE-LUCKY MARCHÉ', page: 'archive'});
  });
});
app.get('/archive/:id', function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var aData = JSON.parse(data);
    console.log(aData);
    const thisArchive = aData.archive.find(archive => archive.title == req.params.id);

  res.render('archive-detail', { thisArchive, layout: 'layout', extractMetas: true, extractScripts: true , title: req.params.id, page: 'archive-detail'});
  });
});
app.get('/stocklist', function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var sData = JSON.parse(data);

  res.render('stocklist', { sData : sData.stocklist, layout: 'layout', extractMetas: true, extractScripts: true , title: 'STOCKLIST-LUCKY MARCHÉ', page: 'stocklist'});
  });
});
app.get('/shop', function (req, res) {
  fs.readFile("./shop.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var pData = JSON.parse(data);

  res.render('shop', { pData, params: 'ALL', layout: 'layout', extractMetas: true, extractScripts: true , title: 'SHOP-LUCKY MARCHÉ', page: 'shop'});
  });
});

app.get('/shop-cat/:id', function (req, res) {
  fs.readFile("./shop.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var pData = JSON.parse(data);

    const thisProduct = pData.filter(product => product.cat == req.params.id);

  res.render('shop', { pData : thisProduct, params: req.params.id, layout: 'layout', extractMetas: true, extractScripts: true , title: req.params.id, page: 'shop'});
  });
});

app.get('/shop/:id', function (req, res) {
  fs.readFile("./shop.json", "utf8", function (err, data) {
    if (err) {
      return next(err);
    }
    var pData = JSON.parse(data);

    const thisProduct = pData.find(product => product.title == req.params.id);

  res.render('shop-detail', { thisProduct, layout: 'layout', extractMetas: true, extractScripts: true , title: req.params.id, page: 'shop-detail'});
  });
});

app.get('*', function (req, res) {
  res.render(req.params[0].substr(1), { layout: 'layout', extractMetas: true, title: 'LUCKY MARCHÉ', page: req.params[0].substr(1) });
});


app.use((error, req, res, next) => {
  console.error(error);
  res.status(400).render('404', { layout: 'layout', title: '404', page: 'page404'  });
});
