# MongoDB Atlas Node.js Sample Project

This repository contains an example application that connects to MongoDB
Atlas using the Node.js MongoDB driver. You can use this application as
a reference for when you build your Node.js application.

## Prerequisites

To build and run this project, you need Node.js version 10 or later and
a compatible version of NPM (Node Package Manager) installed. For 
information on how to check your version of Node and NPM, see the [NPMJS
page on downloading and installing Node.js and
npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Getting Started

The following instructions explain how to get your project connected to your 
instance of MongoDB Atlas.

### 1. Download the Repository

To get started with this sample project, download this repository to your
programming environment. You can clone this project using Git version control:

```
git clone https://github.com/mongodb-university/atlas_starter_nodejs.git
```

Or you can download the ZIP archive using your browser. If you download
this project as a ZIP archive, 
[unzip the archive](https://www.wikihow.com/Unzip-a-File) before proceeding.

### 2. Install Depedencies

Navigate to the directory containing the project in your shell or open it
in your preferred IDE.

Then, use the NPM dependency file that we included in the project
directory called `package.json` to download and install your dependencies:

```shell
npm install
```

This command reads the `package.json` file and downloads and saves the
dependencies defined within it to a directory called `node_modules`. It
also creates a `package-lock.json` file that sets the version information for
each of the modules required to build your project.

At this point, you should have appropriate versions of Node.js and NPM 
installed as well as a project directory that contains the dependencies you 
need to use the Node.js MongoDB driver.

### 3. Configure your Atlas Credentials

1. Open the  `app.js` file.

2. Search for the variable `uri` near the top which is assigned
   placeholder text. Replace the placeholder text with the connection
   string for your Atlas cluster. For more information on finding the
   connection string, see [Connect via
   Driver](https://docs.atlas.mongodb.com/driver-connection/) in the Atlas
   documentation.

```js
    const uri = 
      "<Your Atlas Connection String>";
```

3. Save the changes to your `app.js` file.

### 4. Run the Project

If you are running from the shell, you can run the application from the
directory that contains it with the following command:

```shell
node app
```

If you are running it from the IDE, use the appropriate command to run the
contents of the `app.js` file.

1. Click the Run icon, or from the Run menu, choose **Start Debugging**.

Assuming you have the correct connection string, you have now connected 
the Node app to your MongoDB Atlas datastore.
Have fun modifying the code to experiment with the Node driver and MongoDB.

## Troubleshooting

Are you having trouble getting connected to your MongoDB Atlas instance? Double-check the following:

1. Have you replaced the `uri` variable with a valid connection string provided by the Atlas UI?  Read more [here](https://docs.atlas.mongodb.com/driver-connection/) for further context.

2. Have you [added your current IP address to the access list](https://docs.atlas.mongodb.com/security-whitelist/) in the Atlas UI?
