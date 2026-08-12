const { createClient } = require('@sanity/client');
const fs = require('fs');
const token = 'skpHGuUG0ylDXPdNg57nCHlfrttFjxSL6kpODPySZBjzd8IX7KxsXAOX1ZcPMpy59yeNJLwS8E2ZlPyNh2lXRqcRZ5FRVhfg5lwLG9Hi7q5L1Ma9NzxqFz4jtMrp9ia8dWLYgJKO36cq2a9NDv4lrgCyjOjGGkfu93bv4Bt9yNHWgiENtHkN';

const client = createClient({
  projectId: 'myf1eg8e',
  dataset: 'production',
  apiVersion: '2024-03-14',
  useCdn: false,
  token: token,
});

const query = `*[_type == "home"] | order(_updatedAt desc) [0] {
  _id,
  title,
  pageBuilder[] {
    _type,
    _key,
    _type == "hero" || _type == "video" => {
      slogan,
      impact,
      backgroundType,
      "backgroundImageUrl": backgroundImage.asset->url,
      "backgroundVideoUrl": backgroundVideo.asset->url
    }
  }
}`;

client.fetch(query).then(data => {
  const heroSection = data?.pageBuilder?.find(s => s._type === 'hero' || s._type === 'video');
  console.log('--- HERO SECTION DEBUG ---');
  console.log(JSON.stringify(heroSection, null, 2));
  console.log('--- END DEBUG ---');
}).catch(err => {
  console.error(err);
});
