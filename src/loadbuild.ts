import { GltfContainer, InputAction, MeshCollider, MeshRenderer, Scale, Transform, engine, pointerEventsSystem, AudioSource, Material } from "@dcl/sdk/ecs"
import { Vector3, Color4 } from "@dcl/sdk/math"

function createCube(position: Vector3, soundFile: string) {
    const myEntity = engine.addEntity()
    const clickBox = engine.addEntity()
    
    Transform.create(clickBox, {position: position, scale: Vector3.create(0.25, 0.25, 0.25)}) // Make the cube 75% smaller
    MeshRenderer.setBox(clickBox)
    MeshCollider.setBox(clickBox)

    Material.setBasicMaterial(clickBox, { diffuseColor: Color4.Black() }) // Set initial color to black

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
            Material.setBasicMaterial(clickBox, { diffuseColor: mutableAudioSource.playing ? Color4.Green() : Color4.Black() })
        }
    )
}

export function loadbuild(){
    let songNumber = 1;

    // Create 12 cubes in the center of the 4 parcels
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            // Calculate song number, pad with zero if necessary
            const song = String(songNumber).padStart(2, '0');
            createCube(Vector3.create(14 + i*0.5, 0.75, 14 + j*0.5), `sounds/${song}.mp3`) // Adjust position to center the cubes and set the height to the middle of the avatar
            songNumber++;
        }
    }
}