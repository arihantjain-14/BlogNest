import { Signup as SignupComponent } from "../components";
import Galaxy from '../components/Galaxy';

function Signup() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' ,background : 'transparent'}}>
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
                <SignupComponent />
            </div>
        </div>
    );
}

export default Signup;