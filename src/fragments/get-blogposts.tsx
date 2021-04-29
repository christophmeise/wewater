import { graphql } from "gatsby";

export const getBlogpostsFragment = graphql`fragment GetBlogposts on WpPostConnection {
  edges {
    node {
      id
      databaseId
      excerpt
      title
      content
      commentCount
      translations {
        slug
        language {
          slug
        }
      }
      author {
        node {
          name
          description
          avatar {
              url
            }
        }
      }
      date(formatString: "MMMM DD, YYYY", locale: $language)
      uri
      slug
      tags {
        nodes {
          name
        }
      }
      categories {
        nodes {
          name
          description
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 800, layout: CONSTRAINED)
            }
          }
        }
      }
      blocksJSON
    }
  }
}
`