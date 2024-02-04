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
    createCube(Vector3.create(8,1,8), 'sounds/FL_NDF_110_C_RGUITAR.mp3')
    createCube(Vector3.create(10,1,8), 'sounds/Clap.mp3')
    createCube(Vector3.create(12,1,8), 'sounds/FL_NDF_KIT04_115_F_Fill-03.mp3')
}
