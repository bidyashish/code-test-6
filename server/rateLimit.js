/* 

*/

module.exports = CustomRatelimit = ({duration, limitMsg, max}) => {
    let rateLimitRule = {};
    return ratelimit = (req, res, next) => {
        const ip = req.ip;

        const now = Date.now()
        const counter = now + duration;

        if (!(ip in rateLimitRule)) {
            rateLimitRule[ip] = { ip: ip, counter: counter, limit: max }
        }

        rateLimitRule[ip].limit = rateLimitRule[ip].limit - 1


        if (rateLimitRule[ip].limit < 0 && rateLimitRule[ip].counter < now) {
            rateLimitRule[ip] = { ip: ip, counter: counter, limit: max };
            rateLimitRule[ip].limit = rateLimitRule[ip].limit - 1;
        }

        if (rateLimitRule[ip].limit < 0) {
            res.send(limitMsg);
            return;
        }

        return next();
    };
}