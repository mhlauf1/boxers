import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getServiceQuery, serviceSlugs, settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: serviceSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const [{data: service}, {data: settings}] = await Promise.all([
    sanityFetch({query: getServiceQuery, params, stega: false}),
    sanityFetch({query: settingsQuery, stega: false}),
  ])

  if (!service?._id) {
    notFound()
  }

  const seo = service?.seo
  const ogImage = resolveOpenGraphImage(seo?.ogImage) || resolveOpenGraphImage(settings?.ogImage)

  return {
    title: seo?.metaTitle || service?.title,
    description: seo?.metaDescription || service?.heading || service?.shortDescription,
    openGraph: {
      url: `/services/${params.slug}`,
      ...(ogImage && {images: [ogImage]}),
    },
    ...(seo?.noIndex && {robots: {index: false, follow: true}}),
    alternates: {canonical: `/services/${params.slug}`},
  } satisfies Metadata
}

export default async function ServicePage(props: Props) {
  const params = await props.params
  const [{data: service}] = await Promise.all([sanityFetch({query: getServiceQuery, params})])

  if (!service?._id) {
    notFound()
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.boxersbedandbiscuits.com'},
      {'@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.boxersbedandbiscuits.com/services'},
      {'@type': 'ListItem', position: 3, name: service.title},
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
      />
      <PageBuilderPage page={service} />
    </>
  )
}
