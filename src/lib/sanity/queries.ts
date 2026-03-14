export const queries = {
  siteSettings: `
    *[_type == "siteSettings"][0]{
      title,
      email,
      phone,
      whatsapp,
      wechat,
      social
    }
  `,
  casesList: `
    *[_type == "case" && defined(slug.current)]
      | order(publishDate desc)
      {
        "slug": slug.current,
        "title": coalesce(title[$locale], title.en, title.es, title.zh),
        "description": coalesce(description[$locale], description.en, description.es, description.zh),
        isFeatured,
        publishDate,
        "coverImage": coalesce(coverImageUrl, coverImage.asset->url),
        coverImageMeta
      }
  `,
  caseBySlug: `
    *[_type == "case" && slug.current == $slug][0]{
      "slug": slug.current,
      "title": coalesce(title[$locale], title.en, title.es, title.zh),
      "description": coalesce(description[$locale], description.en, description.es, description.zh),
      isFeatured,
      publishDate,
      client,
      location,
      year,
      tags,
      "coverImage": coalesce(coverImageUrl, coverImage.asset->url),
      coverImageMeta,
      body
    }
  `,
  postsList: `
    *[_type == "post" && defined(slug.current)]
      | order(publishDate desc)
      {
        "slug": slug.current,
        "title": coalesce(title[$locale], title.en, title.es, title.zh),
        "description": coalesce(description[$locale], description.en, description.es, description.zh),
        publishDate,
        author,
        tags,
        "coverImage": coalesce(coverImageUrl, coverImage.asset->url),
        coverImageMeta
      }
  `,
  postBySlug: `
    *[_type == "post" && slug.current == $slug][0]{
      "slug": slug.current,
      "title": coalesce(title[$locale], title.en, title.es, title.zh),
      "description": coalesce(description[$locale], description.en, description.es, description.zh),
      publishDate,
      author,
      tags,
      "coverImage": coalesce(coverImageUrl, coverImage.asset->url),
      coverImageMeta,
      body
    }
  `,
  pageBySlug: `
    *[_type == "page" && slug.current == $slug][0]{
      "title": coalesce(title[$locale], title.en, title.es, title.zh),
      "slug": slug.current,
      sections[]->{
        _id,
        layout,
        "title": coalesce(title[$locale], title.en, title.es, title.zh),
        content,
        "imageUrl": coalesce(imageUrl, image.asset->url),
        imageMeta,
        data
      },
      seo
    }
  `,
} as const;
