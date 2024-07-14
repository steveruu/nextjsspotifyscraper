import cheerio from "cheerio"; 

export default async (req: any, res: any) => {
    if (req.method === "POST") {
        const artist = req.body.artist;

        try {
            const response = await fetch(
                `https://open.spotify.com/artist/${artist}`
            );

            const htmlString = await response.text();

            // if Too Many Requests, return 429
            if (htmlString.includes("429")) {
                res.statusCode = 429;

                return res.json({
                    user: artist,
                    error: "Too Many Requests"
                });
            } else {

            const $ = cheerio.load(htmlString);

            const listeners = $('div[data-testid="monthly-listeners-label"]').text();

            res.statusCode = 200;
            return res.json({
                user: artist,
                listeners: listeners
            });
        }

        } catch (e) {
            res.statusCode = 404;
            return res.json({
                user: artist,
                error: `${e}`,
                listeners: -1,
            });
        }
    }
};
