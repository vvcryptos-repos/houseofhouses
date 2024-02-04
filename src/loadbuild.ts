import { GltfContainer, InputAction, MeshCollider, MeshRenderer, Scale, Transform, engine, pointerEventsSystem, AudioSource } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"

function createCube(position: Vector3, soundFile: string) {
    const myEntity = engine.addEntity()
    const clickBox = engine.addEntity()
    
    Transform.create(clickBox, {position: position})
    Scale: Vector3.create(0.1,0.1,0.1)
    MeshRenderer.setBox(clickBox)
    MeshCollider.setBox(clickBox)

    Transform.create(myEntity, {position: position, scale: Vector3.create(5,5,5)})
    
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
        }
    )
}

export function loadbuild(){
    // Create 3 cubes in the center of each parcel
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 3; k++) {
                createCube(Vector3.create(8 + i*16, 1, 8 + j*16 + k*2), `sounds/sound-${i}-${j}-${k}.mp3`)
            }
        }
    }

    // Create 3 cubes in the corner where the 4 parcels meet
    for (let i = 0; i < 3; i++) {
        createCube(Vector3.create(16, 1, 16 + i*2), `sounds/corner-sound-${i}.mp3`)
    }
}