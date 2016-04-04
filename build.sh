browserify js/main.js -o bundle_temp.js;
babel bundle_temp.js -o bundle.js;
rm bundle_temp.js

lessc less/entry.less bundle.css
