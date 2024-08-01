import { Blob } from './components/Blob'
import InputField from './elements/InputField'
import 'tachyons/css/tachyons.min.css';
import "./globals.css";

export default function Home() {
  return (
    <main className="bg-white">
      
        <div className="mw9 center ph3-ns">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-20-ns pa2">
              <div className="bg-white pv4">
                <h1 className="gold">Hola</h1>
                <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California. </p>
              </div>
            </div>
            <div className="fl w-100 w-70-ns pa2">
              <div className="bg-white pv4">
                <Blob />
              </div>
            </div>
          </div>
        <InputField/>
        </div>
    </main>
  );
}
