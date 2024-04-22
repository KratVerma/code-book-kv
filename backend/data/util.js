const URL = "https://dummyuserapi-default-rtdb.firebaseio.com//users.json";

async function readData() {
  const response = await fetch(URL);
  if (!response) {
    throw new Error("Could not fetch data");
  }
  const respData = response.json();
  return respData;
}

async function writeData(data) {
  await fetch(URL, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

exports.readData = readData;
exports.writeData = writeData;
