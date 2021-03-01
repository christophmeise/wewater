import { graphql } from "gatsby";

export const getTranslationsFragment = graphql`
  fragment GetTranslations on LocaleConnection {
    edges {
        node {
            ns
            data
            language
        }
    }
  }
`