# todos-app

## I. Folder structure:

### 1. **dist**: Folder contain files after build by grunt

### 2. **app**: folder contain source of project

- **bower_components**: Folder contain library for practice install from bower
- **scripts**: Folder contain files *.js control practice
- **images**: Folder contain all images for practice
- **styles**: Folder contain files *.scss to style layout for project
- **views**: Folder contain layout and template for practice
- **.editorconfig**: File config editor rule using project
- **.jshintrc**: File config jshint tool (code style)
- **.jscsrc**: config jscs tool (code style)
- **gruntfile.js**: config all task and start grunt
- **package.js**: contain all plugin install via npm for project 
- **bower.js**: contain all plugins install via bower for project

## II. Install library and run project:

### 1. Strart vagrant machine:

- vagrant up
- vagrant ssh

### 2. Install library and run grunt:

- cd /src/angularjs/todos-app
- npm install
- bower install
- grunt serve

### 3. access project:
- http://localhost:9000
