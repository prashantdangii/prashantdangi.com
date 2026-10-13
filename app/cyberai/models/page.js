import Link from "next/link";
import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { MODELS, meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "Models",
  description: "Cyber AI lineup: GLM 5.3, DeepHat V1, Foundation-Sec, Lily, and WhiteRabbitNeo. Each public model has a lineup id for chat completions.",
  path: "/models"
});

export default function ModelsPage() {
  return (
    <SiteChrome active="/models">
      <main id="content" className="cai-wrap cai-page">
        <p className="cai-kicker">Lineup</p>
        <h1>Models</h1>
        <p className="cai-lede">Five open models behind one host. The id is the string you put in the model field. Names point at the public model, not a private fine-tune.</p>
        <div className="cai-models">
          {MODELS.map((model) => (
            <article className="cai-model" key={model.id}>
              <div className="cai-model-top">
                <h2>{model.name}</h2>
                <span>{model.maker}</span>
              </div>
              <p>{model.blurb}</p>
              <div className="cai-fits">
                <span>{model.id}</span>
                {model.fits.map((fit) => <span key={fit}>{fit}</span>)}
              </div>
            </article>
          ))}
        </div>
        <p className="cai-lede"><Link href="/docs">How a request names a model</Link></p>
      </main>
    </SiteChrome>
  );
}
