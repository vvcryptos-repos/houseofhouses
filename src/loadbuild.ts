import { Entity, PBMaterial, GltfContainer, InputAction, MeshCollider, MeshRenderer, Scale, Transform, engine, pointerEventsSystem, AudioSource, Material, Color4Type } from "@dcl/sdk/ecs"
import { Vector3, Color4 } from "@dcl/sdk/math"
import { movePlayerTo } from '~system/RestrictedActions'


let cubes: Entity[] = []
let spherePositions: Vector3[] = [] // Array to hold the positions of teleport spheres

// Define colors
const colors = [Color4.Yellow(), Color4.Green(), Color4.Purple(), Color4.Blue()]

// Shuffle colors
for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
}

function createCube(position: Vector3, soundFile: string) {
    const myEntity = engine.addEntity()
    const clickBox = engine.addEntity()
    
    Transform.create(clickBox, {position: position, scale: Vector3.create(0.25, 0.25, 0.25)}) // Make the cube 75% smaller
    MeshRenderer.setSphere(clickBox)
    MeshCollider.setSphere(clickBox)

    Material.setBasicMaterial(clickBox, { diffuseColor: Color4.Gray() }) // Set initial color to yellow

    Transform.create(myEntity, {position: position, scale: Vector3.create(0.25, 0.25, 0.25)}) // Make the cube 75% smaller
    GltfContainer.create(myEntity, {src: "models/green.glb"})

    // Create AudioSource component
    const audioSource = AudioSource.create(clickBox, {
        audioClipUrl: soundFile,
        loop: true,
        playing: false,
    })

    pointerEventsSystem.onPointerDown(
        {
            entity: clickBox,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: 'Play Music on'
            } 
        },
        function(){
            // Fetch mutable version of audio source component
            const mutableAudioSource = AudioSource.getMutable(clickBox)

            // Modify its playing value
            mutableAudioSource.playing = !mutableAudioSource.playing

            // Change color based on whether audio is playing
            Material.setBasicMaterial(clickBox, { diffuseColor: mutableAudioSource.playing ? Color4.Green() : Color4.Yellow() })
        }
    )

            // Add the cube entity to the cubes array
            cubes.push(clickBox)
}

            export function loadbuild(){
                let songNumber = 1;

                // Create 12 cubes in the center of the 4 parcels
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 4; j++) {
                        // Calculate song number, pad with zero if necessary
                        const song = String(songNumber).padStart(2, '0');
                        createCube(Vector3.create(15.5 + i*0.5, 6.5, 16 + j*0.5), `sounds/${song}.mp3`) // Adjust position to center the cubes and set the height to the middle of the avatar
                        songNumber++;
                    }
                }

            /// Create reset button
               // Create reset button
                const resetButton = engine.addEntity()
                Transform.create(resetButton, {position: Vector3.create(15.5, 7, 18), scale: Vector3.create(1, 1, 1)}) // Adjust position and scale to make it look like a button
                GltfContainer.create(resetButton, {src: "models/fonts.glb"}) // Load the custom model
                MeshCollider.setBox(resetButton)
                Material.setBasicMaterial(resetButton, { diffuseColor: Color4.White() }) // Set button color to white

            pointerEventsSystem.onPointerDown(
                {
                    entity: resetButton,
                    opts: {
                        button: InputAction.IA_POINTER,
                        hoverText: 'Reset'
                    } 
                },
                function(){
                    // Loop through all cubes and reset their color and stop their music
                    for (let cube of cubes) {
                        // Fetch mutable version of audio source component
                        const mutableAudioSource = AudioSource.getMutable(cube)
            
                        // Modify its playing value
                        mutableAudioSource.playing = false
            
                        // Change color based on whether audio is playing
                        Material.setBasicMaterial(cube, { diffuseColor: mutableAudioSource.playing ? Color4.Green() : Color4.Yellow() })
                    }
                }
            )

        // Create house entity
        const house = engine.addEntity()
        Transform.create(house, {position: Vector3.create(16, 0, 16), scale: Vector3.create(1, 1, 1)}) // Adjust position and scale to fit the 4 parcels
        GltfContainer.create(house, {src: "models/houseofhouse.glb"})

    function createSphere(position: Vector3) {
        const sphere = engine.addEntity()
        Transform.create(sphere, {position: position, scale: Vector3.create(0.25, 0.25, 0.25)})
        MeshRenderer.setSphere(sphere)
        MeshCollider.setSphere(sphere)
        Material.setBasicMaterial(sphere, { diffuseColor: Color4.Blue() }) // Set sphere color to blue
    
       
    }
// teleport

function createTeleportSphere(position: Vector3, color: Color4) {
    const sphere = engine.addEntity()
    Transform.create(sphere, {position: position, scale: Vector3.create(2.25, 2.25, 2.25)}) // Make the sphere 3 times bigger
    MeshRenderer.setSphere(sphere)
    Material.setPbrMaterial(sphere, {
        albedoColor: color,
        emissiveColor: color // Set the emissive color to the same as the albedo color
    })

    spherePositions.push(position) // Guardar la posición de la esfera para la detección de proximidad
}

        // Sistema para revisar la proximidad del jugador a las esferas y teletransportarlo
        engine.addSystem((deltaTime) => {
            if (!Transform.has(engine.PlayerEntity)) return
            const playerPosition = Transform.get(engine.PlayerEntity).position

            for (const spherePosition of spherePositions) {
                if (Vector3.distance(playerPosition, spherePosition) < 1) { // 2 es el umbral de proximidad
                    movePlayerTo({ newRelativePosition: Vector3.create(16, 7, 17) })
                    break
                }
            }
        })

        // Crear esferas en las esquinas de cada parcela (llamadas a createTeleportSphere)
createTeleportSphere(Vector3.create(5, 1, 5), Color4.Yellow())
createTeleportSphere(Vector3.create(4, 1.5, 25), Color4.Green())
createTeleportSphere(Vector3.create(25, 1.5, 8), Color4.Purple())
createTeleportSphere(Vector3.create(27, 1.5, 25), Color4.Blue())

    }