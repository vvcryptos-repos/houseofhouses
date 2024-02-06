import {
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 190, // 380 / 2
      height: 100, // 200 / 2
      margin: '8px 0 4px 180px', // 16px / 2, 8px / 2, 180px / 2
      padding: 1.5, // 3 / 2
    }}
    uiBackground={{ color: Color4.fromHexString("#0b0649") }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      uiBackground={{ color: Color4.fromHexString("#0b0649") }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 25, // 50 / 2
          margin: '4px 0' // 8px / 2
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'images/scene-thumbnail.png',
          },
        }}
      />
    
      <Label
        onMouseDown={() => {console.log('# Cubes clicked !')}}
        value={`Welcome to The house of houses`}
        fontSize={9} // 18 / 2
        uiTransform={{ width: '100%', height: 15 }} // 30 / 2
      />
      <Label
        value={`Go to the top of the Big House.
        Touch the spheres and create your own house music.`}
        fontSize={7} // 14 / 2
        uiTransform={{ width: '100%', height: 15 }} // 30 / 2
      />
      <Button
        uiBackground={{ color: Color4.fromHexString("#0b0649") }}
        uiTransform={{ width: 50, height: 20, margin: 4 }} // 100 / 2, 40 / 2, 8 / 2
        value='Welcome to The house of houses'
        variant='primary'
        fontSize={7} // 14 / 2
        onMouseDown={() => {}}
      />
    </UiEntity>
  </UiEntity>
)