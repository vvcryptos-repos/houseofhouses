@vvcryptos
##https://x.com/vvcryptos/status/1873205515099971954

# SDK7 Template scene

## Try it out

**Previewing the scene**

1. Download this repository.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

Alternatively, you can use the command line. Inside this scene root directory run:

```
npm run start
```
ansform = Transform.get(myEntity)
```

To fetch the mutable version of a component, call it via `ComponentDefinition.getMutable()`. For example:

```ts
const mutableTransform = Transform.getMutable(myEntity)
```
