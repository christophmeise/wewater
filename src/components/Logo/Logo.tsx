import React from 'react';
import './logo.less';
const LogoSvg = require('../../../static/images/logo.inline.svg') as string;

export default function Logo() {
    /*   const data = useStaticQuery(
          graphql`
              query {
                  logo: file(relativePath: { eq: "Logo.png" }) {
                      childImageSharp {
                          fixed(width: 100, quality: 100) {
                              ...GatsbyImageSharpFixed_noBase64
                          }
                      }
                  }
              }
          `,
      ); */

    return (
        <div className="logo-container">
            <LogoSvg></LogoSvg>
            {/* <Img fixed={data.logo.childImageSharp.fixed} /> */}
        </div>
    );
}
