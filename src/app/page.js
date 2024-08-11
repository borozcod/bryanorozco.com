import { Blob } from './components/Blob'
import InputField from './elements/InputField'
import 'tachyons/css/tachyons.min.css';
import "./globals.css";

export default function Home() {
  return (
    <main>
        <div className="mw9 center ph3-ns relative z-1">
          <div className="cf ph2-ns">
            <div className="w-100 w-20-ns pa2">
              <div className="pv4">
                <h1 className="gold">Hola</h1>
                <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California. </p>
              </div>
            </div>
          </div>
          <InputField/>
        </div>
        <div className="aspect-ratio--object z-0">
            <Blob />
        </div>
    </main>
  );
}
