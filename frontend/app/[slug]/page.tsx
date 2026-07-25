import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs, settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: getPageQuery, params, stega: false}),
    sanityFetch({query: settingsQuery, stega: false}),
  ])

  if (!page?._id) {
    notFound()
  }

  const seo = page?.seo
  const ogImage = resolveOpenGraphImage(seo?.ogImage) || resolveOpenGraphImage(settings?.ogImage)

  return {
    title: seo?.metaTitle || page?.name,
    description: seo?.metaDescription || undefined,
    openGraph: {
      url: `/${params.slug}`,
      ...(ogImage && {images: [ogImage]}),
    },
    ...(seo?.noIndex && {robots: {index: false, follow: true}}),
    alternates: {canonical: `/${params.slug}`},
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const [{data: page}] = await Promise.all([sanityFetch({query: getPageQuery, params})])

  if (!page?._id) {
    notFound()
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.boxersbedandbiscuits.com'},
      {'@type': 'ListItem', position: 2, name: page.name},
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
      />
      <PageBuilderPage page={page} />
    </>
  )
}
