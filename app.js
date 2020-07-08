const { MongoClient } = require("mongodb");

async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
  const uri =
    "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "myDatabase";
  const collectionName = "recipes";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const recipes = [
    {
      name: "elotes",
      ingredients: [
        "corn",
        "mayonnaise",
        "cotija cheese",
        "sour cream",
        "lime",
      ],
      prepTimeInMinutes: 35,
    },
    {
      name: "loco moco",
      ingredients: [
        "ground beef",
        "butter",
        "onion",
        "egg",
        "bread bun",
        "mushrooms",
      ],
      prepTimeInMinutes: 54,
    },
    {
      name: "patatas bravas",
      ingredients: [
        "potato",
        "tomato",
        "olive oil",
        "onion",
        "garlic",
        "paprika",
      ],
      prepTimeInMinutes: 80,
    },
    {
      name: "fried rice",
      ingredients: [
        "rice",
        "soy sauce",
        "egg",
        "onion",
        "pea",
        "carrot",
        "sesame oil",
      ],
      prepTimeInMinutes: 40,
    },
  ];

  try {
    const insertManyResult = await collection.insertMany(recipes);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

  const findQuery = { prepTimeInMinutes: { $lt: 45 } };

  try {
    const cursor = await collection.find(findQuery).sort({ name: 1 });
    await cursor.forEach(recipe => {
      console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
    });
    // add a linebreak
    console.log();
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }

  // We can also find a single document. Let's find the first document
  // that has the string "potato" in the ingredients list.
  const findOneQuery = { ingredients: "potato" };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
      console.log("Couldn't find any recipes that contain 'potato' as an ingredient.\n");
    } else {
      console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }

  /*
   * *** UPDATE A DOCUMENT ***
   *
   * You can update a single document or multiple documents in a single call.
   *
   * Here we update the PrepTimeInMinutes value on the document we
   * just found.
   */
  const updateDoc = { $set: { prepTimeInMinutes: 72 } };

  // The following updateOptions document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const updateOptions = { returnOriginal: false };

  try {
    const updateResult = await collection.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      updateOptions,
    );
    console.log(`Here is the updated document:\n${JSON.stringify(updateResult.value)}\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }

  /*      *** DELETE DOCUMENTS ***
   *
   *      As with other CRUD methods, you can delete a single document
   *      or all documents that match a specified filter. To delete all
   *      of the documents in a collection, pass an empty filter to
   *      the DeleteMany() method. In this example, we'll delete two of
   *      the recipes.
   */


  const deleteQuery = { name: { $in: ["elotes", "fried rice"] } };
  try {
    const deleteResult = await collection.deleteMany(deleteQuery);
    console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
  } catch (err) {
    console.error(`Something went wrong trying to delete documents: ${err}\n`);
  }

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}
run().catch(console.dir);
