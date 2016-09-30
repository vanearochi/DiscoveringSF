# **Neighborhood Map Project**

This map is my version of a Udacity project that shows some of the most popular places in San Francisco using Google Maps API. When a place is selected it displays the address and Wikipedia information as well as it's location on the map. It also shows the user's location and directions. It is hosted on Firebase, to see it go to:

     https://discoveringsf-59bab.firebaseapp.com

### **Running locally**

In order to setup a local web server you will need to install Node, npm (that is installed as a part of node) and gulp.

Let's begin and install the tools that we are going to need:

- Download or clone the repository from Github (https://help.github.com/articles/cloning-a-repository/)
-      git clone https://github.com/vanearochi/DiscoveringSF.git.

- Install Node.js and npm (npm is installed as a part of node)            (https://nodejs.org/en/download/).

- Open your terminal and go to the project directory (How I change directories from the command line on my terminal? http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything )

- Install the requirements using npm, this will install all modules listed as dependencies in the package.json of the project. In the project's root directory on the command line type:
-       npm i


- Since all tasks are grouped into the **default task** in order to minimize the html, css and js files, open our local server and open the page in the browser  we just need to enter gulp into the command line without any additional parameters.
-      gulp


//TODO: try browserify
//Run jshint