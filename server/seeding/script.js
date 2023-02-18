import Draw from "../models/Draw.js"

var draws = [{name:'yo'},{name:'hello'}]

console.log('yooo')

async function seed() {
    Draw.insertMany([{name:'yo'},{name:'yoo'}], function(error, docs) {
        if (error) {
          console.error(error);
        } else {
          console.log('Multiple documents inserted to Collection');
        }
      });
    }


seed()