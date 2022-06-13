// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://hitendra02:hacker024@cluster0.dr4q2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}


const kittySchema = new mongoose.Schema({
    name: String
  });

// const Kitten = mongoose.model('Kitten', kittySchema);
// kittySchema.methods.speak = function speak() {
//     const greeting = "My name is "+ hittu.name;
//     console.log(greeting);
// };

const Kitten = mongoose.model('Kitten', kittySchema);
const  hittu = new Kitten({name: "heart"});
// console.log(hittu.name);

// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak();
 // "Meow name is fluffy"
  
// hittu.speak(); 

hittu.save(function (errs, hittu) {
    if (err) return console.log(err);
    hittu.speak();
});

// db.kittens.find()
// console.log(hittu.name);