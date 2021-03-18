# switch to semantic-ui-offline
rm -rf semantic.json .semantic
sed -i 's/"now-build": "npm run semantic:build && next build"/"now-build": "next build"/' package.json
sed -i '/semantic:build/d' package.json
npm uninstall fomantic-ui inquirer
npm install semantic-ui-offline
sed -i 's^../.semantic/dist/semantic.min.css^semantic-ui-offline/semantic.min.css^' pages/_app.js 
