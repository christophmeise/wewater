import { graphql } from "gatsby";

export const getBlogpostsFragment = graphql`
  fragment GetBlogposts on WpPostConnection {
            edges {
                node {
                    id
                    excerpt
                    title
                    content
                    author {
                        node {
                            name
                        }
                    }
                    date(formatString: "MMMM DD, YYYY", locale: "de")
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
                        }
                    }
                    featuredImage {
                        node {
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth: 800) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
  }
`