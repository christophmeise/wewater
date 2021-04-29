import { graphql } from "gatsby";

export const getProjectsFragment = graphql`fragment GetProjects on WpProjektConnection {
  edges {
    node {
      id
      title
      excerpt
      date(formatString: "MMMM DD, YYYY", locale: $language)
      uri
      slug
      translations {
        slug
        language {
          slug
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
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
      blocks {
        name
        saveContent
        innerBlocks {
          name
          saveContent
          innerBlocks {
            name
            saveContent
          }
        }
      }
    }
  }
}
`