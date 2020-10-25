const request = require("request");
const cherio = require("cherio");
const url = process.argv[2];

const writeFile = (arr) => {
  const fs = require("fs");
  const file = fs.createWriteStream("links.txt");
  file.on("error", function (err) {
    console.log("ERROR IN WRITING FILE!!!!");
    console.log(err);
  });
  arr.forEach(function (v) {
    file.write(v + "\n");
  });
  file.end();
};
request(url, (error, response, html) => {
  if (error) {
    console.log("ERROR IN WRITING FILE!!!!");
    console.log(error);
    return;
  }
  let list = html.split("</a>");
  list = list.map((el) => {
    return el
      .replace(el, el.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/))
      .split('"')[1];
  });

  list = list.filter((el) => el != "../" && el != undefined);

  list = list.map((el) => url + el);

  writeFile(list);
});
