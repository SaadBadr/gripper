# gripper

fetches all files urls from 'index of' webpages.

- copies them to the clipboard.
- saves them to a file 'links.txt'.

## Running command

node grip.js your_url

## Options

- -nosave: only copy urls to clipboard without saving them to links.txt
- -nocopy: only saves urls to links.txt without copying them to the clipboard

## Examples

```sh
node grip.js https://www.website.com/home.html
```

- copy to the clipboard and save to links.txt all files urls in https://www.website.com/home.html

```sh
node grip.js https://www.website.com/home.html -nosave
```

- only copy to the clipboard all files urls in https://www.website.com/home.html

```sh
node grip.js https://www.website.com/home.html
```

- only save to links.txt all files urls in https://www.website.com/home.html
