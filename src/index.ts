console.log("hi");

// 1.

function getFirstWord(a: string) {
  return a.split(/ +/)[0].length;
}

// 2.

function getUserNamings(a: {
  name: string[] | string;
  surname: string[] | string;
}) {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0],
  };
}

// 3.

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a?: { products?: [{ name: string }] }) {
  return a?.products?.map((prod) => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function heyOne(a: {
  name: () => string;
  cuteness?: number;
  coolness?: number;
}) {
  return "hey! i'm " + a.name();
}
heyOne({ name: () => "roman", cuteness: 100 });
heyOne({ name: () => "vasyl", coolness: 100 });

// 4.2
abstract class AbstractPets {
  namePet: string;
  other: boolean | number;
  constructor(name: string, other: boolean | number) {
    this.namePet = name;
    this.other = other;
  }
  name(): string {
    return this.namePet;
  }
}
class Cat extends AbstractPets {}
class Dog extends AbstractPets {}

function hey2(abstractPet: AbstractPets) {
  return "hey! i'm " + abstractPet.name();
}

let a = new Cat("snizhok", true);
let b = new Dog("sirko", 333);
hey2(a);
hey2(b);

// 4.3

function hey3(a: {
  name: () => string;
  type: string;
  cuteness?: number;
  coolness?: number;
}) {
  return (
    "hey! i'm " +
    a.name() +
    (a.type === "cat" ? "cuteness: " + a.cuteness : "coolness: " + a.coolness)
  );
}
hey3({ name: () => "snizhok", type: "cat", cuteness: 100 });
hey3({ name: () => "sirko", type: "dog", coolness: 100 });

// 5.

// google for Record type
function stringEntries(a: [] | {}) {
  return Array.isArray(a) ? a : Object.keys(a);
}

// 6.
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number) {
  return "*".repeat(a);
}
const hello = async () => {
  return await world(10);
};
hello()
  .then((r) => console.log(r))
  .catch((e) => console.log("fail"));

/*task 3
Index signatures. Sometimes you don’t know all the names of a type’s properties ahead of time,
 but you do know the shape of the values.

In those cases you can use an index signature to describe the types of possible values, 
for example: [key: string]: {}*/

interface isBigObject {
  [key: string]:
    | { cvalue?: string | number | isBigObject | undefined }
    | undefined;
}

function summ(a: isBigObject): number {
  const x = Object.keys(a).map((k) => {
    const elem = a[k];
    if (/*typeof*/ elem === undefined) {
      return 2021;
    } else {
      if (elem.cvalue !== undefined) {
        if (typeof elem.cvalue === "number") return elem.cvalue; //++
        if (typeof elem.cvalue === "string")
          return +elem.cvalue || /*'2021'*/ 2021;
        /*if (elem.cvalue.isBigObject !== undefined)*/ return summ(elem.cvalue);
      }
    }
    return 2021; //elem.сvalue;
  });
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    //length
    sum += x[i] /*.cvalue*/;
  }
  return sum /*m*/;
  // чи не повинен за умовою задачі саме sum повертати 2021, якщо зустрічає хоч один undefined, а не сумувати далі?
}

const obj = {
  hello: { cvalue: 1 },
  world: { cvalue: { yay: { cvalue: "2" } } },
};
const obj1 = {
  hello: { cvalue: undefined },
  world: { cvalue: { yay: { cvalue: "2" } } },
};
const obj2 = {
  hello: {},
  world: { cvalue: { yay: { cvalue: "2" } } },
};
const obj3 = {
  hello: {
    cvalue: {
      world: {
        cvalue: { yay: { cvalue: "2" } },
      },
    },
  },
  world: {
    cvalue: { yay: { cvalue: "2" } },
  },
};

console.log(summ(obj));
console.log(summ(obj1));
console.log(summ(obj2));
console.log(summ(obj3));
