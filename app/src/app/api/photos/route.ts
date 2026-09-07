import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Real-time on every request/refresh

const GOOGLE_DRIVE_FOLDER_ID = "1mgcGSjHW9QIZ04wHjUYfFHNGzsR1c_rj";

export async function GET() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  // Method 1: Official Google Drive REST API v3 (if GOOGLE_DRIVE_API_KEY is configured in Vercel)
  if (apiKey) {
    try {
      const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,thumbnailLink)&pageSize=100&key=${apiKey}`;
      const res = await fetch(apiUrl, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.files && Array.isArray(data.files)) {
          const drivePhotos = data.files
            .filter((f: { name: string; mimeType: string }) =>
              /\.(jpg|jpeg|png|webp|gif|mp4|mov|dng)$/i.test(f.name) ||
              f.mimeType.startsWith("image/") ||
              f.mimeType.startsWith("video/")
            )
            .map((f: { id: string; name: string; mimeType: string }) => {
              const isVideo = f.mimeType.startsWith("video/") || /\.(mp4|mov)$/i.test(f.name);
              const isLive =
                f.name.toLowerCase().includes("dji_export") ||
                f.name.toLowerCase().includes("live");

              let category: "candid" | "travel" | "milestone" = "candid";
              if (f.name.toLowerCase().includes("dji") || f.name.toLowerCase().includes("drone")) {
                category = "travel";
              } else if (
                f.name.toLowerCase().includes("1068") ||
                f.name.toLowerCase().includes("1069") ||
                f.name.toLowerCase().includes("20260801") ||
                f.name.toLowerCase().includes("774814247") ||
                f.name.toLowerCase().includes("wedding")
              ) {
                category = "milestone";
              }

              return {
                id: f.id,
                src: `https://lh3.googleusercontent.com/d/${f.id}`,
                videoSrc: isVideo
                  ? `https://drive.google.com/uc?export=download&id=${f.id}`
                  : undefined,
                type: isVideo ? "video" : isLive ? "live" : "image",
                title: f.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
                caption: "Auto-synced from Google Drive",
                category,
                filename: f.name,
              };
            });

          return NextResponse.json({
            success: true,
            source: "google-drive-api",
            count: drivePhotos.length,
            photos: drivePhotos,
          });
        }
      }
    } catch (apiErr) {
      console.warn("Google Drive API failed, falling back to public folder scraper:", apiErr);
    }
  }

  // Method 2: Public Google Drive Web Scraper (Zero-config fallback)
  try {
    const folderUrl = `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_FOLDER_ID}`;
    const res = await fetch(folderUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const html = await res.text();
      const fileIdRegex = /\["([a-zA-Z0-9_-]{25,50})",\["([^"]+)"/g;
      const matches = Array.from(html.matchAll(fileIdRegex));
      const photosMap = new Map();

      for (const match of matches) {
        const fileId = match[1];
        const filename = match[2];

        if (
          filename &&
          /\.(jpg|jpeg|png|webp|gif|mp4|mov|dng)$/i.test(filename) &&
          !photosMap.has(fileId)
        ) {
          const isVideo = /\.(mp4|mov)$/i.test(filename);
          const isLive =
            filename.toLowerCase().includes("dji_export") ||
            filename.toLowerCase().includes("live");

          let category: "candid" | "travel" | "milestone" = "candid";
          if (filename.toLowerCase().includes("dji") || filename.toLowerCase().includes("drone")) {
            category = "travel";
          } else if (
            filename.toLowerCase().includes("1068") ||
            filename.toLowerCase().includes("1069") ||
            filename.toLowerCase().includes("20260801") ||
            filename.toLowerCase().includes("774814247") ||
            filename.toLowerCase().includes("wedding")
          ) {
            category = "milestone";
          }

          photosMap.set(fileId, {
            id: fileId,
            src: `https://lh3.googleusercontent.com/d/${fileId}`,
            videoSrc: isVideo
              ? `https://drive.google.com/uc?export=download&id=${fileId}`
              : undefined,
            type: isVideo ? "video" : isLive ? "live" : "image",
            title: filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
            caption: "Auto-synced from Google Drive",
            category,
            filename,
          });
        }
      }

      const photos = Array.from(photosMap.values());
      return NextResponse.json({
        success: true,
        source: "public-drive-scraper",
        count: photos.length,
        photos,
      });
    }
  } catch (scraperErr) {
    console.warn("Public scraper failed:", scraperErr);
  }

  // Graceful fallback
  return NextResponse.json({
    success: true,
    source: "fallback",
    count: 0,
    photos: [],
  });
}
