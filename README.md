# **Neighborhood Map Project**

This map is my version of a Udacity project that shows some of the most popular places in San Francisco using Google Maps API. When a place is selected it displays the address and Wikipedia information as well as it's location on the map. It also shows the user's location and directions. It is hosted on Firebase, to see it go to:

     https://discoveringsf-59bab.firebaseapp.com

### **Running locally**

In order to setup a local web server you will need to install Node, npm (that is installed as a part of node) and gulp.

Let's begin and install the tools that we are going to need:

- Download or clone the repository from Github (https://help.github.com/articles/cloning-a-repository/)
-     git clone https://github.com/vanearochi/DiscoveringSF.git.

- Install Node.js and npm (npm is installed as a part of node)            (https://nodejs.org/en/download/).

- Open your terminal and go to the project directory (How I change directories from the command line on my terminal? http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything )

- Install the requirements using npm, this will install all modules listed as dependencies in the package.json of the project. In the project's root directory on the command line type:
-     npm install

-  Install gulp locally.
-       npm install --save-dev gulp

- Minimize html, css and js files with gulp's modules; htmlmin, cssnano and jshint. Type the follow on your command line on project's root directory:
-     gulp htmlmin
-     gulp cssnano
-     gulp jshint

 Finally to run the local web server on your terminal type the following on the command line from the project's directory:
-     gulp connect
- Now you can see the index.html file on your browser when opening:
-     localhost:8080

