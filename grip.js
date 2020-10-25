const request = require("request");
const cherio = require("cherio");
const clipboardy = require("clipboardy");
const url = process.argv[2];

const writeFile = (str) => {
  const fs = require("fs");
  const file = fs.writeFile("links.txt", str, (err) => {
    if (!err) console.log("links are saved to links.txt!");
    else console.log("ERROR in copying to clipboard\n", err);
  });
};
request(url, (error, response, html) => {
  if (error) {
    console.log("INTERNET ERROR!");
    console.log(error);
    return;
  }
  let list = html.split("</a>");
  list = list.map((el) => {
    return el
      .replace(el, el.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/))
      .split('"')[1];
  });

  list = list.filter(
    (el) => el != "../" && el && !el.startsWith("?") && !el.startsWith("/")
  );

  list = list.map((el) => url + el);
  const str = list.join("\n");
  clipboardy
    .write(str)
    .then(() => console.log("links are copied to the clipboard!"))
    .catch((err) => console.log("ERROR in copying to clipboard\n", err));
  writeFile(str);
});
