// src/lib/indexing.ts

/**
 * Pings search engines to notify them of new or updated content.
 * Uses IndexNow protocol for Bing/Yandex and standard sitemap pings for Google.
 */
export async function pingSearchEngines(url: string) {
  const siteUrl = "https://www.masofts.com";
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;
  
  // IndexNow Key (usually a text file on the root of your site)
  // For this implementation, we'll assume the key is 'masofts_indexing_key'
  // and it's served at /masofts_indexing_key.txt
  const indexNowKey = "masofts_indexing_key"; 
  const indexNowUrl = `https://www.bing.com/indexnow?url=${encodeURIComponent(fullUrl)}&key=${indexNowKey}`;

  const results = {
    bing: false,
    google: false,
  };

  try {
    // Ping Bing (IndexNow)
    const bingRes = await fetch(indexNowUrl);
    results.bing = bingRes.ok;
  } catch (error) {
    console.error("IndexNow Ping Error (Bing):", error);
  }

  try {
    // Ping Google (Sitemap ping)
    // Note: Google officially deprecated the /ping endpoint, but it often still works 
    // for some legacy indexing systems. The best way now is a robust sitemap.
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${siteUrl}/sitemap.xml`)}`;
    const googleRes = await fetch(googlePingUrl);
    results.google = googleRes.ok;
  } catch (error) {
    console.error("Sitemap Ping Error (Google):", error);
  }

  return results;
}
