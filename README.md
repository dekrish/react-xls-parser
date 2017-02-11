This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To run the react application:
a) Install Create React App
b) From the terminal, Create a react project 
   (eg: create-react-app <Project Name>)
c) Update the package.json with the one in this github repo
d) Run "npm install" from terminal\shell
e) Replace the public and src folder in the created project folder with the one in this github repo
f) Add the following in node_modules\react-scripts\config\webpack.config.dev.js inside the JSON having key as "resolve" (this is to fix an issue with using xlsx npm module)
  externals: [
        {
            './cptable': 'var cptable',"./jszip": "jszip"
        }
    ]
f) Run "npm start"