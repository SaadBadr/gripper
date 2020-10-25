const request = require("request");
const cherio = require("cherio");
const clipboardy = require("clipboardy");
const fs = require("fs");
const { promisify } = require("util");
const url = process.argv[2];

const getUrls = (html) => {
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
  return list;
};

request(url, (error, response, html) => {
  if (error) {
    console.log("INTERNET ERROR!\n", error);
    return;
  }

  const str = getUrls(html).join("\n");

  if (!process.argv.includes("-nocopy"))
    clipboardy
      .write(str)
      .then(() => console.log("urls are copied to the clipboard!"))
      .catch((err) => console.log("ERROR in copying to clipboard!\n", err));

  if (!process.argv.includes("-nosave"))
    promisify(fs.writeFile)("links.txt", str)
      .then(() => console.log("urls are saved to links.txt!"))
      .catch((err) =>
        console.log("ERROR in saving links to clipboard!\n", err)
      );
});
