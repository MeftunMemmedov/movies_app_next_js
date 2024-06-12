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
            "c4.wallpaperflare.com",
            "images7.alphacoders.com",
            "static01.nyt.com",
            "www.gainesville.com",
            "nextbestpicture-com.b-cdn.net",
            "www.telegraph.co.uk",
            "assets3.thrillist.com",
            "miro.medium.com",
            "",
            "",
            "",
            "",
            "",
            "",
            

        ]
    }
};

export default withNextVideo(nextConfig);