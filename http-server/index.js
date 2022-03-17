const http = require("http");

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: "Ali Raees",
    },
    {
        id: 1,
        name: "Farsam Khan",
    },
    {
        id: 2,
        name: "Musa Khan",
    },
];

const server = http.createServer((req, res) => {
    const items = req.url.split("/");
    if (req.method === "POST" && items[1] === "friends") {
        req.on("data", (data) => {
            const friend = data.toString();
            friends.push(JSON.parse(friend));
            console.log(`Request: ${friend}`);
        });
        req.pipe(res);
    } else if (req.method === "GET" && items[1] === "friends") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === "GET" && items[1] === "messages") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body>");
        res.write("<ul>");
        res.write("<li>Hello!</li>");
        res.write("<li>What are thoughts on NodeJs!</li>");
        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
