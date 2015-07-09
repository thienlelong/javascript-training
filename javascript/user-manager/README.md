# User Manager

## I. Folder structure:

### 1. **out**: Folder contain files after build by gulp

### 2. **src**: folder contain source of project

- **files**: Folder contain library for practice 
- **js**: Folder contain files *.js control practice
- **images**: Folder contain all images for practice
- **style**: Folder contain files *.scss to style layout for project
- **layouts**: Folder contain layout and template for practice
- **fonts**: Include list fonts of practice
- **.editorconfig**: File config editor rule using project
- **.jshintrc**: File config jshint tool (code style)
- **.jscsrc**: config jscs tool (code style)
- **gulpfile.js**: config all task and start Gulp
- **package.js**: contain all plugin install via npm for project 
- **bower.js**: contain all plugins install via bower for project

## II. Install library and run project:

### 1. Strart vagrant machine:

- vagrant up
- vagrant ssh

### 2. Install library and run gulp:

- cd /src/user-manager
- npm install --global gulp
- npm install
- bower install
- gulp

### 3. access project:
- http://localhost:8080
