import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "www.filmandtvnow.com",
            "images.alphacoders.com",
            "w0.peakpx.com",
            "images.plex.tv",
            "image.tmdb.org",
            "m.media-amazon.com",
            "c4.wallpaperflare.com"
        ]
    }
};

export default withNextVideo(nextConfig);