import Img from "gatsby-image"
import React from "react"

const NonStretchedImage = props => {
  let normalizedProps = props
  if (props.fluid) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: '80vh',
        maxHeight: '80vh',
        width: "auto",
        margin: "auto", // Used to center the image
        top: "50%",
        transform: 'translateY(-50%)'
      },
    }
  }

  return <Img {...normalizedProps} />
}
export default NonStretchedImage
