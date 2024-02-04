import { GltfContainer, InputAction, MeshCollider, MeshRenderer, Scale, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
export function loadbuild(){
    const myEntity = engine.addEntity()
    const clickBox = engine.addEntity()
    

    Transform.create(clickBox,{position: Vector3.create(8,1,8)})
    Scale: Vector3.create(0.1,0.1,0.1)
    MeshRenderer.setBox(clickBox)
    MeshCollider.setBox(clickBox)

    Transform.create(myEntity,{position: Vector3.create(8,1,8), scale: Vector3.create(5,5,5)})
    
    GltfContainer.create(myEntity,{src: "models/green.glb"})
    
    pointerEventsSystem.onPointerDown(
        {
            entity: clickBox,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: 'Play Music on'
            } 
        },
        function(){

            
            
        }
    )
}

