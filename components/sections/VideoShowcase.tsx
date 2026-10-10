import { appVideos } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YouTubeLite } from "@/components/ui/YouTubeLite";
import { Reveal } from "@/components/motion/Reveal";

export function VideoShowcase() {
  const videoJsonLd = appVideos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/oardefault.jpg`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    url: `https://www.youtube.com/shorts/${video.id}`,
  }));

  return (
    <section className="section video-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <div className="container">
        <Reveal>
          <SectionHeading title="See MRI Plan in Action" center>
            Discover how MRI Plan helps you practice MRI slice positioning, angulation, and coverage.
          </SectionHeading>
        </Reveal>
        <Reveal className="video-grid" delay={0.08}>
          {appVideos.map((video) => (
            <article className="video-card" key={video.id}>
              <div className="video-frame">
                <YouTubeLite videoId={video.id} title={video.title} />
              </div>
              <div className="video-card__content">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
