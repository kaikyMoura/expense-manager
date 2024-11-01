/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/GetStarted/getStarted',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
