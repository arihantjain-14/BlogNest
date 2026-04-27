import {Login as LoginComponent} from "../components"
import Galaxy from '../components/Galaxy';

function Login(){
    return(
        <div style={{ position: 'relative', minHeight: 'calc(100vh - 70px)', overflow: 'hidden',background : 'transparent'}}>
            {/* Galaxy in background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Galaxy 
                    mouseRepulsion
                    mouseInteraction
                    density={1}
                    glowIntensity={0.3}
                    saturation={0}
                    hueShift={140}
                    twinkleIntensity={0.3}
                    rotationSpeed={0.1}
                    repulsionStrength={2}
                    autoCenterRepulsion={0}
                    starSpeed={0.5}
                    speed={1}
                />
            </div>

            <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
                <LoginComponent />
            </div>
        </div>
    )
}

export default Login;