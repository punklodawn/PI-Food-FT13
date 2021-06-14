//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Diet } = require('./src/db');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {

  var dietGlutenFree = Diet.create({
    name: "Gluten Free"
  })
  var dietKetogenic = Diet.create({
    name: "Ketogenic"
  })
  var dietVegetarian= Diet.create({
    name: "Vegetarian"
  })
  var dietLactoVegetarian= Diet.create({
    name: "LactoVegetarian"
  })
  var dietOvoVegetarian = Diet.create({
    name: "OvoVegetarian"
  })
  var dietVegan = Diet.create({
    name: "Vegan"
  })
  var dietPescetarian = Diet.create({
    name: "Pescetarian"
  })
  var dietPaleo = Diet.create({
    name: "Paleo"
  })
  var dietPrimal = Diet.create({
    name: "Primal"
  })
  var dietWhole30 = Diet.create({
    name: "Whole30"
  })
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
