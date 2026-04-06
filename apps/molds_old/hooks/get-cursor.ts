export default function getCursor({page, perPage}: { page: number, perPage: number }) {
    return {
        offset: (page - 1) * perPage,
        limit: perPage,
    };
}
