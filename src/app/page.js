import { Box } from './components/box'
import 'tachyons/css/tachyons.min.css';

export default function Home() {
  return (
    <main className="bg-washed-blue">
        <div className="mw9 center ph3-ns">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-30-ns pa2">
              <div className="outline bg-white pv4">
                <h1 className="gold">Hola</h1>
                <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California. </p>
                <a className="mt3 f6 no-underline br-pill ba ph3 pv2 mb2 dib gold" href="#0">download my resume</a>
              </div>
            </div>
            <div className="fl w-100 w-70-ns pa2">
              <div className="outline bg-white pv4">
                <Box />
              </div>
            </div>
          </div>
        </div>
        
    </main>
  );
}
