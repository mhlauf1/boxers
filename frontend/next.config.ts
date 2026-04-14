import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/enrichment',
        destination: '/services/daycare',
        permanent: true,
      },
      // Old Wix site had service pages at root level — Google still has these indexed
      {
        source: '/boarding',
        destination: '/services/boarding',
        permanent: true,
      },
      {
        source: '/daycare',
        destination: '/services/daycare',
        permanent: true,
      },
      {
        source: '/grooming',
        destination: '/services/grooming',
        permanent: true,
      },
      {
        source: '/training',
        destination: '/services/training',
        permanent: true,
      },
      {
        source: '/vet-clinic',
        destination: '/services/vet-clinic',
        permanent: true,
      },
      {
        source: '/enrichment',
        destination: '/services/daycare',
        permanent: true,
      },
    ]
  },
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
  transpilePackages: ['studio'],
}

export default nextConfig
