const { hash } = require("bcryptjs");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function add(data) {
  let storedData = await readData();
  const userId = new Date().getTime();
  const hashedPw = await hash(data.password, 12);
  if (!storedData) {
    storedData = [];
  }
  storedData.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email };
}

async function get(email) {
  const storedData = await readData();
  if (!storedData || storedData.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

exports.add = add;
exports.get = get;
