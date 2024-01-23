import axios from "axios"
import encodeUrl from "./encodingForUrl.js"
import parseRss from "./parser.js"

const checkUpdates = (state) => {
        
        const requests = state.requested.map(({ url }) => {  
            const encodingUrl = encodeUrl(url);
            const request = axios.get(encodingUrl);
            request.catch((err) => {
                console.log(err.message);
            });
            return request;
    })

    const promise = Promise.all(requests);

    promise
    .then((responses) => {
        const currentPosts = state.posts.map(({ link }) => link);
        const [updatedPosts] = responses.map((response) => {
                const { posts } = parseRss(response)
                return posts;
        })
        if (state.requested[0]) {
        const newPosts = updatedPosts
        .filter(({ link }) => !currentPosts.includes(link));
                if (newPosts[0]) {
                    state.posts.unshift(...newPosts);
                }
            }
            })
    .catch((err) => {
        console.log(err.message);
    })
    .finally(() => {
        const updateTime = 5000;
        setTimeout(() => checkUpdates(state), updateTime);
    })
    }
export default checkUpdates;