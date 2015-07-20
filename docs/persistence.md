### Keen.DataTools Persistence Layer

The Keen.DataTools persistence layer gives you a way to save, or "bookmark", the state of the module being used: Such as an explorer or extraction's state.

Right now, the only plugin we have supported is Firebase, but more will be included in the future.

If you want to build your own Persistence layer, pull down the project and head over to

- `client/js/app/modules/persistence/persistence.js`.

This is the object that holds all the pre-built persistence plugins. If you want to add a new plugin, you basically just need to pass a javascript object in to `Keen.DataTools.App` and make sure it has the right functions on it so they can be called by the bookmarking components. A persistence plugin will require the following functions in order to work with the bookmarking features:

#### `add(item, callback)`

This function needs to take a javascript object without an `id` and persist it, calling the `callback` function when complete.

#### `update(itemWithId, callback)`

This function needs to take a javascript object with an `id` and update it, calling the `callback` function when complete.

#### `delete(itemId, callback)`

This function needs to take a persisted items id and delete that item, calling the `callback` function when complete.

#### `fetch(itemId, callback)`

This function takes an optional `itemId` if it's fetching a single item, calling the `callback` function with that item when it's done fetching it. If no `itemId` has been included, it will fetch all items in the collection and return them all to the `callback`.